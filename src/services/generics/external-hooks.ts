import { useQuery } from "@tanstack/react-query";

const CANADA_CHARITY_API = "https://open.canada.ca/data/en/api/3/action/datastore_search";
const RESOURCE_ID = "694fdc72-eae4-4ee0-83eb-832ab7b230e3";

export interface CanadaCharityRecord {
  BN: string;
  "Legal Name": string;
  "Account Name": string;
  City: string;
  Province: string;
  "Postal Code": string;
  Designation: string;
  Category: string;
  "Sub Category": string;
  "Address Line 1": string;
  "Address Line 2": string | null;
  Country: string;
}

interface CharitySearchResponse {
  success: boolean;
  result: {
    total: number;
    records: CanadaCharityRecord[];
  };
}

// JSONP fetch — required because the API doesn't send CORS headers
const fetchCharityByNumberJSONP = (charityNumber: string): Promise<CharitySearchResponse> => {
  return new Promise((resolve, reject) => {
    const callbackName = `_charityCallback_${Date.now()}`;
    const script = document.createElement("script");

    const params = new URLSearchParams({
      resource_id: RESOURCE_ID,
      q: charityNumber,
      limit: "5",
      callback: callbackName,
    });

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Charity lookup timed out"));
    }, 8000);

    const cleanup = () => {
      clearTimeout(timeout);
      delete (window as any)[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    (window as any)[callbackName] = (data: CharitySearchResponse) => {
      cleanup();
      resolve(data);
    };

    script.src = `${CANADA_CHARITY_API}?${params.toString()}`;
    script.onerror = () => {
      cleanup();
      reject(new Error("Failed to load charity registry script"));
    };

    document.head.appendChild(script);
  });
};

export const useCanadaCharityLookup = (charityNumber: string) => {
  const enabled = charityNumber.trim().length >= 9;

  return useQuery({
    queryKey: ["canada-charity-lookup", charityNumber],
    queryFn: () => fetchCharityByNumberJSONP(charityNumber.trim()),
    enabled,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
