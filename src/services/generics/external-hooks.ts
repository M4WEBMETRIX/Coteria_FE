import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import axios from "axios";

export interface BusinessNumberValidationResponse {
  isValid: boolean;
  businessNumber: string;
  legalName: string;
}

export class CharityValidationError extends Error {
  code: string;
  isFormatError: boolean;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.isFormatError = code === "CRA_BN_INVALID_FORMAT";
  }
}

const validateBusinessNumber = async (
  businessNumber: string
): Promise<BusinessNumberValidationResponse> => {
  try {
    const response = await api.get("/org/auth/business-number/validate", {
      params: { businessNumber },
    });
    // 2xx with success:false (shouldn't happen but guard anyway)
    const body = response.data;
    if (!body.success) {
      throw new CharityValidationError(
        body.error?.code || "UNKNOWN",
        body.error?.message || "Invalid business number"
      );
    }
    return body.data as BusinessNumberValidationResponse;
  } catch (err) {
    // Axios 4xx/5xx — extract the API error body
    if (axios.isAxiosError(err) && err.response?.data) {
      const body = err.response.data;
      throw new CharityValidationError(
        body.error?.code || "UNKNOWN",
        body.error?.message || "Validation failed"
      );
    }
    throw err;
  }
};

export const useCanadaCharityLookup = (charityNumber: string) => {
  const enabled = charityNumber.trim().length >= 9;

  return useQuery({
    queryKey: ["canada-charity-lookup", charityNumber],
    queryFn: () => validateBusinessNumber(charityNumber.trim()),
    enabled,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
};
