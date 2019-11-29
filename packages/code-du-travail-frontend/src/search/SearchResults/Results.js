import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import { Container, Tile, PageTitle, Title, theme } from "@socialgouv/react-ui";

import { LinkContent } from "./LinkContent";

import { matopush } from "../../piwik";

export const ListLink = ({
  focused,
  item: { source, slug, url },
  query,
  ...otherProps
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);
  const trackedUrl =
    source === SOURCES.EXTERNALS ? url : `/${getRouteBySource(source)}/${slug}`;

  const onClick = useCallback(() => {
    matopush(["trackEvent", "selectResult", trackedUrl]);
  }, [trackedUrl]);
  const onKeyPress = useCallback(
    event => {
      if (event.keyCode === 13)
        // Enter
        matopush(["trackEvent", "selectResult", trackedUrl]);
    },
    [trackedUrl]
  );
  if (source === SOURCES.EXTERNALS) {
    return (
      <Tile
        ref={ref}
        href={url}
        target="_blank"
        className="no-after"
        onClick={onClick}
        onKeyPress={onKeyPress}
        {...otherProps}
      />
    );
  }

  let rootSlug = slug;
  let anchor = "";
  if (slug.includes("#")) {
    [rootSlug, anchor] = slug.split("#");
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
      <Tile
        ref={ref}
        onClick={onClick}
        onKeyPress={onKeyPress}
        variant={source === SOURCES.TOOLS ? "highlight" : "light"}
        {...otherProps}
      />
    </Link>
  );
};

ListLink.propTypes = {
  focused: PropTypes.bool
};

ListLink.defaultProps = {
  focused: false
};

export const Results = ({ id, isSearch, items, query }) => {
  return (
    <Container narrow>
      {isSearch ? (
        <PageTitle
          id={id}
        >{`Résultats de recherche pour “${query}”`}</PageTitle>
      ) : (
        <Title id={id}>{"Contenu correspondant"}</Title>
      )}
      <StyledList>
        {items.map((item, i) => (
          <StyledListItem key={`item.slug${i}`}>
            <ListLink focused={i === 0} item={item} query={query}>
              <LinkContent isSearch={isSearch} {...item} />
            </ListLink>
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
