// eslint-disable-next-line import/no-extraneous-dependencies
import "katex/dist/katex.min.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import "react-image-lightbox/style.css";

import * as Sentry from "@sentry/browser";
import { GlobalStyles, ThemeProvider } from "@socialgouv/cdtn-ui";
import App from "next/app";
import getConfig from "next/config";
import Head from "next/head";
import React from "react";

import { A11y } from "../src/a11y";
import { initPiwik } from "../src/piwik";
import { initializeSentry, notifySentry } from "../src/sentry";
import CustomError from "./_error";
import Custom404 from "./404";

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
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (err) {
        pageProps = { message: err.message, statusCode: 500 };
      }
    }

    return { pageProps };
  }

  componentDidMount() {
    initPiwik({ piwikUrl: PIWIK_URL, siteId: PIWIK_SITE_ID });
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
    // Maybe that this should be done at the page level to allow static optimization at the _app lvl
    // https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
    if (pageProps.statusCode) {
      return (
        <ThemeProvider>
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <GlobalStyles />
            {pageProps.statusCode === 404 ? (
              <Custom404 />
            ) : (
              <CustomError statusCode={pageProps.statusCode} />
            )}
          </>
        </ThemeProvider>
      );
    }
    return (
      <React.StrictMode>
        <ThemeProvider>
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
            </Head>
            <GlobalStyles />
            <A11y />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}
