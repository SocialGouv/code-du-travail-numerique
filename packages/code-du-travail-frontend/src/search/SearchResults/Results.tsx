import {
  getLabelBySource,
  getRouteBySource,
  SOURCES,
} from "@socialgouv/cdtn-sources";
import {
  Button,
  Container,
  Heading,
  Paragraph,
  theme,
  Tile,
  Title,
  ViewMore,
} from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { CallToActionTile } from "../../common/tiles/CallToAction";
import { reportSelectionToMatomo, summarize } from "../utils";

type CommonProps = {
  children: JSX.Element;
  onClick: () => void;
  onKeyPress: (e: any) => false | void;
  subtitle: string;
  title?: string;
  wide: boolean;
  action?: string;
  custom?: boolean;
  icon?: string;
  centerTitle?: boolean;
};

type HighlightProps = {
  searchInfo: string;
};

type ListLinkItemProps = {
  action?: string;
  algo?: string;
  breadcrumbs?: any[];
  description?: string;
  source?: any;
  slug?: string;
  title?: string;
  url?: string;
  highlight?: HighlightProps;
  icon?: string;
};

type ListLinkProps = {
  item: ListLinkItemProps;
  showTheme?: boolean;
  query?: string;
  centerTitle?: boolean;
};

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
    highlight,
    icon,
  },
  showTheme = true,
  query,
  centerTitle,
}: ListLinkProps) => {
  let subtitle = "";
  if (showTheme && !icon) {
    if (breadcrumbs.length > 0) {
      subtitle = breadcrumbs[breadcrumbs.length - 1].label;
    } else {
      subtitle = getLabelBySource(source);
    }
  }

  const tileCommonProps: CommonProps = {
    children: (
      <>
        {highlight && highlight.searchInfo && (
          <StyledParagraph variant="secondary" noMargin>
            {highlight.searchInfo}
          </StyledParagraph>
        )}
        <StyledParagraphContainer>
          <Paragraph noMargin>{summarize(description)}</Paragraph>
        </StyledParagraphContainer>
      </>
    ),
    onClick: () => reportSelectionToMatomo(source, slug, url, algo),
    onKeyPress: (e) =>
      e.keyCode === 13 && reportSelectionToMatomo(source, slug, url, algo),
    subtitle,
    title,
    wide: true,
    icon,
    centerTitle,
  };

  if (source === SOURCES.EXTERNALS) {
    return (
      <CallToActionTile
        action={action || "Consulter"}
        href={url}
        target="_blank"
        rel="noreferer noopener"
        className="no-after"
        aria-label={`${subtitle} ${title} ${summarize(
          description
        )} ${action} (nouvelle fenêtre)`}
        {...tileCommonProps}
        noCustom={true}
        titleTagType="h3"
      />
    );
  }

  // external links
  if (!slug) {
    return (
      <Link href={url ?? ""} passHref>
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
      href={`/${getRouteBySource(source)}/${rootSlug}${
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
        <Heading
          as="h2"
          id={id}
        >{`Résultats de recherche pour “${query}”`}</Heading>
      ) : (
        <Title isFirst id={id}>
          {"Contenu correspondant"}
        </Title>
      )}
      <ViewMore
        button={(viewMore) => (
          <StyledButton
            onClick={() => {
              matopush(["trackEvent", "nextResultPage", query]);
              viewMore();
            }}
          >
            Plus de résultats
          </StyledButton>
        )}
        query={query}
        stepSize={7}
      >
        {items.map((item) => (
          <StyledListItem key={`${item.source}-${item.slug}`}>
            <ListLink item={item} showTheme={Boolean(isSearch)} query={query} />
          </StyledListItem>
        ))}
      </ViewMore>
    </Container>
  );
};

const { breakpoints, spacings } = theme;

const StyledListItem = styled.li`
  margin-bottom: ${spacings.medium};
`;

const StyledButton = styled(Button)`
  margin-top: ${spacings.xmedium};
  ${(props) => props.styles && props.styles}
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 0 auto;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${spacings.xsmall};
`;

const StyledParagraphContainer = styled.div`
  flex: 1;
`;
