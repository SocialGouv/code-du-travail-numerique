import { getRouteBySource } from "@socialgouv/cdtn-sources";
import { Grid, Tile, Title } from "@soocialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

import { reportSelectionToMatomo, summarize } from "../utils";

export const Law = ({ items, query }) => (
  <>
    <Title>Que dit le code du travail&nbsp;?</Title>
    <Grid columns={3}>
      {items.map(({ algo, description, slug, source, title, url }) => (
        <Link
          key={slug}
          href={{
            pathname: `${getRouteBySource(source)}/[slug]`,
            query: query ? { q: query } : null,
          }}
          as={`/${getRouteBySource(source)}/${slug}${
            query ? `?q=${query}` : ""
          }`}
          passHref
        >
          <Tile
            wide
            title={title}
            onClick={() => reportSelectionToMatomo(source, slug, url, algo)}
          >
            {summarize(description)}
          </Tile>
        </Link>
      ))}
    </Grid>
  </>
);
