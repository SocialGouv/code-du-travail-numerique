"use client";

import { useEffect, lazy, Suspense } from "react";
import { initConsent } from "../utils/consent";

const CookieConsentDSFR = lazy(
  () =>
    new Promise<{
      default: typeof import("./CookieConsent").CookieConsentDSFR;
    }>((resolve) =>
      import("./CookieConsent").then((module) =>
        resolve({ default: module.CookieConsentDSFR })
      )
    )
);

export const ConsentManager = () => {
  useEffect(() => {
    initConsent();
  }, []);

  return (
    <Suspense fallback={null}>
      <CookieConsentDSFR />
    </Suspense>
  );
};

export default ConsentManager;
