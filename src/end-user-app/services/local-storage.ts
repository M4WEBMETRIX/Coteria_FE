type User = {
  id: string;
  name: string;
  email: string;
};

export const setUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = (): User | null => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
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
