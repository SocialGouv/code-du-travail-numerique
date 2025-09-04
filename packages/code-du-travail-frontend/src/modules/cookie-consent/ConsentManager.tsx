"use client";

import { useEffect, useState, lazy, Suspense } from "react";
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
  // const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    initConsent();

    // const timer = setTimeout(() => {
    //   setShouldRender(true);
    // }, 1500);

    // return () => clearTimeout(timer);
  }, []);

  // if (!shouldRender) {
  //   return null;
  // }

  return (
    <Suspense fallback={null}>
      <CookieConsentDSFR />
    </Suspense>
  );
};

export default ConsentManager;
