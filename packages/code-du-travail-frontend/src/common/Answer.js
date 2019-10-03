import React, { useEffect, useState } from "react";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import { Alert, Container, theme, Wrapper } from "@cdt/ui-old";
import Tooltip from "@reach/tooltip";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Article from "../common/Article";
import Disclaimer from "../common/Disclaimer";
import Html from "../common/Html";
import { Feedback } from "../common/Feedback";
import { ThemeBreadcrumbs } from "../common/ThemeBreadcrumbs";
import { groupByDisplayCategory } from "../search/utils";
import { getRouteBySource } from "@cdt/sources";

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

function Answer({
  router,
  title,
  intro = null,
  html = null,
  children = null,
  wide,
  footer,
  date,
  sourceType,
  additionalContent,
  breadcrumbs = [],
  relatedItems = [],
  emptyMessage = "Aucun résultat"
}) {
  const portalComponents = usePortals(children, html);
  const linkedResults = groupByDisplayCategory(relatedItems);
  console.log("CONSOLE LOG: linkedResults", linkedResults);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeBreadcrumbs breadcrumbs={breadcrumbs} />
      <BackToResultsLink query={router.query} />
      <StyledWrapper>
        <StyledContent>
          {!html && !children && <BigError>{emptyMessage}</BigError>}
          {(html || children) && (
            <Article
              wide={wide}
              title={title}
              date={date}
              sourceType={sourceType}
            >
              {intro && <IntroWrapper variant="dark">{intro}</IntroWrapper>}
              {html && <Html>{html}</Html>}
              {children}
              {portalComponents}
              {footer && <Footer>{footer}</Footer>}
            </Article>
          )}
          {additionalContent}
        </StyledContent>
        <StyledMenu>
          <StyledMenuList>
            <strong>Les articles pouvant vous interesser :</strong>
            <ul>
              {/* {(linkedResults &&
                linkedResults
                  .filter(link => link.title !== title)
                  .slice(0, 3)
                  .map(link => (
                    <li key={link.title}>
                      <Link
                        href={`/${getRouteBySource(link.source)}/${link.slug}`}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))) || <>Chargement...</>} */}
            </ul>
          </StyledMenuList>
        </StyledMenu>
      </StyledWrapper>
      <Feedback
        query={router.query.q}
        sourceType={sourceType}
        sourceFilter={router.query.source}
        url={router.asPath}
        title={title}
      />
      <Disclaimer />
    </>
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
      <StyledTooltip label={<Html>{definition}</Html>} aria-label={definition}>
        <Underline tabIndex="0">{term}</Underline>
      </StyledTooltip>
    </>
  );
};

const { box, breakpoints, colors, fonts, spacing } = theme;

const StyledContainer = styled(Container)`
  margin: 20%;
  font-size: ${fonts.sizeH2};
  text-align: center;
`;

const StyledWrapper = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;

const StyledContent = styled.div`
  width: 70%;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const StyledMenu = styled.div`
  padding: 2rem 0;
  width: 30%;
  color: ${colors.blue};
  & a {
    text-decoration: none;
  }
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const StyledMenuList = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: ${spacing.base};
  border-left: 1px solid ${colors.blue};
  padding: 0 ${spacing.base};
  & li {
    margin: ${spacing.base} 0;
  }
`;

const BacklinkContainer = styled(Container)`
  padding-top: ${spacing.base};
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

function usePortals(children, html) {
  const [portalComponents, setPortalComponents] = useState();
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll(
        "[data-main-content] p, [data-main-content] li:not([role=tab])"
      )
    ).reduce((state, node) => {
      glossary.forEach(item => {
        // we cannot use \b word boundary since \w does not match diacritics
        // So we do a kind of \b equivalent.
        // the main différence is that matched pattern can include a whitespace as first char
        const frDiacritics = "àâäçéèêëïîôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ";
        const wordBoundaryStart = `(?:^|[^\\w${frDiacritics}])`;
        const wordBoundaryEnd = `(?![\\w${frDiacritics}])`;
        const patterns = [...new Set([item.title, ...item.variants])]
          .map(
            term =>
              new RegExp(`${wordBoundaryStart}${term}${wordBoundaryEnd}`, "gi")
          )
          .concat(item.abbrs.map(abbr => new RegExp(`\\b${abbr}\\b`, "g")));

        patterns.forEach(pattern => {
          node.innerHTML = node.innerHTML.replace(pattern, function(match) {
            if (new RegExp(`^[^\\w${frDiacritics}]`).test(match)) {
              // Since match string can start with a space, we trim it and insert the space before the tooltip markup
              return `${match.slice(0, 1)}<span data-tooltip-slug="${
                item.slug
              }" data-tooltip-term="${match.slice(1)}"></span>`;
            }
            return `<span data-tooltip-slug="${item.slug}" data-tooltip-term="${match}"></span>`;
          });
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
  return portalComponents;
}
