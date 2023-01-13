// eslint-disable-next-line import/no-extraneous-dependencies
import "katex/dist/katex.min.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import "react-image-lightbox/style.css";
import "../public/static/modeles.css";

import * as Sentry from "@sentry/nextjs";
import { GlobalStyles, ThemeProvider } from "@socialgouv/cdtn-ui";
import { AppProps } from "next/app";
import { init } from "@socialgouv/matomo-next";
import getConfig from "next/config";
import React, { useEffect } from "react";

import { A11y } from "../src/a11y";
import {
  clientSideRedirectMiddleware,
  serverSideRedirectMiddleware,
} from "../src/middleware/redirect";
import CustomError from "./_error";
import Custom404 from "./404";
import { onRouteChangeStart } from "../src/lib";

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

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      onRouteChangeStart,
    });
    clientSideRedirectMiddleware();
  }, []);

  return (
    <>
      {pageProps.statusCode ? (
        <ThemeProvider>
          <>
            <GlobalStyles />
            {pageProps.statusCode === 404 ? (
              <Custom404 />
            ) : (
              <CustomError {...pageProps} />
            )}
          </>
        </ThemeProvider>
      ) : (
        <React.StrictMode>
          <ThemeProvider>
            <>
              <GlobalStyles />
              <A11y />
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </React.StrictMode>
      )}
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  serverSideRedirectMiddleware(ctx.req, ctx.res);

  if (Component.getInitialProps) {
    try {
      pageProps = await Component.getInitialProps(ctx);
    } catch (err) {
      console.log(err);
      pageProps = { message: err.message, statusCode: 500 };
    }
  }
  return { pageProps };
};

export default MyApp;
