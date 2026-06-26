import { useCallback, useEffect, useState } from "react";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

export const STORAGE_KEY_AGREEMENT = "convention";

export const AGREEMENT_STORAGE_EVENT = "cdtn:agreement-storage";

const dispatchAgreementStorageEvent = (agreement?: Agreement | null) => {
  try {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent(AGREEMENT_STORAGE_EVENT, { detail: agreement ?? null })
    );
  } catch (e) {
    console.error(e);
  }
};

export function useLocalStorageForAgreementOnPageLoad(): [
  Agreement | undefined,
  (a?: Agreement) => void,
] {
  const [value, setValue] = useState<Agreement | null>(null);

  useEffect(() => {
    updateValue(getAgreementFromLocalStorage());
  }, []);

  // Synchro temps réel avec le header : on écoute les changements de la CC
  // (suppression/modification depuis le header ou un autre onglet) et on met à
  // jour l'état local via le setter brut, sans réécrire en stockage pour éviter
  // toute boucle de dispatch.
  useEffect(() => {
    const sync = () => setValue(getAgreementFromLocalStorage() ?? null);
    window.addEventListener(AGREEMENT_STORAGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AGREEMENT_STORAGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
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
  try {
    if (window?.localStorage) {
      if (agreement) {
        window.localStorage.setItem(
          STORAGE_KEY_AGREEMENT,
          JSON.stringify(agreement)
        );
        dispatchAgreementStorageEvent(agreement);
      } else {
        window.localStorage.removeItem(STORAGE_KEY_AGREEMENT);
        dispatchAgreementStorageEvent(null);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const getAgreementFromLocalStorage = (): Agreement | undefined => {
  try {
    if (window?.localStorage) {
      const data = window.localStorage.getItem(STORAGE_KEY_AGREEMENT);
      return data ? JSON.parse(data) : undefined;
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeAgreementFromLocalStorage = () => {
  try {
    if (window?.localStorage) {
      window.localStorage.removeItem(STORAGE_KEY_AGREEMENT);
      dispatchAgreementStorageEvent(null);
    }
  } catch (e) {
    console.error(e);
  }
};
