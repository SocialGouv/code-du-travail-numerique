import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { withRouter } from "next/router";
import { Alert, Container, theme, Wrapper } from "@cdt/ui-old";
import { Link } from "../../routes";
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
const ROOT_CRUMB = {
  title: "Thèmes",
  slug: null
};

function getBreadcrumbs(items = []) {
  if (!items.length) {
    return [];
  }
  return [ROOT_CRUMB].map(({ slug, title }) => (
    <Link key={slug} route="themes" params={{ slug }}>
      <a title={`Voir le theme ${title}`}>{title}</a>
    </Link>
  ));
}
function Answer({
  router,
  title,
  intro = null,
  html = null,
  children = null,
  wide,
  footer,
  date,
  icon,
  sourceType,
  additionalContent,
  breadcrumbs = [],
  emptyMessage = "Aucun résultat"
}) {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Search />
      {breadcrumbs.length && (
        <Breadcrumbs items={getBreadcrumbs(breadcrumbs)} />
      )}
      <BackToResultsLink query={router.query} />
      {!html && !children && <BigError>{emptyMessage}</BigError>}
      {(html || children) && (
        <Article
          wide={wide}
          title={title}
          icon={icon}
          date={date}
          sourceType={sourceType}
        >
          {intro && <IntroWrapper variant="dark">{intro}</IntroWrapper>}
          {html && <Html>{html}</Html>}
          {children}
          <Footer>{footer}</Footer>
        </Article>
      )}
      {additionalContent}
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

const { box, colors, fonts, spacing } = theme;

const StyledContainer = styled(Container)`
  margin: 20%;
  font-size: ${fonts.sizeH2};
  text-align: center;
`;

const BacklinkContainer = styled(Container)`
  margin-top: ${spacing.base};
`;

const IntroWrapper = styled(Wrapper)`
  margin: ${spacing.base} auto;
`;

const Footer = styled.div`
  margin-top: ${spacing.larger};
  padding: ${spacing.base};
  background-color: ${colors.lightBackground};
  border-radius: ${box.borderRadius};
`;
