import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  ArrowLink,
  Container,
  FlatList,
  Heading,
  theme,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { matopush } from "../piwik";

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
  const nonArticleSources = [SOURCES.EXTERNALS, SOURCES.LETTERS, SOURCES.TOOLS];

  const relatedOtherItems = items
    .filter(({ source }) => nonArticleSources.includes(source))
    .slice(0, 2);
  const relatedArticleItems = items
    .filter(({ source }) => !nonArticleSources.includes(source))
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
            <>
              <Heading as="div">{title}&nbsp;:</Heading>
              <FlatList>
                {items.map(({ slug, source, title, reco }) => {
                  let rootSlug = slug;
                  let hash;
                  if (slug.includes("#")) {
                    [rootSlug, hash] = slug.split("#");
                  }
                  hash = hash ? `#${hash}` : "";
                  rootSlug = rootSlug ? `/${rootSlug}` : "";
                  const route = getRouteBySource(source);

                  return (
                    <StyledLinkItem key={slug}>
                      <Link
                        href={`/${route}${rootSlug ? "/[slug]" : ""}`}
                        as={`/${route}${rootSlug}${hash}`}
                        passHref
                      >
                        <ArrowLink
                          rel="nofollow"
                          arrowPosition="left"
                          onClick={() =>
                            matoSelectRelated(
                              reco,
                              `${route}${rootSlug}${hash}`
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
            </>
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
