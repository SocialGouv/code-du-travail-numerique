import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { withRouter } from "next/router";
import { Alert, Container, theme, Wrapper } from "@cdt/ui";
import { Link } from "../../routes";
import ReferencesJuridiques from "../ReferencesJuridiques";
import Article from "../common/Article";
import { Breadcrumbs } from "./Breadcrumbs";
import Disclaimer from "../common/Disclaimer";
import Html from "../common/Html";
import Search from "../search/Search";
import { Feedback } from "../common/Feedback";

const BigError = ({ children }) => (
  <StyledContainer>
    <Alert variant="warning">{children}</Alert>
  </StyledContainer>
);

const BackToResultsLink = ({ query }) => {
  if (!query.q) return null;

  return (
    <BacklinkContainer>
      <Link route="recherche" params={{ ...query }}>
        <a>{"< Retour aux résultats"}</a>
      </Link>
    </BacklinkContainer>
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
          {intro && <IntroWrapper variant="dark">{intro}</IntroWrapper>}
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
      <Disclaimer />
    </React.Fragment>
  );
}

export default withRouter(Answer);

const { box, colors, spacing } = theme;

const StyledContainer = styled(Container)`
  margin: 20%;
  font-size: 2rem;
  text-align: center;
`;

const BacklinkContainer = styled(Container)`
  margin-top: ${spacing.base};
`;

const IntroWrapper = styled(Wrapper)`
  margin-top: ${spacing.base};
`;

const Footer = styled.div`
  margin-top: ${spacing.larger};
  padding: ${spacing.base};
  background-color: ${colors.lightBackground};
  border-radius: ${box.borderRadius};
`;
