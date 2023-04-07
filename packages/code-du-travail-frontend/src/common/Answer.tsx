import {
  Alert,
  Container,
  Paragraph,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { ConventionModal } from "../conventions/SearchModal";
import {
  AsideContent,
  MainAsideLayout,
  MainContent,
} from "../layout/AnswerLayout";
import { isHTML } from "../lib";
import Article from "./Article";
import Breadcrumbs from "./Breadcrumbs";
import { Feedback } from "./Feedback";
import Html from "./Html";
import { RelatedItems } from "./RelatedItems";
import { Share } from "./Share";
import { Breadcrumb } from "@socialgouv/cdtn-utils";

const BigError = ({ children }) => (
  <StyledErrorContainer>
    <Alert>{children}</Alert>
  </StyledErrorContainer>
);
type AnswerProps = {
  additionalContent?: any;
  breadcrumbs?: Breadcrumb[];
  children: any[] | any | null;
  className?: string;
  date?: string;
  dateLabel?: string;
  emptyMessage?: string;
  html?: string | null;
  intro?: string | null;
  metaDescription?: string;
  relatedItems?: any[];
  source?: any;
  subtitle?: any;
  suptitle?: string;
  title: string;
};

function Answer({
  additionalContent,
  breadcrumbs = [],
  children = null,
  className,
  date,
  dateLabel,
  emptyMessage = "Aucun résultat",
  html = null,
  intro = null,
  metaDescription = "",
  relatedItems = [],
  source,
  subtitle,
  suptitle,
  title,
}: AnswerProps) {
  const router = useRouter();
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <ConventionModal />
      <MainAsideLayout>
        <MainContent hasResults={relatedItems.length > 0} className={className}>
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
              metaDescription={metaDescription}
              date={date}
              dateLabel={dateLabel}
              source={source}
            >
              {intro && (
                <IntroWrapper variant="dark">
                  {isHTML(intro) ? (
                    <Html>{intro}</Html>
                  ) : (
                    <Paragraph noMargin>{intro}</Paragraph>
                  )}
                </IntroWrapper>
              )}
              {html && <Html>{html}</Html>}
              {children}
            </Article>
          )}
          {additionalContent}
          <ShareContainer>
            <Paragraph noMargin>Partager ce contenu&nbsp;:&nbsp;</Paragraph>
            <Share title={title} metaDescription={metaDescription} />
          </ShareContainer>
          <Feedback url={router.asPath} />
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

  & div > *:first-child {
    margin-top: 0;
  }

  & div > *:last-child {
    margin-bottom: 0;
  }
`;

const ShareContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${spacings.small};
  margin-bottom: ${spacings.base};
  font-weight: bold;
  @media (max-width: ${breakpoints.mobile}) {
    justify-content: flex-start;
  }
  @media print {
    display: none;
  }
`;
