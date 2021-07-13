import { render } from "@testing-library/react";
import React from "react";

import { Grid } from "./index.js";

describe("<Grid />", () => {
  test("should render", () => {
    const { container } = render(
      <Grid>
        <div>
          <strong>titre 1</strong>
          <p>contenu 1</p>
        </div>
        <div>
          <strong>titre 2</strong>
          <p>contenu 2</p>
        </div>
      </Grid>
    );
    expect(container).toMatchSnapshot();
  });
  test("should render 5columns", () => {
    const { container } = render(
      <Grid columns={5}>
        <div>
          <strong>titre 1</strong>
          <p>contenu 1</p>
        </div>
        <div>
          <strong>titre 2</strong>
          <p>contenu 2</p>
        </div>
      </Grid>
    );
    expect(container).toMatchSnapshot();
  });
});
