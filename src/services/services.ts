import type { ServicesListResponse, ServiceItem } from "@/types/app/response";
import { apiService } from "./base";

export function getServices(page = 1): Promise<{ data: ServicesListResponse }> {
  return apiService.get("base", "/services/", { page }) as Promise<{
    data: ServicesListResponse;
  }>;
}

/** Fetches services list and returns the service matching the given id */
export async function getService(id: number): Promise<{ data: ServiceItem }> {
  const res = await getServices(1);
  const list = res.data?.results ?? [];
  const item = list.find((s) => s.id === id);
  if (!item) throw new Error("Service not found");
  return { data: item };
}
