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
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="fr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="google-site-verification"
            content="k5625aNLEYRAFI6MIHOJNN4gfMeDVhdsTIe2ZEtxAqU"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          {this.props.styleTags}
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/print.css"
            media="print"
          />
          <script
            crossOrigin="anonymous"
            src="https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.includes%2CArray.prototype.find%2CArray.prototype.findIndex%2CObject.setPrototypeOf%2CNumber.isFinite%2Cfetch%2CSymbol%2CSymbol.hasInstance%2CSymbol.isConcatSpreadable%2CSymbol.iterator%2CSymbol.unscopables%2CSymbol.toStringTag%2CSymbol.toPrimitive%2CSymbol.split%2CSymbol.search%2CSymbol.species%2CSymbol.replace%2CSymbol.match%2CSet%2CMap%2CWeakMap"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1244076,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
            }}
          />
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
