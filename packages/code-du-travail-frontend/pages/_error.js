import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Section, theme } from "@cdt/ui-old";
import { Layout } from "../src/layout/Layout";
import { initializeSentry, notifySentry } from "../src/sentry";

initializeSentry();

export default class Error extends React.Component {
  static async getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode, message: err.message };
  }

  componentDidMount() {
    const { statusCode, message } = this.props;
    if (statusCode && statusCode >= 400) {
      notifySentry(statusCode, message);
    }
  }

  render() {
    const { statusCode } = this.props;
    return (
      <Layout>
        <Section variant="light">
          <FlexCenterer>
            <P>
              {this.props.statusCode
                ? `Une erreur ${statusCode} est apparue sur le serveur`
                : "Une erreur est apparue sur le client"}
              <br />
              <br />
              <Link href="/">
                <a>Retour à la page d’accueil</a>
              </Link>
            </P>
          </FlexCenterer>
        </Section>
      </Layout>
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
