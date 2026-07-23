"use client";

import { useCallback, useEffect, useState } from "react";
import type { Agreement } from "src/modules/outils/indemnite-depart/types";
import {
  AGREEMENT_STORAGE_EVENT,
  getAgreementFromLocalStorage,
  removeAgreementFromLocalStorage,
  saveAgreementToLocalStorage,
  STORAGE_KEY_AGREEMENT,
} from "src/modules/utils/useLocalStorage";

export type AgreementStorageState = {
  agreement?: Agreement;
  setAgreement: (agreement?: Agreement) => void;
  clearAgreement: () => void;
};

export const useAgreementStorageSync = (): AgreementStorageState => {
  const [agreement, setAgreementState] = useState<Agreement | undefined>();

  const readFromStorage = useCallback(() => {
    const current = getAgreementFromLocalStorage();
    setAgreementState(current);
  }, []);

  useEffect(() => {
    readFromStorage();
  }, [readFromStorage]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY_AGREEMENT) return;
      readFromStorage();
    };

    const onCustomStorage = () => {
      readFromStorage();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(AGREEMENT_STORAGE_EVENT, onCustomStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(AGREEMENT_STORAGE_EVENT, onCustomStorage);
    };
  }, [readFromStorage]);

  const setAgreement = useCallback((agreement?: Agreement) => {
    setAgreementState(agreement);
    saveAgreementToLocalStorage(agreement ?? null);
  }, []);

  const clearAgreement = useCallback(() => {
    setAgreementState(undefined);
    removeAgreementFromLocalStorage();
  }, []);

  return {
    agreement,
    setAgreement,
    clearAgreement,
  };
};
