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
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    console.log({ ctx });
    // const pageUrl = req
    //   ? `${req.protocol}://${req.headers.host}`
    //   : `${window.location.href.protocol}://${window.location.href.hostname}${
    //       window.location.href.pathname
    //     }`;
    // if (req) {
    //   console.log(req.headers);
    // } else {
    //   console.log({ window });
    // }

    // console.log(pageUrl);
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

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
