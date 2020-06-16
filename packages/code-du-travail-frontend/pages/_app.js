import React from "react";
import PropTypes from "prop-types";
import App from "next/app";
import getConfig from "next/config";
import dynamic from "next/dynamic";
import * as Sentry from "@sentry/browser";

import { GlobalStyles, ThemeProvider } from "@socialgouv/react-ui";

import CustomError from "./_error";
import Custom404 from "./404";

import { initPiwik } from "../src/piwik";
import { initializeSentry } from "../src/sentry";

import { A11y } from "../src/a11y";

// eslint-disable-next-line import/no-extraneous-dependencies
import "katex/dist/katex.min.css";

if (typeof window !== "undefined") {
  // Get tooltips web-component
  dynamic(() => import("../src/web-components/tooltip"));
  dynamic(() => import("../src/web-components/tooltip-cc"));
}

const {
  publicRuntimeConfig: { PIWIK_URL, PIWIK_SITE_ID },
} = getConfig();

initializeSentry();

export default class MyApp extends App {
  // HACK @lionelb from https://github.com/zeit/next.js/issues/4687#issuecomment-432608667
  // This is to fix withRouter() from next/router
  // IE10 static props hoisting doesn't work
  static childContextTypes = {
    headManager: PropTypes.object,
    router: PropTypes.object,
  };
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (err) {
        pageProps = { statusCode: 500, message: err.message };
      }
    }
    // pageUrl and ogImage are only defined on serverside request
    // maybe this should be done at the page level to allow static optimization at the _app lvl
    if (ctx.req) {
      pageProps.pageUrl = `${ctx.req.protocol}://${ctx.req.headers.host}${ctx.req.path}`;
      pageProps.ogImage = `${ctx.req.protocol}://${ctx.req.headers.host}/static/assets/img/social-preview.png`;
    }

    return { pageProps };
  }

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
