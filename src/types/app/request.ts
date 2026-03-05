export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  taxpayer_type: "Individual" | "Corporate";
  nin: string;
  taxpayer_id?: string;
  business_name?: string;
};

export type LogoutRequest = {
  refresh: string;
};

export type RefreshTokenRequest = {
  refresh: string;
};

export type EmailVerificationRequest = {
  email: string;
};

export type EmailVerificationVerifyRequest = {
  email: string;
  code: string;
};
