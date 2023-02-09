import { getRouteBySource } from "@socialgouv/cdtn-sources";
import { Grid, Tile, Title } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

import { reportSelectionToMatomo } from "../utils";

export const Themes = ({ items, query }) => (
  <>
    <Title>Les thèmes suivants peuvent vous intéresser</Title>
    <Grid>
      {items.map(({ slug, title, source, url, algo }) => (
        <Link
          key={slug}
          href={`/${getRouteBySource(source)}/${slug}${
            query ? `?q=${query}` : ""
          }`}
          legacyBehavior
          passHref
        >
          <Tile
            onClick={() => reportSelectionToMatomo(source, slug, url, algo)}
            title={title}
            striped
          />
        </Link>
      ))}
    </Grid>
  </>
);
