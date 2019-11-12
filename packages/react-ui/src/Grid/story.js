import React from "react";
import { Grid, GridCell } from ".";
import { Tile } from "../Tile";
export default {
  component: Grid,
  title: "Components|Grid"
};

export const base = () => (
  <>
    <Grid>
      {Array.from({ length: 10 }).map((val, index) => (
        <GridCell key={index}>
          <Tile>
            <strong>Tile {index}</strong>
            <p>
              du droit pour ceux qu’il concerne. L’objectif du code du travail
              numérique est d’améliorer la lisibilité
            </p>
          </Tile>
        </GridCell>
      ))}
    </Grid>
    <Grid columns={3}>
      {Array.from({ length: 10 }).map((val, index) => (
        <GridCell key={index}>
          <Tile>
            <strong>Tile {index}</strong>
            <p>
              du droit pour ceux qu’il concerne. L’objectif du code du travail
              numérique est d’améliorer la lisibilité
            </p>
          </Tile>
        </GridCell>
      ))}
    </Grid>
  </>
);
