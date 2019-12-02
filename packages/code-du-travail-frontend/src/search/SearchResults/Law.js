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

import { summarize } from "../utils";

export const Law = ({ items, query }) => (
  <Section>
    <Container>
      <Wrapper>
        <CardList
          leftStripped
          title="Que dit le code du travail&nbsp;?"
          columns={2}
        >
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
              <Tile wide title={title}>
                {summarize(description)}
              </Tile>
            </Link>
          ))}
        </CardList>
      </Wrapper>
    </Container>
  </Section>
);
