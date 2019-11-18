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
          <link
            href="https://fonts.googleapis.com/css?family=Merriweather:400,700|Open+Sans:400,600i&display=swap"
            rel="stylesheet"
          />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script src="//polyfill.incubateur.social.gouv.fr/v3/polyfill.min.js?features=default%2CArray.prototype.includes%2CArray.prototype.find%2CArray.prototype.findIndex%2CObject.setPrototypeOf%2CObject.values%2CNumber.isFinite%2CSymbol%2CSymbol.hasInstance%2CSymbol.isConcatSpreadable%2CSymbol.iterator%2CSymbol.unscopables%2CSymbol.toStringTag%2CSymbol.toPrimitive%2CSymbol.split%2CSymbol.search%2CSymbol.species%2CSymbol.replace%2CSymbol.match%2CSet%2CMap%2CWeakMap" />
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
