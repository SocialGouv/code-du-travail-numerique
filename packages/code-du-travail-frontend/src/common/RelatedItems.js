import React from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  ArrowLink,
  Container,
  FlatList,
  Heading,
  icons,
  theme,
} from "@socialgouv/react-ui";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";
import { matopush } from "../piwik";

import { CallToActionTile } from "./tiles/CallToAction";

export const RelatedItems = ({ items = [] }) => {
  const tileSources = [SOURCES.EXTERNALS, SOURCES.LETTERS, SOURCES.TOOLS];

  const relatedTilesItems = items.filter(({ source }) =>
    tileSources.includes(source)
  );
  const relatedLinkItems = items.filter(
    ({ source }) => !tileSources.includes(source)
  );

  return (
    <Container>
      <StyledFlatList>
        {relatedTilesItems
          .slice(0, 2)
          .map(
            ({
              action,
              description,
              icon,
              slug,
              source,
              subtitle,
              title,
              url,
            }) => (
              <StyledTileItem key={slug || url}>
                {source !== SOURCES.EXTERNALS ? (
                  <Link
                    as={`/${getRouteBySource(source)}/${slug}`}
                    href={`/${getRouteBySource(source)}/[slug]`}
                    passHref
                  >
                    <CallToActionTile
                      action={action || "Consulter"}
                      custom
                      icon={
                        source === SOURCES.LETTERS
                          ? icons.Document
                          : icons[icon]
                      }
                      title={title}
                      subtitle={getLabelBySource(source)}
                    ></CallToActionTile>
                  </Link>
                ) : (
                  <CallToActionTile
                    action={action || "Consulter"}
                    custom={false}
                    href={url}
                    icon={icons[icon]}
                    rel="noopener nofollow"
                    subtitle={subtitle}
                    target="_blank"
                    title={title}
                  >
                    {description}
                  </CallToActionTile>
                )}
              </StyledTileItem>
            )
          )}
      </StyledFlatList>
      {relatedLinkItems.length > 0 && (
        <>
          <Heading as="div">
            Les articles pouvant vous intéresser&nbsp;:
          </Heading>
          <FlatList>
            {relatedLinkItems.slice(0, 3).map(({ slug, source, title }) => {
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
                      arrowPosition="left"
                      onClick={() =>
                        matopush([
                          "trackEvent",
                          "selectRelated",
                          `${route}${rootSlug}${hash}`,
                        ])
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
      )}
    </Container>
  );
};

const { breakpoints, spacings } = theme;

const StyledFlatList = styled(FlatList)`
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const StyledTileItem = styled.li`
  display: flex;
  margin: 0 0 ${spacings.base} 0;
  padding: 0;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex: 1 0 auto;
    justify-content: stretch;
    width: calc((100% - ${spacings.base}) / 2);
    & + & {
      margin-left: ${spacings.base};
    }
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 0 auto;
    width: 100%;
    & + & {
      margin-left: 0;
    }
  }
`;

const StyledLinkItem = styled.li`
  margin: 0 0 ${spacings.base} 0;
  padding: 0;
`;
