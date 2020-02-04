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
  const relatedTilesItems = items.filter(item =>
    tileSources.includes(item.source)
  );
  const relatedLinkItems = items.filter(
    item => !tileSources.includes(item.source)
  );

  return (
    <StyledSection>
      <Container>
        <StyledFlatList>
          {relatedTilesItems.slice(0, 2).map(item => (
            <StyledTileItem key={item.slug || item.url}>
              {item.source !== SOURCES.EXTERNALS ? (
                <Link
                  as={`/${getRouteBySource(item.source)}/${item.slug}`}
                  href={`/${getRouteBySource(item.source)}/[slug]`}
                  passHref
                >
                  <CallToActionTile
                    action={item.action || "Consulter"}
                    custom
                    icon={
                      item.source === SOURCES.LETTERS
                        ? icons.Document
                        : icons[item.icon]
                    }
                    title={item.title}
                    subtitle={getLabelBySource(item.source)}
                  >
                    {item.description}
                  </CallToActionTile>
                </Link>
              ) : (
                <CallToActionTile
                  action={item.action || "Consulter"}
                  custom={false}
                  href={item.url}
                  icon={icons[item.icon]}
                  rel="noopener nofollow"
                  subtitle={item.subtitle}
                  target="_blank"
                  title={item.title}
                >
                  {item.description}
                </CallToActionTile>
              )}
            </StyledTileItem>
          ))}
        </StyledFlatList>
        {relatedLinkItems.length > 0 && (
          <>
            <Heading as="div">
              Les articles pouvant vous intéresser&nbsp;:
            </Heading>
            <FlatList>
              {relatedLinkItems.slice(0, 3).map(({ slug, source, title }) => (
                <StyledLinkItem key={slug}>
                  <Link
                    href={`/${getRouteBySource(source)}/[slug]`}
                    as={`/${getRouteBySource(source)}/${slug}`}
                    passHref
                  >
                    <ArrowLink arrowPosition="left">{title}</ArrowLink>
                  </Link>
                </StyledLinkItem>
              ))}
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
