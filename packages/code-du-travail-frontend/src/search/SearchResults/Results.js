import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import { matopush } from "../../piwik";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";
import {
  Button,
  Container,
  Heading,
  FlatList,
  Tile,
  Title,
  theme
} from "@socialgouv/react-ui";

import { summarize, reportSelectionToMatomo } from "../utils";
import { CallToActionTile } from "../../common/tiles/CallToAction";

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
  showTheme = true,
  query
}) => {
  let subtitle = "";
  if (showTheme && source !== SOURCES.THEMES) {
    if (breadcrumbs.length > 0) {
      subtitle = breadcrumbs[breadcrumbs.length - 1].label;
    } else {
      subtitle = getLabelBySource(source);
    }
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
      <CallToActionTile
        action={action || "Consulter"}
        href={url}
        target="_blank"
        rel="noreferer noopener"
        className="no-after"
        {...tileCommonProps}
        custom={false}
      />
    );
  }

  let rootSlug = slug;
  let anchor = "";
  if (slug.includes("#")) {
    [rootSlug, anchor] = slug.split("#");
  }

  let ResultTile = Tile;
  if (source === SOURCES.TOOLS || source === SOURCES.LETTERS) {
    ResultTile = CallToActionTile;
    tileCommonProps.action = action || "Consulter";
    tileCommonProps.custom = true;
  }
  if (source === SOURCES.CONTRIBUTIONS) {
    tileCommonProps.custom = true;
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
ListLink.propTypes = {
  showTheme: PropTypes.bool,
  query: PropTypes.string,
  item: PropTypes.shape({
    title: PropTypes.string,
    source: PropTypes.string,
    slug: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string
      })
    )
  })
};

export const Results = ({ id, isSearch, items, query }) => {
  const pageSize = 7;
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [query]);
  return (
    <Container narrow role="region" aria-label="Résultats de recherche">
      {isSearch ? (
        <Heading id={id}>{`Résultats de recherche pour “${query}”`}</Heading>
      ) : (
        <Title id={id}>{"Contenu correspondant"}</Title>
      )}
      <FlatList>
        {items.slice(0, page * pageSize).map(item => (
          <StyledListItem key={item.slug}>
            <ListLink item={item} showTheme={Boolean(isSearch)} query={query} />
          </StyledListItem>
        ))}
      </FlatList>
      {items.length > page * pageSize && (
        <ButtonWrapper>
          <StyledButton
            onClick={() => {
              matopush(["trackEvent", "nextResultPage", query]);
              setPage(page + 1);
            }}
          >
            Plus de résultats
          </StyledButton>
        </ButtonWrapper>
      )}
    </Container>
  );
};

const { breakpoints, spacings } = theme;

const StyledListItem = styled.li`
  margin-bottom: ${spacings.medium};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 0 auto;
  }
`;
