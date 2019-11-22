import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { getRouteBySource } from "@cdt/sources";

import {
  CardList,
  Tile,
  Container,
  Section,
  Wrapper,
  theme
} from "@socialgouv/react-ui";

export const Law = ({ items, query }) => (
  <Section>
    <Container>
      <Wrapper>
        <CardList title="Que dit le code du travail&nbsp;?" columns={2}>
          {items.map(({ slug, title, source, description }) => (
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
              <StyledTile>
                {title}
                <P>{description}</P>
              </StyledTile>
            </Link>
          ))}
        </CardList>
      </Wrapper>
    </Container>
  </Section>
);

const { fonts } = theme;

const StyledTile = styled(Tile)`
  min-height: 120px;
`;
const P = styled.p`
  max-height: calc(2 * ${fonts.lineHeight} * 1rem);
  margin: 0;
  overflow-y: hidden;
  color: ${({ theme }) => theme.paragraph};
  font-weight: 400;
  font-size: ${fonts.sizes.small};
  line-height: calc(${fonts.lineHeight} * 1rem);
  /*
   * non standard solution  thus supported by many browser
   * https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
   */
  /* stylelint-disable-next-line order/properties-order, value-no-vendor-prefix */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-orient: vertical;
`;
