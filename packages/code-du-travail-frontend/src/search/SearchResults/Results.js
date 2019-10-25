import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import {
  LargeLink,
  List,
  ListItem,
  Container,
  theme
} from "@socialgouv/react-ui";

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
        {...otherProps}
      />
    );
  }

  return (
    <Link
      href={{
        pathname: `/${getRouteBySource(source)}/[slug]`,
        query: { ...(query && { q: query }), slug: slug }
      }}
      as={`/${getRouteBySource(source)}/${slug}${query ? `?q=${query}` : ""}`}
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

export const Results = ({ id, isSearch, items, query }) => {
  return (
    <Container narrow>
      {isSearch ? (
        <H1 id={id}>{`Résultats pour "${query}"`}</H1>
      ) : (
        <h2 id={id}>{"Contenu correspondant"}</h2>
      )}
      <List>
        {items.map((item, i) => {
          const { slug } = item;
          return (
            <ListItem key={slug}>
              <ListLink focused={i === 0} item={item} query={query}>
                <LinkContent isSearch={isSearch} {...item} />
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
