import type { ServicesListResponse, ServiceItem } from "@/types/app/response";
import { apiService } from "./base";

export function getServices(page = 1): Promise<{ data: ServicesListResponse }> {
  return apiService.get("base", "/services/", { page }) as Promise<{
    data: ServicesListResponse;
  }>;
}

export async function getServiceById(
  id: number,
): Promise<ServiceItem | undefined> {
  const res = await (apiService.get("base", "/services/") as Promise<{
    data: ServicesListResponse;
  }>);
  return res.data?.results?.find((s) => s.id === id);
}
