import React from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  ArrowLink,
  Container,
  FlatList,
  Heading,
  Section,
  icons,
  theme
} from "@socialgouv/react-ui";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";

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
    <StyledSection>
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
                url
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
                      >
                        {description}
                      </CallToActionTile>
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
                return (
                  <StyledLinkItem key={slug}>
                    <Link
                      href={`/${getRouteBySource(source)}${
                        rootSlug ? "/[slug]" : ""
                      }`}
                      as={`/${getRouteBySource(source)}${rootSlug}${hash}`}
                      passHref
                    >
                      <ArrowLink arrowPosition="left">{title}</ArrowLink>
                    </Link>
                  </StyledLinkItem>
                );
              })}
            </FlatList>
          </>
        )}
      </Container>
    </StyledSection>
  );
};

const { breakpoints, spacings } = theme;

const StyledSection = styled(Section)`
  position: sticky;
  top: 12rem;
  width: calc(30% - ${spacings.larger});
  margin-left: ${spacings.larger};
  @media (min-width: ${breakpoints.tablet}) {
    padding-top: 0;
  }
  @media (max-width: ${breakpoints.desktop}) {
    width: 30%;
    margin: 0;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const StyledFlatList = styled(FlatList)`
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const StyledTileItem = styled.li`
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
