import type { ServicesListResponse } from "@/types/app/response";
import { apiService } from "./base";

export function getServices(page = 1): Promise<{ data: ServicesListResponse }> {
  return apiService.get("base", "/services/", { page }) as Promise<{
    data: ServicesListResponse;
  }>;
}
