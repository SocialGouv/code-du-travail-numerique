import Document, { Head, Main, NextScript } from "next/document";
import GitHubForkRibbon from "react-github-fork-ribbon";
import Header from "../src/layout/Header.js";
import Footer from "../src/layout/Footer.js";
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
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Code du travail numérique</title>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/static/bundle.css" />
          {this.props.styleTags}
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,es6,Array.prototype.includes" />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <nav aria-label="page" className="skip-links">
            <a href="#main">Contenu principal</a>
            <a href="#footer">Pied de page</a>
          </nav>
          <GitHubForkRibbon
            href="//github.com/SocialGouv/code-du-travail-explorer"
            target="_blank"
            position="right"
            color="green"
          >
            version bêta
          </GitHubForkRibbon>
          <Header />
          <main id="main">
            <Main />
          </main>
          <Footer />
          <NextScript />
        </body>
      </html>
    );
  }
}
