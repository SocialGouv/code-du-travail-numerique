import "katex/dist/katex.min.css";
import "react-image-lightbox/style.css";

import * as Sentry from "@sentry/nextjs";
import { GlobalStyles, ThemeProvider } from "@socialgouv/cdtn-ui";
import { AppProps } from "next/app";
import React from "react";

import { A11y } from "../src/a11y";
import { useRouter } from "next/router";
import CookieConsentLegacy from "../src/components/CookieConsent/index";
import { MatomoInitializer } from "../src/modules/analytics";
import { ConsentManager } from "../src/modules/cookie-consent";

if (typeof window !== "undefined") {
  import("../src/web-components/tooltip")
    .then((module) => {
      customElements.define(
        "webcomponent-tooltip",
        module.WebComponentsTooltip
      );
    })
    .catch((err) => {
      Sentry.captureException(err);
    });
  import("../src/web-components/tooltip-cc")
    .then((module) => {
      customElements.define(
        "webcomponent-tooltip-cc",
        module.WebComponentsTooltipCC
      );
    })
    .catch((err) => {
      Sentry.captureException(err);
    });
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <React.StrictMode>
      <ThemeProvider>
        <GlobalStyles />
        <A11y />
        <Component {...pageProps} />
        {!router.pathname.startsWith("/widgets") && <CookieConsentLegacy />}
        <MatomoInitializer />
        <ConsentManager />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;
