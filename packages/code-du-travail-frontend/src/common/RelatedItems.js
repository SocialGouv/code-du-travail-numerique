import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-types";
import {
  ArrowLink,
  Container,
  FlatList,
  Heading,
  theme,
} from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

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

export const RelatedItems = ({ items = [] }) => {
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
      {relatedGroups.map(
        ({ title, items }) =>
          items.length > 0 && (
            <React.Fragment key={title}>
              <Heading as="div" ariaLevel="2" role="heading">
                {title}&nbsp;:
              </Heading>
              <FlatList>
                {items.map(({ slug, source, title, reco, url }) => {
                  // if source is external we use url otherwise we assemble the route
                  const href =
                    source != SOURCES.EXTERNALS
                      ? `/${getRouteBySource(source)}/${slug}`
                      : url;

                  return (
                    <StyledLinkItem key={href}>
                      <Link href={href} passHref legacyBehavior>
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

const { spacings } = theme;

const StyledLinkItem = styled.li`
  margin: 0 0 ${spacings.base} 0;
  padding: 0;
`;
