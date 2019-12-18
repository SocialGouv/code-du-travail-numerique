import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { ArrowLink, icons, theme } from "@socialgouv/react-ui";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";

import { CustomTile } from "./tiles/Custom";

export const RelatedItems = ({ items = [] }) => {
  const tool = items.find(({ source }) => source === SOURCES.TOOLS);
  const letter = items.find(({ source }) => source === SOURCES.LETTERS);
  const external = items.find(({ source }) => source === SOURCES.EXTERNALS);
  const relatedItems = items.filter(item =>
    [SOURCES.EXTERNALS, SOURCES.LETTERS, SOURCES.TOOLS].some(
      source => source !== item.source
    )
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
            <StyledCustomTile
              action="Consulter"
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
            <StyledCustomTile
              action={tool.action}
              icon={icons[tool.icon]}
              title={tool.title}
              subtitle={getLabelBySource(tool.source)}
            >
              {tool.description}
            </StyledCustomTile>
          </Link>
        </StyledListItem>
      )}
      {external && (
        <StyledListItem>
          <StyledCustomTile
            href={tool.url}
            rel="noopener nofollow"
            target="_blank"
            action={tool.action}
            icon={icons[tool.icon]}
            title={tool.title}
            subtitle={getLabelBySource(tool.source)}
          >
            {tool.description}
          </StyledCustomTile>
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

const StyledCustomTile = styled(CustomTile)`
  max-width: 28rem;
`;

const StyledListItem = styled.li`
  margin: ${spacings.base} 0;
  padding: 0;
`;
