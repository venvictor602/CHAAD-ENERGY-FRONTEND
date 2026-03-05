import axios, { AxiosError } from "axios";

const SERVICE_URLS: Record<string, string | undefined> = {
  base: process.env.NEXT_PUBLIC_API_BASE_URL,
};

function extractErrorMessage(err: unknown): string {
  const error = err as AxiosError<
    | string
    | {
        errors: object;
        title: string;
        detail: string;
        details: unknown;
        error: string | { message: string };
        message: string;
        errorMessage: string;
        result: { error: string; message: string };
      }
  >;
  if (error.response?.data) {
    const { data } = error.response;

    if (typeof data === "string") {
      return data;
    }

    if (data.errors && typeof data.errors === "object") {
      const errorMessages: string[] = [];
      for (const [, messages] of Object.entries(data.errors)) {
        if (Array.isArray(messages)) {
          errorMessages.push(...messages);
        } else if (typeof messages === "string") {
          errorMessages.push(messages);
        }
      }
      if (errorMessages.length > 0) {
        return errorMessages.join(". ");
      }
    }

    if (data.title && data.detail) {
      return `${data.title}: ${data.detail}`;
    }
    if (data.title) {
      return data.title;
    }
    if (data.error) {
      return typeof data.error === "string"
        ? data.error
        : data.error.message || JSON.stringify(data.error);
    }
    if (data.message) {
      return data.message;
    }
    if (data.errorMessage) {
      return data.errorMessage;
    }
    if (data.details) {
      return typeof data.details === "string"
        ? data.details
        : JSON.stringify(data.details);
    }
    if (data.result?.error) {
      return data.result.error;
    }
    if (data.result?.message) {
      return data.result.message;
    }
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors
        .map((err: string | { message: string }) =>
          typeof err === "string" ? err : err.message || JSON.stringify(err),
        )
        .join(", ");
    }
    if (typeof data === "object") {
      try {
        const stringified = JSON.stringify(data);
        return stringified.length > 500
          ? "Oops! An Error Occurred, Kindly try again."
          : stringified;
      } catch {
        return "Oops! An Error Occurred, Kindly try again.";
      }
    }
  }
  if (error.message) {
    return error.message;
  }
  return "An unknown error occurred";
}

export type ProxyParams = {
  service: string;
  endpoint: string;
  responseType?: string;
  method: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

export async function runProxy(params: ProxyParams): Promise<{
  status: number;
  data: unknown;
  headers: Record<string, string>;
}> {
  const { service, endpoint, responseType, method, headers, body } = params;

  if (!service || !SERVICE_URLS[service]) {
    throw {
      status: 400,
      data: {
        error: "Invalid service",
        message: `Service '${service}' not found. Available services: ${Object.keys(
          SERVICE_URLS,
        ).join(", ")}`,
      },
    };
  }

  const baseURL = SERVICE_URLS[service];
  const _t = Date.now().toString();
  const queryString = `?_t=${_t}`;
  const finalURL = `${baseURL}${endpoint}${queryString}`;

  const allowedHeaders = [
    "authorization",
    "content-type",
    "content-length",
    "accept",
    "user-agent",
    "accept-encoding",
    "accept-language",
  ];

  const filteredHeaders = Object.keys(headers)
    .filter((key) => allowedHeaders.includes(key.toLowerCase()))
    .reduce(
      (obj, key) => {
        const v = headers[key];
        obj[key] = Array.isArray(v) ? v[0] : ((v as string) ?? "");
        return obj;
      },
      {} as Record<string, string>,
    );

  const isBlobRequest = responseType === "blob";

  const response = await axios({
    method: method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: finalURL,
    data: body,
    headers: {
      ...filteredHeaders,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "X-Request-ID": `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    },
    responseType: isBlobRequest ? "arraybuffer" : "json",
    timeout: 30000,
    maxContentLength: 50 * 1024 * 1024,
  });

  const outHeaders: Record<string, string> = {};
  const copyHeaders = ["content-type", "content-disposition", "content-length"];
  for (const name of copyHeaders) {
    const v = response.headers[name];
    if (typeof v === "string") {
      outHeaders[name] = v;
    }
  }

  return {
    status: response.status,
    data: response.data,
    headers: outHeaders,
  };
}

export function handleProxyError(err: unknown): {
  status: number;
  data: {
    error: string;
    status: number;
    statusText: string;
    timestamp: string;
    originalError?: object;
  };
} {
  const axiosErr = err as AxiosError & { status?: number };
  const statusCode = axiosErr.response?.status ?? axiosErr.status ?? 500;
  const errorMessage = extractErrorMessage(err);
  return {
    status: statusCode,
    data: {
      error: errorMessage,
      status: statusCode,
      statusText:
        (axiosErr.response as { statusText?: string } | undefined)
          ?.statusText ?? "Unknown Error",
      timestamp: new Date().toISOString(),
      ...(axiosErr.response?.data &&
      typeof axiosErr.response.data === "object" &&
      axiosErr.response.data !== null
        ? { originalError: axiosErr.response.data as object }
        : {}),
    },
  };
}
