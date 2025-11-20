"use client";

import { lazy, Suspense, useEffect } from "react";
import { initConsent } from "../utils/consent";

type CookieConsentProps = React.ComponentProps<
  typeof import("./CookieConsent").CookieConsentDSFR
>;

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

export const ConsentManager = (props: CookieConsentProps) => {
  useEffect(() => {
    initConsent();
  }, []);

  return (
    <Suspense fallback={null}>
      <CookieConsentDSFR {...props} />
    </Suspense>
  );
};

export default ConsentManager;
