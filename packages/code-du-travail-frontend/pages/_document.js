import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import * as Sentry from "@sentry/browser";
import "url-search-params";

process.on("unhandledRejection", err => {
  Sentry.captureException(err);
});

process.on("uncaughtException", err => {
  Sentry.captureException(err);
});
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="fr" prefix="og: http://ogp.me/ns#">
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/fonts.css" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script src="/static/polyfill.min.js" />
          <script
            type="text/javascript"
            src="/static/tarteaucitron/tarteaucitron.js"
          ></script>
          <script
            type="text/javascript"
            src="/static/tarteaucitron/initTarteaucitron.js"
          ></script>
        </Head>
        <body>
          <noscript>
            Vous devez activer le JavaScript pour pouvoir profiter pleinement de
            ce site internet.
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
