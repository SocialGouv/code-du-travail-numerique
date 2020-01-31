import React from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  ArrowLink,
  Container,
  FlatList,
  Grid,
  Section,
  Tile,
  icons,
  theme
} from "@socialgouv/react-ui";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";

import { CallToActionTile } from "./tiles/CallToAction";

export const RelatedItems = ({ items = [] }) => {
  const tools = items.filter(({ source }) => source === SOURCES.TOOLS);
  const letters = items.filter(({ source }) => source === SOURCES.LETTERS);
  const externals = items.filter(({ source }) => source === SOURCES.EXTERNALS);
  const relatedItems = items.filter(
    item =>
      ![SOURCES.EXTERNALS, SOURCES.LETTERS, SOURCES.TOOLS].includes(item.source)
  );

  return (
    <StyledSection>
      <Grid singleLined>
        {letters.map(letter => (
          <Link
            as={`/${getRouteBySource(letter.source)}/${letter.slug}`}
            href={`/${getRouteBySource(letter.source)}/[slug]`}
            key={letter.slug}
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
        ))}
        {tools.map(tool => (
          <Link
            as={`/${getRouteBySource(tool.source)}/${tool.slug}`}
            href={`/${getRouteBySource(tool.source)}/[slug]`}
            key={tool.slug}
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
        ))}
        {externals.map(external => (
          <StyledTile
            href={external.url}
            icon={icons[external.icon]}
            key={external.url}
            rel="noopener nofollow"
            subtitle={external.subtitle}
            target="_blank"
            title={external.title}
          >
            {external.description}
          </StyledTile>
        ))}
      </Grid>
      {relatedItems.length > 0 && (
        <Container>
          <div>Les articles pouvant vous intéresser&nbsp;:</div>
          <FlatList>
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
          </FlatList>
        </Container>
      )}
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
