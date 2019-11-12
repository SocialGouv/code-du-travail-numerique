import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Layers } from "react-feather";

import { getRouteBySource } from "@cdt/sources";
import {
  CardList,
  Container,
  Section,
  Tile,
  Wrapper
} from "@socialgouv/react-ui";

export const Themes = ({ items, query }) => (
  <Section>
    <Container>
      <Wrapper>
        <CardList title="Les thèmes suivants peuvent vous intéresser">
          {items.map(({ slug, title, source }) => (
            <Link
              key={slug}
              href={{
                pathname: `${getRouteBySource(source)}/[slug]`,
                query: query ? { q: query } : null
              }}
              as={`/${getRouteBySource(source)}/${slug}${
                query ? `?q=${query}` : ""
              }`}
              passHref
            >
              <StyledTile icon={Layers}>{title}</StyledTile>
            </Link>
          ))}
        </CardList>
      </Wrapper>
    </Container>
  </Section>
);

const StyledTile = styled(Tile)`
  min-height: 120px;
`;
