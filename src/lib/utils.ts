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
  console.log(error);
  const validationErrors = error?.response?.data?.error?.validationErrors;

  // Show individual validation errors
  if (validationErrors) {
    Object.values(validationErrors).forEach((messages: any) => {
      messages.forEach((message: string) => {
        toast.error(message);
      });
    });
    return;
  }

  // Try multiple message sources
  const message =
    error?.response?.data?.error?.message || // API error
    error?.message || // Normal JS error
    fallback || // Custom fallback
    "Something went wrong";

  toast.error(message);
};
