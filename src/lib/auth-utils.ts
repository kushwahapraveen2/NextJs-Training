import { User } from "../types";

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const userData = localStorage.getItem("user");
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("uid", user.id);
  localStorage.setItem("email-user", user.email);
};

export const clearCurrentUser = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("uid");
  localStorage.removeItem("email-user");
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("uid");
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth-token");
};

export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth-token", token);
};

export const clearAuthToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth-token");
};
