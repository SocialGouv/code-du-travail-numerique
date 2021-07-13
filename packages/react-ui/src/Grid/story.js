import React from "react";

import { Tile } from "../Tile/index.js";
import { Grid } from "./index.js";

export default {
  component: Grid,
  title: "Components/Grid",
};

export const base = () => (
  <>
    <Grid>
      {Array.from({ length: 10 }).map((val, index) => (
        <Tile key={index}>
          <strong>Tile {index}</strong>
          <p>
            L’objectif du code du travail numérique est d’améliorer la
            connaissance du droit du travail
          </p>
        </Tile>
      ))}
    </Grid>
    <Grid columns={3}>
      {Array.from({ length: 10 }).map((val, index) => (
        <Tile key={index}>
          <strong>Tile {index}</strong>
          <p>
            du droit pour ceux qu’il concerne. L’objectif du code du travail
            numérique est d’améliorer la lisibilité
          </p>
        </Tile>
      ))}
    </Grid>
  </>
);
