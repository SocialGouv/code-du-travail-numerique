import { useCallback, useEffect, useState } from "react";
import { Agreement } from "@socialgouv/cdtn-types";

const initialValue = (key, defaultValue) => {
  try {
    const data = window.localStorage?.getItem(key);
    return data !== null ? JSON.parse(data) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const updateValueCallback = (key, setValue) => (value) => {
  setValue(value);
  if (!window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export function useLocalStorageOnPageLoad<T>(
  key: string,
  defaultValue?: Agreement
): [T | any, (a?: any) => void] {
  const [value, setValue] = useState(null);

  useEffect(() => {
    updateValue(initialValue(key, defaultValue));
  }, []);

  const updateValue = useCallback(
    (value) => updateValueCallback(key, setValue)(value),
    [key, JSON.stringify(value)]
  );

  return [value, updateValue];
}

export function useLocalStorage<T>(
  key: string,
  defaultValue?: Agreement
): [T | any, (a?: any) => void] {
  const [value, setValue] = useState(initialValue(key, defaultValue));
  const updateValue = useCallback(
    (value) => updateValueCallback(key, setValue)(value),

    // INFO(@lionelb): we use the result of JSON.stringify as
    // dependency so IE11 doesn't loop endlessly
    // eslint-disable-next-line
    [key, JSON.stringify(value)]
  );

  return [value, updateValue];
}
