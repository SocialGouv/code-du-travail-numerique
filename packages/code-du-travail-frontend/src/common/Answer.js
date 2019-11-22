import React, { useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import {
  Alert,
  Container,
  Heading,
  List,
  ListItem,
  theme,
  Tile,
  Wrapper
} from "@socialgouv/react-ui";

import useGlossary from "../glossary";
import Article from "./Article";
import Disclaimer from "./Disclaimer";
import { Feedback } from "./Feedback";
import Html from "./Html";
import { ThemeBreadcrumbs } from "./ThemeBreadcrumbs";
import { matopush } from "../piwik";

const BigError = ({ children }) => (
  <StyledErrorContainer>
    <Alert>{children}</Alert>
  </StyledErrorContainer>
);

export const BackToResultsLink = ({ query }) => {
  const { q } = query;
  const onClick = useCallback(() => {
    matopush(["trackEvent", "backResults", q]);
  }, [q]);
  const onKeyPress = useCallback(
    event => {
      if (event.keyCode === 13)
        // Enter
        matopush(["trackEvent", "backResults", q]);
    },
    [q]
  );

  if (!q) return null;

  return (
    <BacklinkContainer>
      <Link href={{ pathname: "/recherche", query }}>
        <a role="link" tabIndex={0} onClick={onClick} onKeyPress={onKeyPress}>
          <span aria-hidden>‹</span> Retour aux résultats
        </a>
      </Link>
    </BacklinkContainer>
  );
};

function Answer({
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
  const glossaryItems = useGlossary(children, html);
  const router = useRouter();
  const { relatedTools, relatedLetters, relatedArticles } = relatedItems.reduce(
    (accumulator, item) => {
      const itemSource = item.source;
      if (itemSource === SOURCES.TOOLS) {
        accumulator.relatedTools.push(item);
      } else if (itemSource === SOURCES.LETTERS) {
        accumulator.relatedLetters.push(item);
      } else {
        accumulator.relatedArticles.push(item);
      }
      return accumulator;
    },
    {
      relatedTools: [],
      relatedLetters: [],
      relatedArticles: []
    }
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeBreadcrumbs breadcrumbs={breadcrumbs} />
      <BackToResultsLink query={router.query} />
      <StyledContainer>
        <StyledContent hasResults={relatedItems.length > 0}>
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
              {glossaryItems}
              {footer && <Footer>{footer}</Footer>}
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
        </StyledContent>
        {relatedItems.length > 0 && (
          <RelatedItems>
            <Heading>Autres contenus pouvant vous intéresser&nbsp;:</Heading>
            <List>
              {relatedArticles
                .filter(link => link.title !== title)
                .slice(0, 3)
                .map(link => (
                  <StyledListItem key={link.slug}>
                    <Link
                      href={`/${getRouteBySource(link.source)}/[slug]`}
                      as={`/${getRouteBySource(link.source)}/${link.slug}`}
                    >
                      <a>{link.title}</a>
                    </Link>
                  </StyledListItem>
                ))}
              {relatedLetters.length > 0 && (
                <StyledListItem>
                  <Link
                    href={`/${getRouteBySource(
                      relatedLetters[0].source
                    )}/[slug]`}
                    as={`/${getRouteBySource(relatedLetters[0].source)}/${
                      relatedLetters[0].slug
                    }`}
                    passHref
                  >
                    <Tile
                      size="small"
                      button={"Consulter"}
                      title={relatedLetters[0].title}
                    >
                      {relatedLetters[0].title}
                    </Tile>
                  </Link>
                </StyledListItem>
              )}
              {relatedTools.length > 0 && (
                <StyledListItem>
                  <Link
                    href={`/${getRouteBySource(relatedTools[0].source)}/[slug]`}
                    as={`/${getRouteBySource(relatedTools[0].source)}/${
                      relatedTools[0].slug
                    }`}
                    passHref
                  >
                    <Tile
                      size="small"
                      button={"Démarrer"}
                      title={relatedTools[0].title}
                    >
                      {relatedTools[0].title}
                    </Tile>
                  </Link>
                </StyledListItem>
              )}
            </List>
          </RelatedItems>
        )}
      </StyledContainer>
      <Disclaimer />
    </>
  );
}

export default Answer;

const { box, breakpoints, colors, fonts, spacings } = theme;

const StyledErrorContainer = styled(Container)`
  margin: 20%;
  font-size: ${fonts.sizes.headings.large};
  text-align: center;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0;
`;

const StyledContent = styled.div`
  width: ${props => (props.hasResults ? "70%" : "80%")};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const RelatedItems = styled.div`
  position: sticky;
  top: 0;
  width: 30%;
  padding: ${spacings.medium} ${spacings.base} ${spacings.medium} 0;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const StyledListItem = styled(ListItem)`
  margin: ${spacings.base} 0;
`;

const BacklinkContainer = styled(Container)`
  padding-top: ${spacings.base};
`;

const IntroWrapper = styled(Wrapper)`
  margin: ${spacings.base} auto;
`;

const Footer = styled.div`
  margin-top: ${spacings.larger};
  padding: ${spacings.base};
  background-color: ${colors.bgSecondary};
  border-radius: ${box.borderRadius};
`;
