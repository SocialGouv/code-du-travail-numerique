import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import styled from "styled-components";
import { withRouter } from "next/router";
import { Alert, Container, theme, Wrapper } from "@cdt/ui-old";
import Link from "next/link";
import Article from "../common/Article";
import { Breadcrumbs } from "./Breadcrumbs";
import Disclaimer from "../common/Disclaimer";
import Html from "../common/Html";
import Search from "../search/Search";
import { Feedback } from "../common/Feedback";

import Tooltip from "@reach/tooltip";

import glossary from "@cdt/data...datafiller/glossary.data.json";

const glossaryBySlug = glossary.reduce(
  (state, item) => ({ ...state, [item.slug]: item }),
  {}
);

const BigError = ({ children }) => (
  <StyledContainer>
    <Alert variant="warning">{children}</Alert>
  </StyledContainer>
);

const BackToResultsLink = ({ query }) => {
  if (!query.q) return null;

  return (
    <BacklinkContainer>
      <Link href={{ pathname: "/recherche", query }}>
        <a>{"< Retour aux résultats"}</a>
      </Link>
    </BacklinkContainer>
  );
};
function getBreadcrumbs(items = []) {
  return items.map(({ slug, label }) => (
    <Link key={slug} href="/themes[slug]" as={`/themes/${slug}`}>
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
  wide,
  footer,
  date,
  icon,
  sourceType,
  additionalContent,
  breadcrumbs = [],
  emptyMessage = "Aucun résultat"
}) {
  const [portalComponents, setPortalComponents] = useState();
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll(
        "[data-main-content] p, [data-main-content] li:not([role=tab])"
      )
    ).reduce((state, node) => {
      glossary.forEach(item => {
        const patterns = [...new Set([item.title, ...item.variants])]
          .map(term => new RegExp(`\\b${term}\\b`, "gi"))
          .concat(item.abbrs.map(abbr => new RegExp(`\\b${abbr}\\b`, "g")));

        patterns.forEach(pattern => {
          node.innerHTML = node.innerHTML.replace(
            pattern,
            `<span data-tooltip-slug="${item.slug}" data-tooltip-term="$&"></span>`
          );
        });
      });

      return state.concat(
        Array.from(node.querySelectorAll("[data-tooltip-slug]")).map(node => ({
          node,
          term: node.getAttribute("data-tooltip-term"),
          definition:
            glossaryBySlug[node.getAttribute("data-tooltip-slug")].definition
        }))
      );
    }, []);
    setPortalComponents(
      nodes.map(({ node, term, definition }, i) => {
        return (
          <Portal key={`item-${i}`} node={node}>
            <DefinitonTerm term={term} definition={definition} />
          </Portal>
        );
      })
    );
    return function cleanEffect() {};
  }, [children, html]);
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
          {portalComponents}
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

const Portal = ({ node, children }) => {
  if (!node) return null;

  return ReactDOM.createPortal(children, node);
};

const DefinitonTerm = ({ term, definition }) => {
  return (
    <>
      <StyledTooltip
        label={<div dangerouslySetInnerHTML={{ __html: definition }} />}
        aria-label={definition}
      >
        <Underline>{term}</Underline>
      </StyledTooltip>
    </>
  );
};

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

const StyledTooltip = styled(Tooltip)`
  z-index: 10;
  pointer-events: none;
  position: absolute;
  padding: 0.25em 0.5em;
  box-shadow: ${box.shadow};
  width: 300px;
  max-width: 70vw;
  font-size: ${fonts.sizeBase};
  background: ${colors.elementBackground};
  color: ${colors.lightText};
  border: solid 1px ${colors.elementBorder};
`;
const Underline = styled.span`
  border-bottom: 1px dotted ${colors.blueLight};
`;
