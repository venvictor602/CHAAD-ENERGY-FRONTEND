import type {
  FaqsListResponse,
  BlogPostItem,
  BlogPostsListResponse,
  BlogCommentsListResponse,
} from "@/types/app/response";
import type { BlogCommentRequest } from "@/types/app/request";
import { apiService } from "./base";

export function getFaqs(page = 1): Promise<{ data: FaqsListResponse }> {
  return apiService.get("base", "/blog/faqs/", { page }) as Promise<{
    data: FaqsListResponse;
  }>;
}

export function getPosts(page = 1): Promise<{ data: BlogPostsListResponse }> {
  return apiService.get("base", "/blog/posts/", { page }) as Promise<{
    data: BlogPostsListResponse;
  }>;
}

export function getPost(id: number): Promise<{ data: BlogPostItem }> {
  return apiService.get("base", `/blog/posts/${id}/`) as Promise<{
    data: BlogPostItem;
  }>;
}

export function getPostsByCategory(
  slug: string,
  page = 1,
): Promise<{ data: BlogPostsListResponse }> {
  return apiService.get(
    "base",
    `/blog/posts/category/${encodeURIComponent(slug)}/`,
    { page },
  ) as Promise<{ data: BlogPostsListResponse }>;
}

export function getMostViewedPosts(
  page = 1,
): Promise<{ data: BlogPostsListResponse }> {
  return apiService.get("base", "/blog/posts/most-viewed/", {
    page,
  }) as Promise<{
    data: BlogPostsListResponse;
  }>;
}

export function getPostsByTag(
  slug: string,
  page = 1,
): Promise<{ data: BlogPostsListResponse }> {
  return apiService.get(
    "base",
    `/blog/posts/tag/${encodeURIComponent(slug)}/`,
    { page },
  ) as Promise<{ data: BlogPostsListResponse }>;
}

export function getComments(
  postId: number,
  page = 1,
): Promise<{ data: BlogCommentsListResponse }> {
  return apiService.get("base", `/blog/posts/${postId}/comments/`, {
    page,
  }) as Promise<{ data: BlogCommentsListResponse }>;
}

export function postComment(
  postId: number,
  data: BlogCommentRequest,
): ReturnType<typeof apiService.post> {
  return apiService.post("base", `/blog/posts/${postId}/comments/`, data);
}

export function likePost(postId: number): ReturnType<typeof apiService.post> {
  return apiService.post("base", `/blog/posts/${postId}/like/`, {});
}
