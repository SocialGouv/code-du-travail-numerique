import App, { Container } from "next/app";
import React from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";

import Header from "../src/layout/Header.js";
import Footer from "../src/layout/Footer.js";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
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
          <Component {...pageProps} />
        </main>
        <Footer />
      </Container>
    );
  }
}
