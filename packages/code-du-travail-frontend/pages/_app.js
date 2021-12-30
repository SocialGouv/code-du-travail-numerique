// eslint-disable-next-line import/no-extraneous-dependencies
import "katex/dist/katex.min.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import "react-image-lightbox/style.css";
import "../public/static/modeles.css";

import * as Sentry from "@sentry/nextjs";
import { GlobalStyles, ThemeProvider } from "@socialgouv/cdtn-ui";
import App from "next/app";
import getConfig from "next/config";
import React from "react";

import { A11y } from "../src/a11y";
import {
  clientSideRedirectMiddleware,
  serverSideRedirectMiddleware,
} from "../src/middleware/redirect";
import { initPiwik } from "../src/piwik";
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

const {
  publicRuntimeConfig: { PIWIK_URL, PIWIK_SITE_ID },
} = getConfig();

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    serverSideRedirectMiddleware(ctx.req, ctx.res);

    if (Component.getInitialProps) {
      try {
        const initialProps = await Component.getInitialProps(ctx);
        if (initialProps.statusCode) {
          ctx.res.statusCode = initialProps.statusCode;
        }
        pageProps = await Component.getInitialProps(ctx);
      } catch (err) {
        ctx.res.statusCode = 500;
        pageProps = { message: err.message, statusCode: 500 };
      }
    }
    return { pageProps };
  }

  componentDidMount() {
    initPiwik({ piwikUrl: PIWIK_URL, siteId: PIWIK_SITE_ID });
    clientSideRedirectMiddleware();
  }

  render() {
    const { Component, pageProps } = this.props;
    // Maybe that this should be done at the page level to allow static optimization at the _app lvl
    // https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
    if (pageProps.statusCode) {
      return (
        <ThemeProvider>
          <>
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
            <GlobalStyles />
            <A11y />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}
