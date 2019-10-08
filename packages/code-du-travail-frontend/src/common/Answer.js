import React from "react";
import { Alert, Container, theme, Wrapper } from "@cdt/ui-old";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import styled from "styled-components";
import Article from "../common/Article";
import Disclaimer from "../common/Disclaimer";
import { Feedback } from "../common/Feedback";
import Html from "../common/Html";
import useGlossary from "../glossary";
import { ThemeBreadcrumbs } from "../common/ThemeBreadcrumbs";
import { groupByDisplayCategory } from "../search/utils";
import { getRouteBySource } from "@cdt/sources";

const BigError = ({ children }) => (
  <StyledErrorContainer>
    <Alert variant="warning">{children}</Alert>
  </StyledErrorContainer>
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
  const glossaryItems = useGlossary(children, html);
  const linkedResults = groupByDisplayCategory(relatedItems);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeBreadcrumbs breadcrumbs={breadcrumbs} />
      <BackToResultsLink query={router.query} />
      <StyledContainer>
        <StyledContent hasResults={linkedResults.matches.length === 0}>
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
        {linkedResults.matches.length > 0 && (
          <StyledMenu>
            <StyledMenuList>
              <StyledMenuTitle>
                Les articles pouvant vous interesser :
              </StyledMenuTitle>
              <ul>
                {linkedResults.matches
                  .filter(link => link.title !== title)
                  .slice(0, 3)
                  .map(link => (
                    <li key={link.title}>
                      <Link
                        href={`/${getRouteBySource(link.source)}/[slug]`}
                        as={`/${getRouteBySource(link.source)}/${link.slug}`}
                      >
                        <a>{link.title}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </StyledMenuList>
          </StyledMenu>
        )}
      </StyledContainer>
      <Disclaimer />
    </>
  );
}

export default withRouter(Answer);

const { box, breakpoints, colors, fonts, spacing } = theme;

const StyledErrorContainer = styled(Container)`
  margin: 20%;
  font-size: ${fonts.sizeH2};
  text-align: center;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0;
`;

const StyledContent = styled.div`
  width: ${props => (props.hasResults ? "80%" : "70%")};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const StyledMenu = styled.div`
  padding: ${spacing.large} 0;
  width: 30%;
  color: ${colors.blue};
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.large} 0;
    margin: 0 ${spacing.medium};
    width: 100%;
  }
`;

const StyledMenuList = styled.div`
  position: sticky;
  top: ${spacing.base};
  border-left: 1px solid ${colors.blue};
  padding: 0 ${spacing.base};
  & li {
    margin: ${spacing.base} 0;
  }
  @media (max-width: ${breakpoints.tablet}) {
    position: relative;
  }
`;

const StyledMenuTitle = styled.div`
  font-size: ${fonts.sizeBase};
  font-weight: bold;
  @media (max-width: ${breakpoints.tablet}) {
    padding-bottom: ${spacing.large};
    font-size: ${fonts.sizeH2};
    font-weight: normal;
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
