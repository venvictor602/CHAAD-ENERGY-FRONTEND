import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SERVICE_URLS = {
  base: process.env.NEXT_PUBLIC_API_BASE_URL,
};

function extractErrorMessage(err: unknown): string {
  const error = err as AxiosError<
    | string
    | {
        errors: object;
        title: string;
        detail: string;
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

    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      const firstArrayMessage = Object.values(data).find(
        (v): v is string[] => Array.isArray(v) && typeof v[0] === "string",
      );
      if (firstArrayMessage?.[0]) {
        return firstArrayMessage[0];
      }
    }

    if (data.errors && typeof data.errors === "object") {
      const errorMessages = [];

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

    if (data.detail && !data.title) {
      return typeof data.detail === "string"
        ? data.detail
        : JSON.stringify(data.detail);
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

function isFormDataRequest(req: NextApiRequest): boolean {
  const contentType = req.headers["content-type"] || "";
  return (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

  const { service, endpoint, responseType, _t, ...params } = req.query;
  const { method, headers } = req;

  const isBlobRequest = responseType === "blob";
  const isFormData = isFormDataRequest(req);

  if (!service || !SERVICE_URLS[service as keyof typeof SERVICE_URLS]) {
    return res.status(400).json({
      error: "Invalid service",
      message: `Service '${service}' not found. Available services: ${Object.keys(
        SERVICE_URLS,
      ).join(", ")}`,
    });
  }

  const baseURL = SERVICE_URLS[service as keyof typeof SERVICE_URLS];
  const targetURL = `${baseURL}${endpoint}`;

  const cacheBustingParams = {
    ...params,
    _t: _t || Date.now().toString(),
  };

  const queryString =
    Object.keys(cacheBustingParams).length > 0
      ? `?${new URLSearchParams(
          cacheBustingParams as Record<string, string>,
        ).toString()}`
      : "";

  const finalURL = targetURL + queryString;

  try {
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
      .reduce((obj, key) => {
        return { ...obj, [key]: headers[key] };
      }, {});

    let requestData;

    if (isFormData) {
      requestData = req;
    } else {
      requestData = await new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            resolve(body ? JSON.parse(body) : undefined);
          } catch {
            resolve(body);
          }
        });
        req.on("error", reject);
      });
    }

    const response = await axios({
      method: method,
      url: finalURL,
      data: requestData,
      headers: {
        ...filteredHeaders,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "X-Request-ID": `${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      },
      responseType: isBlobRequest ? "arraybuffer" : "json",
      timeout: 30000,
      maxContentLength: 50 * 1024 * 1024,
    });

    if (isBlobRequest) {
      const contentType =
        response.headers["content-type"] || "application/octet-stream";
      const contentDisposition = response.headers["content-disposition"];
      const contentLength = response.headers["content-length"];

      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, private",
      );
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Content-Type", contentType);

      if (contentDisposition) {
        res.setHeader("Content-Disposition", contentDisposition);
      }
      if (contentLength) {
        res.setHeader("Content-Length", contentLength);
      }

      res.status(response.status).send(Buffer.from(response.data));
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = extractErrorMessage(error);
    const statusCode = error.response?.status || 500;

    const errorResponse = {
      error: errorMessage,
      status: statusCode,
      statusText: error.response?.statusText || "Unknown Error",
      timestamp: new Date().toISOString(),
      ...(error.response?.data && typeof error.response.data === "object"
        ? { originalError: error.response.data }
        : {}),
    };

    res.status(statusCode).json(errorResponse);
  }
}
