import { NPS_SESSION_KEY } from "../nps/constants";

export const safeGetSessionItem = (key: string): string | null => {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      return window.sessionStorage.getItem(NPS_SESSION_KEY);
    }
  } catch (error) {
    console.warn(`Failed to access sessionStorage for key "${key}":`, error);
  }
  return null;
};

export const safeSetSessionItem = (key: string, value: string): void => {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(NPS_SESSION_KEY, value);
    }
  } catch (error) {
    console.warn(`Failed to set session sotrage for key "${key}":`, error);
  }
};
