import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Alert, Container, theme, Wrapper } from "@socialgouv/react-ui";

// import useGlossary from "../glossary";
import Article from "./Article";
import { Feedback } from "./Feedback";
import { RelatedItems } from "./RelatedItems";
import Html from "./Html";
import { ThemeBreadcrumbs } from "./ThemeBreadcrumbs";

const BigError = ({ children }) => (
  <StyledErrorContainer>
    <Alert>{children}</Alert>
  </StyledErrorContainer>
);

function Answer({
  title,
  intro = null,
  html = null,
  children = null,
  date,
  source,
  additionalContent,
  breadcrumbs = [],
  relatedItems = [],
  emptyMessage = "Aucun résultat"
}) {
  // const glossaryItems = useGlossary(children, html);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeBreadcrumbs breadcrumbs={breadcrumbs} />
      <StyledContainer>
        <StyledContent hasResults={relatedItems.length > 0}>
          {!html && !children && <BigError>{emptyMessage}</BigError>}
          {(html || children) && (
            <Article
              subtitle={
                breadcrumbs.length > 0 &&
                breadcrumbs[breadcrumbs.length - 1].title
              }
              title={title}
              date={date}
              source={source}
            >
              {intro && <IntroWrapper variant="dark">{intro}</IntroWrapper>}
              {html && <Html>{html}</Html>}
              {children}
            </Article>
          )}
          {additionalContent}
          <Feedback
            query={router.query.q}
            sourceType={source && source.name}
            sourceFilter={router.query.source}
            url={router.asPath}
            title={title}
          />
        </StyledContent>
        {relatedItems.length > 0 && <RelatedItems items={relatedItems} />}
      </StyledContainer>
    </>
  );
}

export default Answer;

const { breakpoints, fonts, spacings } = theme;

const StyledErrorContainer = styled(Container)`
  margin: 20%;
  font-size: ${fonts.sizes.headings.large};
  text-align: center;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.medium};
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0;
  }
`;

const StyledContent = styled.div`
  width: ${props => (props.hasResults ? "70%" : "80%")};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const IntroWrapper = styled(Wrapper)`
  margin: ${spacings.base} auto;
`;
