"use client";

import { useEffect, useState } from "react";
import { ABTesting, ABTestVariant } from "../config/initABTesting";

export const useABTestVariant = (
  abTestName: ABTesting
): ABTestVariant | null => {
  const [variant, setVariant] = useState<ABTestVariant | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const getCurrentVariant = (): ABTestVariant | null => {
      const abTest = window.__MATOMO_AB_TEST__;

      if (!abTest || !abTest.isReady || abTest.abTest !== abTestName) {
        return null;
      }

      return abTest.variant;
    };

    const initialVariant = getCurrentVariant();
    if (initialVariant) {
      setVariant(initialVariant);
      return;
    }

    const interval = setInterval(() => {
      const currentVariant = getCurrentVariant();
      if (currentVariant) {
        setVariant(currentVariant);
        clearInterval(interval);
      }
    }, 100);

    const timeoutId = setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [abTestName]);

  return ABTestVariant.SEARCH_V2;
};
