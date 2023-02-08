import { getRouteBySource } from "@socialgouv/cdtn-sources";
import { Grid, Tile, Title } from "@socialgouv/cdtn-ui";
import React from "react";

import { reportSelectionToMatomo, summarize } from "../utils";

export const Law = ({ items, query }) => (
  <>
    <Title>Que dit le code du travail&nbsp;?</Title>
    <Grid columns={3}>
      {items.map(({ algo, description, slug, source, title, url }) => (
        <Tile
          wide
          title={title}
          onClick={() => reportSelectionToMatomo(source, slug, url, algo)}
          key={slug}
          href={`/${getRouteBySource(source)}/${slug}${
            query ? `?q=${query}` : ""
          }`}
        >
          {summarize(description)}
        </Tile>
      ))}
    </Grid>
  </>
);
