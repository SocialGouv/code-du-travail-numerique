import React from "react";
import Head from "next/head";
import { Alert, Container, theme } from "@cdt/ui";
import styled from "styled-components";
import { withRouter } from "next/router";
import { Link } from "../../routes";
import ReferencesJuridiques from "../ReferencesJuridiques";
import Article from "../common/Article";
import { Breadcrumbs } from "./Breadcrumbs";
import Disclaimer from "../common/Disclaimer";
import Html from "../common/Html";
import Search from "../search/Search";
import { Feedback } from "../common/Feedback";

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
function getBreadcrumbs(items = []) {
  return items.map(({ slug, label }) => (
    <Link key={slug} route="themes" params={{ slug }}>
      <a title={`Voir le theme ${label}`}>{label}</a>
    </Link>
  ));
}
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
  breadcrumbs = [],
  referencesJuridiques = [],
  emptyMessage = "Aucun résultat"
}) {
  getBreadcrumbs;
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Search />
      <Breadcrumbs items={getBreadcrumbs(breadcrumbs)} />
      <BackToResultsLink query={router.query} />
      {!html && !children && <BigError>{emptyMessage}</BigError>}
      {(html || children) && (
        <Article title={title} icon={icon} date={date} sourceType={sourceType}>
          <Disclaimer />
          {intro}
          {html && <Html>{html}</Html>}
          {children}
          <Footer>{footer}</Footer>
        </Article>
      )}
      {additionalContent}
      {referencesJuridiques.length > 0 && (
        <ReferencesJuridiques references={referencesJuridiques} />
      )}
      <Feedback
        query={router.query.q}
        sourceType={sourceType}
        sourceFilter={router.query.source}
        url={router.asPath}
        title={title}
      />
    </React.Fragment>
  );
}

export default withRouter(Answer);

const { box, colors, spacing } = theme;

const BacklinkWrapper = styled(Container)`
  margin-top: ${spacing.base};
`;

const Footer = styled.div`
  margin-top: ${spacing.larger};
  padding: ${spacing.base};
  background-color: ${colors.lightBackground};
  border-radius: ${box.borderRadius};
`;
