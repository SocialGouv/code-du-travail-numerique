import "@ungap/url-search-params";

import * as Sentry from "@sentry/browser";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

process.on("unhandledRejection", (err) => {
  Sentry.captureException(err);
});

process.on("uncaughtException", (err) => {
  Sentry.captureException(err);
});
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="fr" prefix="og: http://ogp.me/ns#">
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/fonts.css" />
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <script src="/static/polyfill.min.js" />
          <script src="/static/webcomponents-polyfill/loader.js" />
        </Head>
        <body>
          <noscript>
            Vous devez activer le JavaScript pour pouvoir profiter pleinement de
            ce site internet.
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
