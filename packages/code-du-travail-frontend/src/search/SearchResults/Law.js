import { getRouteBySource } from "@socialgouv/cdtn-sources";
import { Grid, Tile, Title } from "@socialgouv/cdtn-ui";
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
          href={`/${getRouteBySource(source)}/${slug}${
            query ? `?q=${query}` : ""
          }`}
          passHref
          legacyBehavior
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
