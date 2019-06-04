import React from "react";
import { render } from "react-testing-library";
import { Grid, GridCell } from ".";

describe("<Grid />", () => {
  test("should render", () => {
    const { container } = render(
      <Grid>
        <GridCell>
          <strong>titre 1</strong>
          <p>contenu 1</p>
        </GridCell>
        <GridCell>
          <strong>titre 2</strong>
          <p>contenu 2</p>
        </GridCell>
      </Grid>
    );
    expect(container).toMatchSnapshot();
  });
});
