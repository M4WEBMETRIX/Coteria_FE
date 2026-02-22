type User = {
  id: string;
  name: string;
  email?: string;
  businessEmail?: string;
  businessNumber?: string;
  createdAt?: string;
  hasStripeConnected?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  slug?: string;
  stripeOnboardingComplete?: boolean;
};

export const setOrgUserToLocalStorage = (user: User) => {
  localStorage.setItem("org-user", JSON.stringify(user));
};

export const setEndUserToLocalStorage = (user: User) => {
  localStorage.setItem("end-user", JSON.stringify(user));
};

export const getOrgUserFromLocalStorage = (): User | null => {
  const storedUser = localStorage.getItem("org-user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

export const getEndUserFromLocalStorage = (): User | null => {
  const storedUser = localStorage.getItem("end-user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

export const removeOrgUserFromLocalStorage = () => {
  localStorage.removeItem("org-user");
};

export const removeEndUserFromLocalStorage = () => {
  localStorage.removeItem("end-user");
};

export const removeTokens = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
};

export const removeUserTokens = () => {
  localStorage.removeItem("userRefreshToken");
  localStorage.removeItem("userAccessToken");
};

//SMAPLE GET NAME FROM EMAIL
export const getNameFromEmail = (email: string): string => {
  const localPart = email.split("@")[0];

  return localPart
    .split("+")[0] // remove + alias
    .replace(/[^a-zA-Z._-]/g, "") // remove special chars & numbers
    .replace(/[._-]+/g, " ") // separators → space
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};
