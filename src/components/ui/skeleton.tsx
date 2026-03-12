import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#E5E7EB]", className)}
      aria-hidden
      {...props}
    />
  );
}

export function SkeletonCardNews() {
  return (
    <article className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md w-full">
      <Skeleton className="w-full aspect-16/10 shrink-0 rounded-none" />
      <div className="p-5 flex flex-col flex-1 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-24 mt-2" />
      </div>
    </article>
  );
}

export function SkeletonCardProject() {
  return (
    <article className="flex flex-col border border-[#E8E8E8] bg-white rounded-xl overflow-hidden shadow-md w-full md:max-w-[406px] md:mx-auto">
      <Skeleton className="h-[228px] w-full shrink-0 rounded-t-[16px]" />
      <div className="p-6 flex flex-col flex-1 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-28 mt-2" />
      </div>
    </article>
  );
}

export function SkeletonCardCaseStudy() {
  return (
    <article className="flex flex-col bg-[#485AAC0D] rounded-xl overflow-hidden shadow-md w-full">
      <Skeleton className="w-full aspect-16/10 shrink-0 rounded-none" />
      <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-3">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-32 mt-2" />
      </div>
    </article>
  );
}

export function SkeletonCardService() {
  return (
    <article className="flex flex-col bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm w-full">
      <Skeleton className="w-full aspect-video shrink-0 rounded-none" />
      <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-24 mt-2" />
      </div>
    </article>
  );
}

export function SkeletonCardServiceCompact() {
  return (
    <article className="w-full sm:max-w-[336px] min-h-[280px] rounded-[12px] bg-[#E8EAEF] space-y-4 p-6 md:p-8 flex flex-col">
      <Skeleton className="w-11 h-11 rounded-[8px]" />
      <div className="space-y-3 flex-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </article>
  );
}

export function SkeletonCardCareer() {
  return (
    <article className="flex flex-col bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm w-full p-5 sm:p-6 space-y-3">
      <Skeleton className="h-5 w-20 rounded" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-28 mt-2" />
    </article>
  );
}

export function SkeletonFaqItem() {
  return (
    <div className="bg-white rounded-xl shadow-[0_14px_40px_rgba(15,23,42,0.10)] border border-black/5 overflow-hidden">
      <div className="w-full flex items-center gap-5 px-6 md:px-8 py-6">
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
        <Skeleton className="h-5 flex-1 max-w-md" />
      </div>
    </div>
  );
}

export function SkeletonDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-3/4 max-w-2xl" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="w-full aspect-video rounded-xl" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
    </div>
  );
}
