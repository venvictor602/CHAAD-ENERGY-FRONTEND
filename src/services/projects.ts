import type { ProjectItem, ProjectsListResponse } from "@/types/app/response";
import { apiService } from "./base";

export function getProjects(page = 1): Promise<{ data: ProjectsListResponse }> {
  return apiService.get("base", "/services/projects/", { page }) as Promise<{
    data: ProjectsListResponse;
  }>;
}

export function getProject(id: number): Promise<{ data: ProjectItem }> {
  return apiService.get("base", `/services/project/${id}/`) as Promise<{
    data: ProjectItem;
  }>;
}
