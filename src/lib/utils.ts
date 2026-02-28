import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskEmail(email: string) {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const visible = name.slice(0, 1);
  return `${visible}***@${domain}`;
}

export const getBaseUrl = () => window.location.origin;

export const formatFullDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getCurrencySymbol = (currencyCode: string | undefined | any): string => {
  if (!currencyCode) return "";

  return (0)
    .toLocaleString("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
};

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const debounce = (func: (...args: any[]) => any, delay: number) => {
  let timeout: any;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const showErrorToast = (error: any, fallback?: string) => {
  console.log("showErrorToast received:", error);
  // Extract validation errors either from the direct property (if attached by interceptor)
  // or deeply nested inside the response data
  const validationErrors =
    error?.validationErrors ||
    error?.response?.data?.error?.validationErrors ||
    error?.response?.data?.validationErrors;

  // Show individual validation errors
  if (validationErrors && typeof validationErrors === "object") {
    let hasShownError = false;
    Object.values(validationErrors).forEach((messages: any) => {
      if (Array.isArray(messages)) {
        messages.forEach((message: string) => {
          toast.error(message);
          hasShownError = true;
        });
      } else if (typeof messages === "string") {
        toast.error(messages);
        hasShownError = true;
      }
    });

    if (hasShownError) return;
  }

  // Try multiple message sources
  const message =
    error?.message || // Message derived from interceptor or JS error
    error?.response?.data?.error?.message || // Direct API error message
    error?.response?.data?.message || // Direct API message
    fallback || // Custom fallback
    "Something went wrong";

  toast.error(message);
};

export const getDaysBetweenDates = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInMs = (end as any) - (start as any);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return Math.round(diffInDays);
};
