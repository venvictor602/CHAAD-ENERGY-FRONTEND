import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/lib/token-storage";
import { refreshToken } from "@/services/auth";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

axios.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: unknown) => {
    const originalRequest = (
      error as { config?: InternalAxiosRequestConfig & { _retry?: boolean } }
    )?.config;

    const isRefreshEndpoint =
      originalRequest?.url?.includes("auth/refresh") ||
      originalRequest?.url?.includes("auth/logout");

    if (
      !originalRequest ||
      (error as { response?: { status?: number } })?.response?.status !== 401 ||
      originalRequest._retry ||
      isRefreshEndpoint
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers && token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axios(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshTokenValue = tokenStorage.getRefreshToken();

    if (!refreshTokenValue) {
      tokenStorage.clearTokens();
      processQueue(error, null);
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      const response = await refreshToken({ refresh: refreshTokenValue });
      const { access } =
        (response.data as { access: string; refresh?: string }) || {};

      if (access) {
        tokenStorage.setAccessToken(access);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`;
        }
        processQueue(null, access);
        isRefreshing = false;
        return axios(originalRequest);
      }
      throw new Error("No access token in refresh response");
    } catch (refreshError) {
      tokenStorage.clearTokens();
      processQueue(refreshError, null);
      isRefreshing = false;
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  },
);

export default axios;
