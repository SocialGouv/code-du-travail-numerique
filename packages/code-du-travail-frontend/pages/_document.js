import "@ungap/url-search-params";

import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

process.on("unhandledRejection", (err) => {
  throw new Error(err);
});

process.on("uncaughtException", (err) => {
  throw new Error(err);
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
          <link
            key="rel-stylesheet"
            rel="stylesheet"
            type="text/css"
            href="/static/fonts.css"
          />
          <script key="polyfill" src="/static/polyfill.min.js" />
          <script
            key="webcomponents"
            src="/static/webcomponents-polyfill/loader.js"
          />
          <script key="smarttag" src="/static/smarttag.js" />
          <script
            key="tarteaucitron"
            src="/static/tarteaucitron/tarteaucitron.js"
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
      </Html>
    );
  }
}
