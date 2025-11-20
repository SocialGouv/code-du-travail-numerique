export const safeGetItem = (key: string): string | null => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (error) {
    console.warn(`Failed to access localStorage for key "${key}":`, error);
  }
  return null;
};

export const safeSetItem = (key: string, value: string): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (error) {
    console.warn(`Failed to set localStorage for key "${key}":`, error);
  }
};

export const safeRemoveItem = (key: string): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn(`Failed to remove localStorage item for key "${key}":`, error);
  }
};

export const safeClear = (): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.clear();
    }
  } catch (error) {
    console.warn("Failed to clear localStorage:", error);
  }
};
