import React from "react";
import Link from "next/link";

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
        <CardList
          leftStripped
          title="Les thèmes suivants peuvent vous intéresser"
        >
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
              <Tile wide title={title} />
            </Link>
          ))}
        </CardList>
      </Wrapper>
    </Container>
  </Section>
);
