"use client";

import { useEffect, useState } from "react";
import type { ABTestName, ABTestVariant } from "../config/initABTesting";

/**
 * Returns the activated variant for a given Matomo A/B test.
 * - `null` means: no variant yet (not enabled, not ready, or not participating)
 */
export const useABTestVariant = (
  abTestName: ABTestName
): ABTestVariant | null => {
  const [variant, setVariant] = useState<ABTestVariant | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getCurrentVariant = (): ABTestVariant | null => {
      const store = window.__MATOMO_AB_TEST__;
      const state = store?.[abTestName];

      if (!state || !state.isReady) {
        return null;
      }

      return state.variant;
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

  return variant;
};
