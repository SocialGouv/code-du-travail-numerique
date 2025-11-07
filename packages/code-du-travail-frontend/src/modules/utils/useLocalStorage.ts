import { useCallback, useEffect, useState } from "react";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { isLocalStorageAvailable } from "./storage";

export const STORAGE_KEY_AGREEMENT = "convention";

export function useLocalStorageForAgreementOnPageLoad(): [
  Agreement | undefined,
  (a?: Agreement) => void,
] {
  const [value, setValue] = useState(null);

  useEffect(() => {
    updateValue(getAgreementFromLocalStorage());
  }, []);

  const updateValue = useCallback(
    (value) => {
      setValue(value);
      saveAgreementToLocalStorage(value);
    },
    [JSON.stringify(value)]
  );

  return [value ?? undefined, updateValue];
}

export function useLocalStorageForAgreement(
  defaultValue?: Agreement
): [Agreement | any, (a?: any) => void] {
  const [value, setValue] = useState(
    getAgreementFromLocalStorage() ?? defaultValue
  );
  const updateValue = useCallback(
    (value) => {
      setValue(value);
      saveAgreementToLocalStorage(value);
    },
    [value]
  );

  return [value, updateValue];
}

export const saveAgreementToLocalStorage = (agreement?: Agreement | null) => {
  if (!isLocalStorageAvailable()) return;

  try {
    if (agreement) {
      window.localStorage.setItem(
        STORAGE_KEY_AGREEMENT,
        JSON.stringify(agreement)
      );
    } else {
      window.localStorage.removeItem(STORAGE_KEY_AGREEMENT);
    }
  } catch (e) {
    console.error(e);
  }
};

export const getAgreementFromLocalStorage = (): Agreement | undefined => {
  if (!isLocalStorageAvailable()) return;

  try {
    const data = window.localStorage.getItem(STORAGE_KEY_AGREEMENT);
    return data ? JSON.parse(data) : undefined;
  } catch (e) {
    console.error(e);
  }
};

export const removeAgreementFromLocalStorage = () => {
  if (!isLocalStorageAvailable()) return;

  try {
    window.localStorage.removeItem(STORAGE_KEY_AGREEMENT);
  } catch (e) {
    console.error(e);
  }
};
