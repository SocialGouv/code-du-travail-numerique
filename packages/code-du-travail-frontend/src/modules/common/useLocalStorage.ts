import { Agreement } from "@socialgouv/cdtn-types";
import { useCallback, useEffect, useState } from "react";
import { EnterpriseAgreement } from "../enterprise";

export const STORAGE_KEY_AGREEMENT = "convention";

export function useLocalStorageForAgreementOnPageLoad(): [
  EnterpriseAgreement | undefined,
  (a?: EnterpriseAgreement) => void,
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

export const saveAgreementToLocalStorage = (
  agreement?: EnterpriseAgreement | null
) => {
  try {
    if (window?.localStorage) {
      if (agreement) {
        window.localStorage.setItem(
          STORAGE_KEY_AGREEMENT,
          JSON.stringify(agreement)
        );
      } else {
        window.localStorage.removeItem(STORAGE_KEY_AGREEMENT);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const getAgreementFromLocalStorage = ():
  | EnterpriseAgreement
  | undefined => {
  try {
    if (window?.localStorage) {
      const data = window.localStorage.getItem(STORAGE_KEY_AGREEMENT);
      return data ? JSON.parse(data) : undefined;
    }
  } catch (e) {
    console.error(e);
  }
};
