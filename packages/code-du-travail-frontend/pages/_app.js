import React from "react";
import PropTypes from "prop-types";
import App, { Container } from "next/app";
import GitHubForkRibbon from "react-github-fork-ribbon";
import "@cdt/css";

import "../src/piwik";

export default class MyApp extends App {
  // HACK @lionelb from https://github.com/zeit/next.js/issues/4687#issuecomment-432608667
  // This is to fix withRouter() from next/router
  // IE10 static props hoisting doesn't work
  static childContextTypes = {
    headManager: PropTypes.object,
    router: PropTypes.object
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <GitHubForkRibbon
          href="//github.com/SocialGouv/code-du-travail-explorer"
          rel="noopener noreferrer"
          position="right"
          color="green"
        >
          version bêta
        </GitHubForkRibbon>
        <Component {...pageProps} />
      </Container>
    );
  }
}
