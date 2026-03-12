"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Heart,
  MessageCircle,
  Eye,
  ExternalLink,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Breadcrumb } from "@/components/website/breadcrumb";
import { Button } from "@/components/ui/button";
import { getPost, getComments, postComment, likePost } from "@/services/blog";
import type { BlogPostItem, BlogCommentItem } from "@/types/app/response";
import { cloudinaryImages } from "@/lib/cloudinary-images";
import { SkeletonDetailPage } from "@/components/ui/skeleton";

const commentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  content: z.string().min(1, "Comment is required"),
});
type CommentFormData = z.infer<typeof commentSchema>;

function formatDate(s: string) {
  try {
    const d = new Date(s);
    return isNaN(d.getTime())
      ? s
      : d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  } catch {
    return s;
  }
}

export function NewsDetailByApi({ postId }: { postId: number }) {
  const [post, setPost] = useState<BlogPostItem | null>(null);
  const [comments, setComments] = useState<BlogCommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [likesCount, setLikesCount] = useState<number | null>(null);
  const [liking, setLiking] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
  });

  useEffect(() => {
    getPost(postId)
      .then((res) => {
        setPost(res.data);
        setLikesCount(res.data.likes_count ?? null);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [postId]);

  useEffect(() => {
    if (!postId) return;
    getComments(postId, 1)
      .then((res) => setComments(res.data?.results ?? []))
      .catch(() => setComments([]))
      .finally(() => setCommentsLoading(false));
  }, [postId]);

  const onLike = () => {
    if (liking || post == null) return;
    setLiking(true);
    likePost(postId)
      .then(() => {
        setLikesCount((c) => (c ?? post.likes_count ?? 0) + 1);
        toast.success("Thanks for your like!");
      })
      .catch(() => toast.error("Could not register like."))
      .finally(() => setLiking(false));
  };

  const onSubmitComment = (data: CommentFormData) => {
    postComment(postId, data)
      .then(() => {
        toast.success("Comment submitted.");
        reset();
        return getComments(postId, 1);
      })
      .then((res) => setComments(res.data?.results ?? []))
      .catch(() => toast.error("Failed to submit comment."));
  };

  if (loading) {
    return (
      <>
        <Navbar solidBackground />
        <main className="pt-[80px] md:pt-[140px] min-h-screen [font-family:var(--font-inter)]">
          <div className="border-b border-[#E8E8E8] py-5 px-4 lg:px-0">
            <div className="max-w-7xl mx-auto">
              <div className="h-5 w-32 bg-[#E5E7EB] animate-pulse rounded" />
            </div>
          </div>
          <article className="max-w-7xl mx-auto pb-10 px-4 lg:px-0 pt-8">
            <SkeletonDetailPage />
          </article>
        </main>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar solidBackground />
        <main className="pt-[80px] md:pt-[140px] min-h-screen flex flex-col items-center justify-center gap-4 px-6">
          <p className="text-[#64748B]">Article not found.</p>
          <Link
            href="/news"
            className="text-[#485AAC] font-semibold hover:underline"
          >
            Back to News
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const paragraphs = [
    post.content_paragraph1,
    post.content_paragraph2,
    post.content_paragraph3,
  ];
  const images = [post.image, post.image2, post.image3];
  const hasContent =
    paragraphs.some((p) => (p ?? "").trim()) ||
    images.some((img) => (img ?? "").trim());

  return (
    <>
      <Navbar solidBackground />
      <main className="pt-[80px] md:pt-[140px] min-h-screen [font-family:var(--font-inter)]">
        <div className="border-b border-[#E8E8E8] py-5 px-4 lg:px-0">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { label: "News", href: "/news" },
                { label: post.title, href: undefined },
              ]}
            />
          </div>
        </div>

        <article className="max-w-7xl mx-auto pb-10 px-4 lg:px-0">
          <header className="space-y-4 mb-8 mt-8">
            <p className="text-sm text-[#64748B]">
              {formatDate(post.created_at)}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#333333] leading-tight">
              {post.title}
            </h1>
            {post.author && <p className="text-[#64748B]">By {post.author}</p>}
          </header>

          <div className="prose prose-lg max-w-none text-[#333333] space-y-10 mb-10">
            {hasContent ? (
              paragraphs.map((p, i) => (
                <div key={i} className="space-y-6">
                  {p?.trim() && <p className="leading-relaxed">{p}</p>}
                  {images[i]?.trim() && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#E5E7EB] not-prose">
                      <Image
                        src={images[i]?.trim() || ""}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center min-h-[200px] bg-[#F8F9FA] rounded-xl">
                <FileText className="h-14 w-14 text-[#94A3B8]" aria-hidden />
                <p className="text-[#64748B] font-medium">
                  No content available yet.
                </p>
                <p className="text-sm text-[#94A3B8]">
                  Check back later for updates.
                </p>
              </div>
            )}
          </div>

          <section className="mb-10 py-8 px-6 rounded-xl bg-[#F0F4FF] border border-[#E0E7FF]">
            <p className="text-lg font-semibold text-[#1A1A1A] mb-2">
              Have questions? Get in touch
            </p>
            <p className="text-[#64748B] text-sm mb-4 max-w-xl">
              Want to learn more or discuss your project? Our team is here to
              help.
            </p>
            <Link
              href="/contact#consultation"
              className="inline-flex items-center gap-2 text-[#485AAC] font-semibold hover:underline"
            >
              Contact us
              <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
          </section>

          {post.post_video_link && post.post_video_link.trim() && (
            <div className="mb-8">
              <a
                href={post.post_video_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#485AAC] text-white font-medium hover:bg-[#3d4d94] transition-colors"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Watch video
              </a>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-[#E8E8E8]">
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              <Eye className="h-5 w-5" aria-hidden />
              {post.views ?? 0} view{(post.views ?? 0) !== 1 ? "s" : ""}
            </span>
            <button
              type="button"
              onClick={onLike}
              disabled={liking}
              className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#485AAC] disabled:opacity-60 transition-colors"
            >
              <Heart className="h-5 w-5" aria-hidden />
              <span>{likesCount ?? post.likes_count ?? 0} likes</span>
            </button>
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              <MessageCircle className="h-5 w-5" aria-hidden />
              {comments.length} comment{comments.length !== 1 ? "s" : ""}
            </span>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Comments</h2>
            {commentsLoading ? (
              <div className="flex items-center gap-2 text-[#64748B]">
                <Loader2 className="h-5 w-5 animate-spin" /> Loading comments…
              </div>
            ) : (
              <ul className="space-y-4 mb-10">
                {comments.length === 0 ? (
                  <li className="flex flex-col items-center justify-center gap-4 py-12 text-center bg-[#F8F9FA] rounded-xl">
                    <MessageCircle
                      className="h-14 w-14 text-[#94A3B8]"
                      aria-hidden
                    />
                    <p className="text-[#64748B] font-medium">
                      No comments yet.
                    </p>
                    <p className="text-sm text-[#94A3B8]">
                      Be the first to comment.
                    </p>
                  </li>
                ) : (
                  comments
                    .filter((c) => !c.parent)
                    .map((c) => (
                      <li key={c.id} className="bg-[#F8F9FA] rounded-lg p-4">
                        <p className="font-semibold text-[#333333]">{c.name}</p>
                        <p className="text-sm text-[#64748B]">
                          {formatDate(c.created_at)}
                        </p>
                        <p className="mt-2 text-[#555] whitespace-pre-wrap">
                          {c.content}
                        </p>
                      </li>
                    ))
                )}
              </ul>
            )}

            <form
              onSubmit={handleSubmit(onSubmitComment)}
              className="space-y-4 max-w-xl"
            >
              <h3 className="text-lg font-semibold text-[#333333]">
                Leave a comment
              </h3>
              <div>
                <label
                  htmlFor="comment-name"
                  className="block text-sm font-medium text-[#333333] mb-1"
                >
                  Name
                </label>
                <input
                  id="comment-name"
                  {...register("name")}
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#485AAC]"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="comment-email"
                  className="block text-sm font-medium text-[#333333] mb-1"
                >
                  Email
                </label>
                <input
                  id="comment-email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#485AAC]"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="comment-content"
                  className="block text-sm font-medium text-[#333333] mb-1"
                >
                  Comment
                </label>
                <textarea
                  id="comment-content"
                  {...register("content")}
                  rows={4}
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#485AAC]"
                  placeholder="Your comment"
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.content.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Submitting…" : "Post comment"}
              </Button>
            </form>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
