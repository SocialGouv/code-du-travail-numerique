import { getRouteBySource } from "@socialgouv/cdtn-utils";
import { Grid, Title } from "@socialgouv/cdtn-ui";
import React from "react";

import { reportSelectionToMatomo } from "../utils";
import { LinkedTile } from "../../common/tiles/LinkedTile";

export const Themes = ({ items, query }) => (
  <>
    <Title>Les thèmes suivants peuvent vous intéresser</Title>
    <Grid>
      {items.map(({ slug, title, source, url, algo }) => (
        <LinkedTile
          onClick={() => reportSelectionToMatomo(source, slug, url, algo)}
          title={title}
          striped
          key={slug}
          href={`/${getRouteBySource(source)}/${slug}${
            query ? `?q=${query}` : ""
          }`}
        />
      ))}
    </Grid>
  </>
);
