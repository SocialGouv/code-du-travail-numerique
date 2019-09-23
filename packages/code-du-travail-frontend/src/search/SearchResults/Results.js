import React, { useEffect, useRef } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import { Container, LargeLink, List, ListItem, theme } from "@cdt/ui-old";

import { getSourceIcon } from "../utils";
import { LinkContent } from "./LinkContent";

const ListLink = ({
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
  if (source === SOURCES.EXTERNALS) {
    return (
      <LargeLink
        ref={ref}
        href={url}
        target="_blank"
        className="no-after"
        variant="light"
        {...otherProps}
      />
    );
  }

  return (
    <Link
      href={{
        pathname: `/${getRouteBySource(source)}/[slug]`,
        query: { q: query, slug: slug }
      }}
      as={`/${getRouteBySource(source)}/${slug}?q=${query}`}
      passHref
    >
      <LargeLink
        ref={ref}
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

export const Results = ({ hasFocus, id, isSearch, items, query }) => {
  return (
    <Container narrow>
      {isSearch ? (
        <H1 id={id}>{`Résultats pour "${query}"`}</H1>
      ) : (
        <h2 id={id}>{"Contenu correspondant"}</h2>
      )}
      <List>
        {items.map((item, i) => {
          const { source, slug } = item;
          return (
            <ListItem key={slug}>
              <ListLink
                icon={getSourceIcon(source)}
                focused={hasFocus && i === 0}
                item={item}
                query={query}
              >
                <LinkContent {...item} />
              </ListLink>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

const { spacing } = theme;

const H1 = styled.h1`
  margin: ${spacing.interComponent} 0;
`;
