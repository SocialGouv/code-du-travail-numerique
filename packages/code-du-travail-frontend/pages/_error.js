import React from "react";
import Link from "next/link";
import getConfig from "next/config";
let Sentry = require("@sentry/browser");

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

if (typeof window !== "undefined") {
  Sentry.init({ dsn: SENTRY_PUBLIC_DSN, debug: true });
}

const BrowserException = args => new Error(args);

const notifySentry = err => {
  if (typeof window === "undefined") {
    return;
  }
  Sentry.configureScope(scope => {
    scope.setTag(`ssr`, false);
  });

  Sentry.captureException(err);
};

export default class Error extends React.Component {
  static async getInitialProps({ req, res, err }) {
    return { statusCode: res.statusCode };
  }

  componentDidMount() {
    let { statusCode } = this.props;
    if (statusCode && statusCode > 200) {
      notifySentry(new BrowserException(statusCode));
    }
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div>
        <p className="center" style={{ padding: "20% 0", fontSize: "2em" }}>
          {this.props.statusCode
            ? `Une erreur ${statusCode} est apparue sur le serveur`
            : "Une erreur est apparue sur le client"}
          <br />
          <br />
          <br />
          <Link href="/">Retour à la page d'accueil</Link>
        </p>
      </div>
    );
  }
}
