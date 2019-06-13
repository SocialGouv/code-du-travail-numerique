import React from "react";
import Link from "next/link";
import getConfig from "next/config";
import { Section } from "@cdt/ui";
import { PageLayout } from "../src/layout/PageLayout";
const Sentry = require("@sentry/browser");

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

if (typeof window !== "undefined") {
  Sentry.init({ dsn: SENTRY_PUBLIC_DSN, debug: true });
}

const notifySentry = statusCode => {
  if (typeof window === "undefined") {
    return;
  }
  Sentry.withScope(scope => {
    scope.setTag(`ssr`, false);
    Sentry.captureMessage(`Error ${statusCode}`, "error");
  });
};

export default class Error extends React.Component {
  static async getInitialProps({ res }) {
    return { statusCode: res.statusCode };
  }

  componentDidMount() {
    const { statusCode } = this.props;
    if (statusCode && statusCode > 200) {
      notifySentry(statusCode);
    }
  }

  render() {
    const { statusCode } = this.props;
    return (
      <PageLayout>
        <Section variant="light">
          <div
            className="center"
            style={{
              minHeight: "calc(90vh - 15rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <p style={{ fontSize: "2em" }}>
              {this.props.statusCode
                ? `Une erreur ${statusCode} est apparue sur le serveur`
                : "Une erreur est apparue sur le client"}
              <br />
              <br />
              <Link href="/">Retour à la page d’accueil</Link>
            </p>
          </div>
        </Section>
      </PageLayout>
    );
  }
}
