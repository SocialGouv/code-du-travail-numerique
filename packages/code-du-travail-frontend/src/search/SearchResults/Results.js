import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";
import { Container, Heading, Tile, Title, theme } from "@socialgouv/react-ui";

import { summarize, reportSelectionToMatomo } from "../utils";
import { CustomTile } from "../../common/tiles/Custom";

export const ListLink = ({
  item: {
    action,
    algo,
    breadcrumbs = [],
    description,
    source,
    slug,
    title,
    url
  },
  isSearch,
  query
}) => {
  let subtitle = "";
  if (isSearch && source !== SOURCES.THEMES && breadcrumbs.length) {
    subtitle = breadcrumbs[breadcrumbs.length - 1].title;
  }

  const tileCommonProps = {
    wide: true,
    onClick: () => reportSelectionToMatomo(source, slug, url, algo),
    onKeyPress: e =>
      e.keyCode === 13 && reportSelectionToMatomo(source, slug, url, algo),
    title,
    subtitle,
    children: summarize(description)
  };

  if (source === SOURCES.EXTERNALS) {
    return (
      <Tile
        href={url}
        target="_blank"
        className="no-after"
        {...tileCommonProps}
      />
    );
  }

  let rootSlug = slug;
  let anchor = "";
  if (slug.includes("#")) {
    [rootSlug, anchor] = slug.split("#");
  }

  let ResultTile = Tile;
  if (
    source === SOURCES.TOOLS ||
    source === SOURCES.CONTRIBUTIONS ||
    source === SOURCES.LETTERS
  ) {
    ResultTile = CustomTile;
    tileCommonProps.subtitle = getLabelBySource(source);
    tileCommonProps.action = action || "Consulter";
  }

  return (
    <Link
      href={{
        pathname: `/${getRouteBySource(source)}/[slug]`,
        query: { ...(query && { q: query }), slug: rootSlug }
      }}
      as={`/${getRouteBySource(source)}/${rootSlug}${
        query ? `?q=${query}` : ""
      }${anchor ? `#${anchor}` : ""}`}
      passHref
    >
      <ResultTile {...tileCommonProps} />
    </Link>
  );
};

export const Results = ({ id, isSearch, items, query }) => {
  return (
    <Container narrow>
      {isSearch ? (
        <Heading id={id}>{`Résultats de recherche pour “${query}”`}</Heading>
      ) : (
        <Title id={id}>{"Contenu correspondant"}</Title>
      )}
      <StyledList>
        {items.map((item, i) => (
          <StyledListItem key={`item.slug${i}`}>
            <ListLink item={item} isSearch={isSearch} query={query} />
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  );
};

const { spacings } = theme;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const StyledListItem = styled.li`
  margin-bottom: ${spacings.medium};
  padding: 0;
`;
