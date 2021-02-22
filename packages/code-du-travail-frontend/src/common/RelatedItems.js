import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  ArrowLink,
  Button,
  Container,
  FlatList,
  Heading,
  icons,
  ScreenReaderOnly,
  Subtitle,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { matopush } from "../piwik";
import { SurveyModal } from "./SurveyModal";

const matoSelectRelated = (reco, selection) => {
  matopush([
    "trackEvent",
    "selectRelated",
    JSON.stringify({
      reco,
      selection,
    }),
  ]);
};

export const RelatedItems = ({ disableSurvey = false, items = [] }) => {
  const isArticleSource = (source) =>
    ![SOURCES.EXTERNALS, SOURCES.LETTERS, SOURCES.TOOLS].includes(source);

  const relatedOtherItems = items
    .filter(({ source }) => !isArticleSource(source))
    .slice(0, 2);
  const relatedArticleItems = items
    .filter(({ source }) => isArticleSource(source))
    .slice(0, 6);

  const relatedGroups = [
    { items: relatedOtherItems, title: "Modèles et outils liés" },
    { items: relatedArticleItems, title: "Articles liés" },
  ];

  return (
    <Container>
      {!disableSurvey && (
        <SurveyModal>
          {({
            setModalVisible,
            isPromptVisible,
            isSurveyDisabled,
            setPromptVisible,
            setSurveyDisabled,
          }) =>
            !isSurveyDisabled &&
            isPromptVisible && (
              <PromptWrapper>
                <Toast animate="from-right" wide shadow>
                  <CloseButton
                    variant="naked"
                    small
                    narrow
                    title="ne pas répondre aux questions"
                    onClick={() => {
                      setPromptVisible(false);
                      setSurveyDisabled(true);
                    }}
                  >
                    <ScreenReaderOnly>fermer la modale</ScreenReaderOnly>
                    <CloseIcon aria-hidden />
                  </CloseButton>
                  <PromptContainer>
                    <Subtitle>Questionnaire</Subtitle>
                    <PromptLabel>Aidez-nous à améliorer le site</PromptLabel>
                    <Button
                      small
                      onClick={() => {
                        matopush([
                          "trackEvent",
                          "survey",
                          "open from related items",
                        ]);
                        setModalVisible(true);
                      }}
                    >
                      Commencer
                    </Button>
                  </PromptContainer>
                </Toast>
              </PromptWrapper>
            )
          }
        </SurveyModal>
      )}
      {relatedGroups.map(
        ({ title, items }) =>
          items.length > 0 && (
            <React.Fragment key={title}>
              <Heading as="div">{title}&nbsp;:</Heading>
              <FlatList>
                {items.map(({ slug, source, title, reco, url }) => {
                  // if source is external we use url otherwise we assemble the route
                  const href =
                    source != SOURCES.EXTERNALS
                      ? `/${getRouteBySource(source)}/${slug}`
                      : url;

                  return (
                    <StyledLinkItem key={href}>
                      <Link href={href} passHref>
                        <ArrowLink
                          arrowPosition="left"
                          onClick={() =>
                            matoSelectRelated(
                              reco,
                              // legacy : we do not include the leading '/' in the the selection
                              source != SOURCES.EXTERNALS ? href.slice(1) : href
                            )
                          }
                        >
                          {title}
                        </ArrowLink>
                      </Link>
                    </StyledLinkItem>
                  );
                })}
              </FlatList>
            </React.Fragment>
          )
      )}
    </Container>
  );
};

const { breakpoints, spacings } = theme;

const StyledLinkItem = styled.li`
  margin: 0 0 ${spacings.base} 0;
  padding: 0;
`;

// Survey stuff

const PromptWrapper = styled.div`
  margin-bottom: ${spacings.larger};
  @media (max-width: ${breakpoints.tablet}) {
    position: fixed;
    right: 27%;
    bottom: ${spacings.small};
    left: 27%;
    z-index: 1;
  }
  @media (max-width: ${breakpoints.mobile}) {
    right: ${spacings.small};
    left: ${spacings.small};
  }
`;

const PromptContainer = styled.div`
  padding: ${spacings.base} 0;
  text-align: center;
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.xsmall} 0;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  color: ${({ theme }) => theme.secondary};
`;

const CloseIcon = styled(icons.Close)`
  width: 2rem;
  height: 2rem;
`;

const PromptLabel = styled.div`
  margin-bottom: ${spacings.base};
  font-weight: bold;
  font-size: 1.7rem;
  @media (max-width: ${breakpoints.mobile}) {
    padding-right: ${spacings.xmedium};
  }
`;
