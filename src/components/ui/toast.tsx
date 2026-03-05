"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitive.ToastProvider;

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.ToastViewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.ToastViewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.ToastViewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[25rem]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.ToastViewport.displayName;

const toastVariants = {
  default: "border bg-background text-foreground",
  success:
    "border border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-100",
  error:
    "border border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100",
  warning:
    "border border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100",
};

const ToastRoot = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Toast>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Toast> & {
    variant?: keyof typeof toastVariants;
  }
>(({ className, variant = "default", ...props }, ref) => (
  <ToastPrimitive.Toast
    ref={ref}
    className={cn(
      "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
      toastVariants[variant],
      className,
    )}
    {...props}
  />
));
ToastRoot.displayName = ToastPrimitive.Toast.displayName;

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.ToastTitle>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.ToastTitle>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.ToastTitle
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.ToastTitle.displayName;

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.ToastDescription>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.ToastDescription>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.ToastDescription
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.ToastDescription.displayName;

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.ToastClose>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.ToastClose>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.ToastClose
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring",
      className,
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitive.ToastClose>
));
ToastClose.displayName = ToastPrimitive.ToastClose.displayName;

export type ToastOptions = {
  title?: string;
  description: string;
  variant?: keyof typeof toastVariants;
  duration?: number;
};

type ToastItem = ToastOptions & { id: string };

type ToastContextValue = {
  toasts: ToastItem[];
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function Toaster({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { ...options, id }]);
  }, []);

  const value = React.useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastProvider duration={5000} label="Notifications">
        <ToastViewport />
        {toasts.map((item) => (
          <ToastPrimitive.Toast
            key={item.id}
            duration={item.duration ?? 5000}
            defaultOpen
            onOpenChange={(open) => {
              if (!open) dismiss(item.id);
            }}
            className={cn(
              "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
              toastVariants[item.variant ?? "default"],
            )}
          >
            <div className="grid gap-1 flex-1">
              {item.title && (
                <ToastPrimitive.ToastTitle className="text-sm font-semibold">
                  {item.title}
                </ToastPrimitive.ToastTitle>
              )}
              <ToastPrimitive.ToastDescription className="text-sm opacity-90">
                {item.description}
              </ToastPrimitive.ToastDescription>
            </div>
            <ToastPrimitive.ToastClose className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
              <X className="h-4 w-4" />
            </ToastPrimitive.ToastClose>
          </ToastPrimitive.Toast>
        ))}
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a Toaster provider");
  }
  return ctx;
}

export {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
