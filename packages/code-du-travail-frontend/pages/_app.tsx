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
import {
  DSFR_READY_PATHS,
  PIWIK_SITE_ID,
  PIWIK_URL,
  SITE_URL,
} from "../src/config";

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

const WIDGETS_PATH = /\/widgets\/.*/;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      onInitialization: () => {
        const referrerUrl =
          document?.referrer || getSourceUrlFromPath(SITE_URL + router.asPath);
        if (referrerUrl) {
          push(["setReferrerUrl", referrerUrl]);
        }
        if (router.pathname.match(WIDGETS_PATH)) {
          push(["setCookieSameSite", "None"]);
        }
      },
      excludeUrlsPatterns: [WIDGETS_PATH],
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const currentPath = router.pathname;
      const newAndCurrentPathAreDsfr =
        DSFR_READY_PATHS.includes(url) &&
        DSFR_READY_PATHS.includes(currentPath);
      const newAndCurrentPathAreNotDsfr =
        !DSFR_READY_PATHS.includes(url) &&
        !DSFR_READY_PATHS.includes(currentPath);
      const needToReload =
        newAndCurrentPathAreDsfr || !newAndCurrentPathAreNotDsfr;
      if (needToReload) {
        window.location.reload();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, router.pathname]);

  if (!DSFR_READY_PATHS.includes(router.pathname)) {
    return (
      <React.StrictMode>
        <ThemeProvider>
          <GlobalStyles />
          <A11y />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.StrictMode>
    );
  } else {
    return (
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    );
  }
}

export default MyApp;
