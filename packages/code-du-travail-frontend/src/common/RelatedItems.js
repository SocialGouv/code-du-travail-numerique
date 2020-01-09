import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { ArrowLink, Tile, icons, theme } from "@socialgouv/react-ui";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";

import { CallToActionTile } from "./tiles/CallToAction";

export const RelatedItems = ({ items = [] }) => {
  const tool = items.find(({ source }) => source === SOURCES.TOOLS);
  const letter = items.find(({ source }) => source === SOURCES.LETTERS);
  const external = items.find(({ source }) => source === SOURCES.EXTERNALS);
  const relatedItems = items.filter(
    item =>
      ![SOURCES.EXTERNALS, SOURCES.LETTERS, SOURCES.TOOLS].includes(item.source)
  );

  return (
    <StyledList>
      {letter && (
        <StyledListItem>
          <Link
            href={`/${getRouteBySource(letter.source)}/[slug]`}
            as={`/${getRouteBySource(letter.source)}/${letter.slug}`}
            passHref
          >
            <StyledCallToActionTile
              action="Consulter"
              custom
              icon={icons.Document}
              title={letter.title}
              subtitle={getLabelBySource(letter.source)}
            />
          </Link>
        </StyledListItem>
      )}
      {tool && (
        <StyledListItem>
          <Link
            href={`/${getRouteBySource(tool.source)}/[slug]`}
            as={`/${getRouteBySource(tool.source)}/${tool.slug}`}
            passHref
          >
            <StyledCallToActionTile
              action={tool.action || "Consulter"}
              custom
              icon={icons[tool.icon]}
              title={tool.title}
              subtitle={getLabelBySource(tool.source)}
            >
              {tool.description}
            </StyledCallToActionTile>
          </Link>
        </StyledListItem>
      )}
      {external && (
        <StyledListItem>
          <StyledTile
            href={external.url}
            rel="noopener nofollow"
            target="_blank"
            icon={icons[external.icon]}
            title={external.title}
            subtitle={external.subtitle}
          >
            {external.description}
          </StyledTile>
        </StyledListItem>
      )}
      {relatedItems.length > 0 && (
        <span>Les articles pouvant vous intéresser&nbsp;:</span>
      )}
      {relatedItems.slice(0, 3).map(({ slug, source, title }) => (
        <StyledListItem key={slug}>
          <Link
            href={`/${getRouteBySource(source)}/[slug]`}
            as={`/${getRouteBySource(source)}/${slug}`}
            passHref
          >
            <ArrowLink arrowPosition="left">{title}</ArrowLink>
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

const { breakpoints, spacings } = theme;

const StyledList = styled.ul`
  position: sticky;
  top: 12rem;
  width: 30%;
  margin: 0;
  padding: 0 ${spacings.base} 0 ${spacings.larger};
  @media (max-width: ${breakpoints.desktop}) {
    padding-left: ${spacings.base};
  }
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
  list-style-type: none;
  & > *:first-child {
    margin-top: 0;
  }
`;

const StyledTile = styled(Tile)`
  max-width: 28rem;
`;

const StyledCallToActionTile = styled(CallToActionTile)`
  max-width: 28rem;
`;

const StyledListItem = styled.li`
  margin: ${spacings.base} 0;
  padding: 0;
`;
