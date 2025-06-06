import * as Sentry from "@sentry/nextjs";
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
          <link
            key="rel-stylesheet"
            rel="stylesheet"
            type="text/css"
            href="/static/fonts.css"
          />

          {/* Google Tag Manager placeholder - Will only be activated with user consent */}
          <script
            id="gtm-script-placeholder"
            dangerouslySetInnerHTML={{
              __html: `
                // This is just a placeholder. The actual GTM script will be loaded
                // dynamically only after user gives explicit consent for SEA tracking.
                // See src/lib/consent/index.ts for the implementation.
                
                // The following calls will be made AFTER consent in src/lib/consent/index.ts:
                // - gtag('js', new Date());
                // - gtag('config', 'DC-3048978');
                
                // Define empty functions to prevent errors if called before consent
                window.dataLayer = window.dataLayer || [];
                window.gtag = function() {
                  // Do nothing until consent is given
                  console.log('GTM tracking blocked: waiting for user consent');
                };
              `,
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
      </Html>
    );
  }
}
