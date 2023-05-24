import { useEffect, useState } from "react";

/**
 * This localStorage hooks
 * does not use a storage event handler by default
 * since it double the render pass (setValue is called twice)
 *
 * @param {*} key the localStorage key
 * @param {*} defaultValue the key's initialValue
 */
export function useLocalStorage(key, defaultValue) {
  const initialValue = () => {
    try {
      const data = window.localStorage && window.localStorage.getItem(key);
      return data !== null ? JSON.parse(data) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  };

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!window.localStorage) {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }

    // INFO(@lionelb): we use the result of JSON.stringify as
    // dependency so IE11 doesn't loop endlessly
    // eslint-disable-next-line
  }, [key, JSON.stringify(value)]);

  return [value, setValue];
}
