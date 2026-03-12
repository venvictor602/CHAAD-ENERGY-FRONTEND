export type ContactRequest = {
  full_name: string;
  email: string;
  address: string;
  company_name: string;
  subject: string;
  services: number[];
  message: string;
};

export type CareerApplyRequest = {
  full_name: string;
  email: string;
  phone_number: string;
  resume: string;
  cover_letter_text: string;
  cover_letter_file?: string;
};

export type BlogCommentRequest = {
  name: string;
  email: string;
  content: string;
  parent?: number | null;
};
