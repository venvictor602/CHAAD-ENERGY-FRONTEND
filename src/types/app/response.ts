export type LoginResponse = {
  access: string;
  refresh: string;
  user?: {
    id: string;
    email: string;
    [key: string]: unknown;
  };
};

export type RefreshTokenResponse = {
  access: string;
  refresh?: string;
};

export type EmailVerificationResponse = {
  message?: string;
  success?: boolean;
  [key: string]: unknown;
};
