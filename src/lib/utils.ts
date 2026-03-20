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

// export const getBaseUrl = () => window.location.origin;
type AppTarget = "org" | "donor";
type AppContext = "org" | "donor" | "unknown";

interface GetBaseUrlOptions {
  target?: AppTarget; // where you want to go
  fallbackToCurrent?: boolean; // optional fallback
}

export const getBaseUrl = ({
  target,
  fallbackToCurrent = false,
}: GetBaseUrlOptions = {}): string => {
  const ORG = import.meta.env.VITE_ORG_BASE_URL;
  const DONOR = import.meta.env.VITE_DONOR_BASE_URL;

  if (!ORG || !DONOR) {
    throw new Error("Missing VITE_ORG_BASE_URL or VITE_DONOR_BASE_URL");
  }

  // detect current app safely
  let current: AppContext = "unknown";

  if (typeof window !== "undefined") {
    const host = window.location.hostname;

    if (host.includes("org")) current = "org";
    else if (host.includes("donor")) current = "donor";
  }

  //  1. If explicit target is provided → ALWAYS use it
  if (target) {
    return target === "org" ? ORG : DONOR;
  }

  //  2. If fallback enabled → use current app
  if (fallbackToCurrent) {
    if (current === "org") return ORG;
    if (current === "donor") return DONOR;
  }

  // 3. Edge cases (portal, vercel, localhost, unknown)
  // default to ORG
  return ORG;
};

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
    ?.toLocaleString("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    ?.replace(/\d/g, "")
    ?.trim();
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

export function formatDateAndTime(dateString: string) {
  const date = new Date(dateString);

  // DATE → DD-MM-YYYY
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  // TIME → 12hr format
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function getNameAbbrev(name: string) {
  if (!name) return;

  return (name[0] + name[1]).toLocaleUpperCase();
}
