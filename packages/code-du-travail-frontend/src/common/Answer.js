import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Alert, Container, theme, Wrapper } from "@socialgouv/react-ui";

import Article from "./Article";
import { Feedback } from "./Feedback";
import { RelatedItems } from "./RelatedItems";
import Html from "./Html";
import { Breadcrumbs } from "./Breadcrumbs";
import useGlossary from "../glossary";
import {
  AsideContent,
  MainAsideLayout,
  MainContent
} from "../layout/AnswerLayout";

const BigError = ({ children }) => (
  <StyledErrorContainer>
    <Alert>{children}</Alert>
  </StyledErrorContainer>
);

function Answer({
  additionalContent,
  breadcrumbs = [],
  children = null,
  date,
  dateLabel,
  emptyMessage = "Aucun résultat",
  html = null,
  intro = null,
  relatedItems = [],
  source,
  subtitle,
  suptitle,
  title
}) {
  const glossaryItems = useGlossary(children, html);
  const router = useRouter();

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <MainAsideLayout>
        <MainContent hasResults={relatedItems.length > 0}>
          {!html && !children && <BigError>{emptyMessage}</BigError>}
          {(html || children) && (
            <Article
              suptitle={
                suptitle ||
                (breadcrumbs.length > 0 &&
                  breadcrumbs[breadcrumbs.length - 1].label)
              }
              subtitle={subtitle}
              title={title}
              date={date}
              dateLabel={dateLabel}
              source={source}
            >
              {intro && <IntroWrapper variant="dark">{intro}</IntroWrapper>}
              {html && <Html>{html}</Html>}
              {children}
            </Article>
          )}
          {additionalContent}
          {glossaryItems}
          <Feedback
            query={router.query.q}
            sourceType={source && source.name}
            sourceFilter={router.query.source}
            url={router.asPath}
            title={title}
          />
        </MainContent>
        {relatedItems.length > 0 && (
          <AsideContent sticky>
            <RelatedItems items={relatedItems} />
          </AsideContent>
        )}
      </MainAsideLayout>
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

const IntroWrapper = styled(Wrapper)`
  margin: ${spacings.base} auto;
`;
