import { getRouteBySource } from "@socialgouv/cdtn-sources";
import { Grid, Tile, Title } from "@socialgouv/react-ui";
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
            onClick={() => reportSelectionToMatomo(source, slug, url, algo)}
            title={title}
            striped
          />
        </Link>
      ))}
    </Grid>
  </>
);
