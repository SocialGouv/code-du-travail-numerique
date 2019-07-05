import React from "react";
import PropTypes from "prop-types";
import App, { Container } from "next/app";
import getConfig from "next/config";
import GitHubForkRibbon from "react-github-fork-ribbon";
import * as Sentry from "@sentry/browser";

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

import "../src/piwik";

if (typeof window !== "undefined" && SENTRY_PUBLIC_DSN) {
  Sentry.init({ dsn: SENTRY_PUBLIC_DSN, debug: true });
}

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

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // pageUrl and ogImage are only defined on serverside request
    if (ctx.req) {
      pageProps.pageUrl = `${ctx.req.protocol}://${ctx.req.headers.host}${
        ctx.req.path
      }`;
      pageProps.ogImage = `${ctx.req.protocol}://${
        ctx.req.headers.host
      }/static/images/social-preview.png`;
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });
    super.componentDidCatch(error, errorInfo);
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
