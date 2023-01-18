import "katex/dist/katex.min.css";
import "react-image-lightbox/style.css";
import "../public/static/modeles.css";

import * as Sentry from "@sentry/nextjs";
import { GlobalStyles, ThemeProvider } from "@socialgouv/cdtn-ui";
import { AppProps } from "next/app";
import { init, push } from "@socialgouv/matomo-next";
import React, { useEffect } from "react";

import { A11y } from "../src/a11y";
import { getSourceUrlFromPath } from "../src/lib";
import { useRouter } from "next/router";
import { PIWIK_SITE_ID, PIWIK_URL, FRONTEND_HOST } from "../src/config";

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

  useEffect(() => {
    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      onInitialization: () => {
        const referrerUrl = getSourceUrlFromPath(FRONTEND_HOST + router.asPath);
        if (referrerUrl) {
          push(["setReferrerUrl", referrerUrl]);
        }
      },
    });
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider>
        <GlobalStyles />
        <A11y />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;
