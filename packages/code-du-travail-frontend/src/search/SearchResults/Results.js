import {
  getLabelBySource,
  getRouteBySource,
  SOURCES,
} from "@socialgouv/cdtn-sources";
import { Container, Heading, theme, Tile, Title } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { CallToActionTile } from "../../common/tiles/CallToAction";
import { ViewMore } from "../../common/ViewMore";
import { matopush } from "../../piwik";
import { reportSelectionToMatomo, summarize } from "../utils";

export const ListLink = ({
  item: {
    action,
    algo,
    breadcrumbs = [],
    description,
    source,
    slug,
    title,
    url,
  },
  showTheme = true,
  query,
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
    children: summarize(description),
    onClick: () => reportSelectionToMatomo(source, slug, url, algo),
    onKeyPress: (e) =>
      e.keyCode === 13 && reportSelectionToMatomo(source, slug, url, algo),
    subtitle,
    title,
    wide: true,
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

  // internal link but not indexeg (hence no slug)
  if (!slug) {
    return (
      <Link href={url} passHref>
        <Tile {...tileCommonProps} />
      </Link>
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
        query: { ...(query && { q: query }), slug: rootSlug },
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
  item: PropTypes.shape({
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
      })
    ),
    slug: PropTypes.string,
    source: PropTypes.string,
    title: PropTypes.string,
  }),
  query: PropTypes.string,
  showTheme: PropTypes.bool,
};

export const Results = ({ id, isSearch, items, query }) => {
  return (
    <Container narrow role="region" aria-label="Résultats de recherche">
      {isSearch ? (
        <Heading id={id}>{`Résultats de recherche pour “${query}”`}</Heading>
      ) : (
        <Title isFirst id={id}>
          {"Contenu correspondant"}
        </Title>
      )}
      <ViewMore
        label="Plus de résultats"
        onClick={() => {
          matopush(["trackEvent", "nextResultPage", query]);
        }}
        query={query}
      >
        {items.map((item) => (
          <StyledListItem key={item.slug}>
            <ListLink item={item} showTheme={Boolean(isSearch)} query={query} />
          </StyledListItem>
        ))}
      </ViewMore>
    </Container>
  );
};

const { spacings } = theme;

const StyledListItem = styled.li`
  margin-bottom: ${spacings.medium};
`;
