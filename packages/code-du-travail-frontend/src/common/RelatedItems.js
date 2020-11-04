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
            <React.Fragment key={title}>
              <Heading as="div">{title}&nbsp;:</Heading>
              <FlatList>
                {items.map(({ slug, source, title, reco, url }) => {
                  let href;
                  let selection;

                  // if source is external we only use url
                  // otherwise we deal with route, slug and hash
                  if (source != SOURCES.EXTERNALS) {
                    let rootSlug = slug;
                    let hash;
                    if (slug.includes("#")) {
                      [rootSlug, hash] = slug.split("#");
                    }
                    hash = hash ? `#${hash}` : "";
                    rootSlug = rootSlug ? `/${rootSlug}` : "";
                    const route = getRouteBySource(source);

                    href = `/${route}${rootSlug ? `/${slug}` : ""}`;
                    selection = `${route}${rootSlug}${hash}`;
                  } else {
                    href = url;
                    selection = url;
                  }

                  return (
                    <StyledLinkItem key={slug || url}>
                      <Link href={href} passHref>
                        <ArrowLink
                          rel="nofollow"
                          arrowPosition="left"
                          onClick={() => matoSelectRelated(reco, selection)}
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
