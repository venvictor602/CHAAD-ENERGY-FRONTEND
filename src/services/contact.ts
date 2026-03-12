import type { ContactRequest } from "@/types/app/request";
import { apiService } from "./base";

export function submitContact(data: ContactRequest) {
  return apiService.post("base", "/contact/", data);
}

export function subscribeContact(email: string) {
  return apiService.post("base", "/contact/subscribe/", { email });
}
