import type { CareerItem, CareersListResponse } from "@/types/app/response";
import type { CareerApplyRequest } from "@/types/app/request";
import { apiService } from "./base";

export function getCareers(page = 1): Promise<{ data: CareersListResponse }> {
  return apiService.get("base", "/careers/careers/", { page }) as Promise<{
    data: CareersListResponse;
  }>;
}

export function getCareer(id: number): Promise<{ data: CareerItem }> {
  return apiService.get("base", `/careers/careers/${id}/`) as Promise<{
    data: CareerItem;
  }>;
}

export function applyForCareer(
  id: number,
  data: CareerApplyRequest,
): ReturnType<typeof apiService.post> {
  return apiService.post("base", `/careers/careers/${id}/apply/`, data);
}
