import {
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
  RefreshTokenRequest,
  EmailVerificationRequest,
  EmailVerificationVerifyRequest,
} from "@/types/app/request";
import { apiService } from "./base";
import { tokenStorage } from "@/lib/token-storage";

export const login = (data: LoginRequest) => {
  return apiService.post("base", "/auth/login/", data);
};

export const registerWithAccount = (data: RegisterRequest) => {
  return apiService.post("base", "/auth/register-with-account/", data);
};

export const logout = (data: LogoutRequest) => {
  return apiService.post("base", "/auth/logout/", data);
};

export const handleLogout = async () => {
  const refreshTokenValue = tokenStorage.getRefreshToken();
  tokenStorage.clearTokens();

  if (refreshTokenValue) {
    try {
      await logout({ refresh: refreshTokenValue });
    } catch (error) {
      console.error("Logout API error (tokens already cleared):", error);
    }
  }

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

export const refreshToken = (data: RefreshTokenRequest) => {
  return apiService.post("base", "/auth/refresh/", data);
};

export const requestEmailVerification = (data: EmailVerificationRequest) => {
  return apiService.post("base", "/users/email-verification/request/", data);
};

export const verifyEmailCode = (data: EmailVerificationVerifyRequest) => {
  return apiService.post("base", "/users/email-verification/verify/", data);
};
