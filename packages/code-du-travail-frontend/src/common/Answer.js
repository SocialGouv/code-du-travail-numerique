import React from "react";
import Head from "next/head";
import { Alert, Article, Container, theme } from "@cdt/ui";
import styled from "styled-components";
import { withRouter } from "next/router";

import { Link } from "../../routes";
import ReferencesJuridiques from "../ReferencesJuridiques";
import Disclaimer from "../common/Disclaimer";
import Html from "../common/Html";
import Search from "../search/Search";
import { Feedback } from "../common/Feedback";

const { spacing } = theme;

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

const BackToResultsLink = ({ query }) => {
  if (!query.q) return null;

  return (
    <BacklinkWrapper>
      <Link route="recherche" params={{ ...query }}>
        <a>{"< Retour aux résultats"}</a>
      </Link>
    </BacklinkWrapper>
  );
};

function Answer({
  router,
  title,
  intro = null,
  html = null,
  children = null,
  footer,
  date,
  icon,
  sourceType,
  additionalContent,
  referencesJuridiques = [],
  emptyMessage = "Aucun résultat"
}) {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Search />
      <BackToResultsLink query={router.query} />
      {!html && !children && <BigError>{emptyMessage}</BigError>}
      {(html || children) && (
        <Article title={title} icon={icon} date={date} sourceType={sourceType}>
          <Disclaimer />
          {intro}
          {html && <Html>{html}</Html>}
          {children}
          <div
            style={{
              background: "var(--color-light-background)",
              padding: 10,
              marginTop: 50
            }}
          >
            {footer}
          </div>
        </Article>
      )}
      {additionalContent}
      {referencesJuridiques.length > 0 && (
        <ReferencesJuridiques references={referencesJuridiques} />
      )}
      <Feedback
        query={router.query.q}
        source={router.query.source}
        url={router.asPath}
        title={title}
      />
    </React.Fragment>
  );
}

export default withRouter(Answer);

const BacklinkWrapper = styled(Container)`
  margin-top: ${spacing.base};
`;
