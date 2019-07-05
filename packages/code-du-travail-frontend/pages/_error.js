import React from "react";
import Link from "next/link";
import getConfig from "next/config";
import styled from "styled-components";
import { Section, theme } from "@cdt/ui";
import { PageLayout } from "../src/layout/PageLayout";
const Sentry = require("@sentry/browser");

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

if (typeof window !== "undefined" && SENTRY_PUBLIC_DSN) {
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
  static async getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
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
          <FlexCenterer>
            <P>
              {this.props.statusCode
                ? `Une erreur ${statusCode} est apparue sur le serveur`
                : "Une erreur est apparue sur le client"}
              <br />
              <br />
              <Link href="/">Retour à la page d’accueil</Link>
            </P>
          </FlexCenterer>
        </Section>
      </PageLayout>
    );
  }
}

const { fonts } = theme;

const FlexCenterer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(90vh - 15rem);
  text-align: center;
`;

const P = styled.p`
  font-size: ${fonts.sizeH2};
`;
