import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

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
          <link rel="shortcut icon" href="/static/favicon.ico" />
          {this.props.styleTags}
          <script src="//cdn.polyfill.io/v2/polyfill.min.js?features=default,fetch" />
        </Head>
        <body>
          <noscript>
            Vous devez activer le JavaScript pour pouvoir profiter pleinement ce
            site internet.
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
