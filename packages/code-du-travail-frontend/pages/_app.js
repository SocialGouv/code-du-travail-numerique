import React from "react";
import App from "next/app";
import getConfig from "next/config";
import * as Sentry from "@sentry/browser";

import { GlobalStyles, ThemeProvider } from "@socialgouv/react-ui";

import { initPiwik } from "../src/piwik";
import { initializeSentry, notifySentry } from "../src/sentry";

import { A11y } from "../src/a11y";

// eslint-disable-next-line import/no-extraneous-dependencies
import "katex/dist/katex.min.css";

// Get tooltips web-component
if (typeof window !== "undefined") {
  import("../src/web-components/tooltip")
    .then((module) => {
      customElements.define(
        "webcomponent-tooltip",
        module.WebComponentsTooltip
      );
    })
    .catch((err) => {
      notifySentry(418, err.message || "Failed to load web component");
    });
  import("../src/web-components/tooltip-cc")
    .then((module) => {
      customElements.define(
        "webcomponent-tooltip-cc",
        module.WebComponentsTooltipCC
      );
    })
    .catch((err) => {
      notifySentry(418, err.message || "Failed to load web component");
    });
}

const {
  publicRuntimeConfig: { PIWIK_URL, PIWIK_SITE_ID },
} = getConfig();

initializeSentry();

export default class MyApp extends App {
  componentDidMount() {
    initPiwik({ siteId: PIWIK_SITE_ID, piwikUrl: PIWIK_URL });
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.StrictMode>
        <ThemeProvider>
          <>
            <GlobalStyles />
            <A11y />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}
