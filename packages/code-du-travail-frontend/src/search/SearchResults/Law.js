import { getRouteBySource } from "@socialgouv/cdtn-utils";
import { Grid, Title } from "@socialgouv/cdtn-ui";
import React from "react";

import { reportSelectionToMatomo, summarize } from "../utils";
import { LinkedTile } from "../../common/tiles/LinkedTile";

export const Law = ({ items, query }) => (
  <>
    <Title>Que dit le code du travail&nbsp;?</Title>
    <Grid columns={3}>
      {items.map(({ algo, description, slug, source, title, url }) => (
        <LinkedTile
          wide
          title={title}
          onClick={() => reportSelectionToMatomo(source, slug, url, algo)}
          key={slug}
          href={`/${getRouteBySource(source)}/${slug}${
            query ? `?q=${query}` : ""
          }`}
        >
          {summarize(description)}
        </LinkedTile>
      ))}
    </Grid>
  </>
);
