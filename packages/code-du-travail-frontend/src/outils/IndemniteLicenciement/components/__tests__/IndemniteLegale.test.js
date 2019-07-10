import React from "react";
import { render } from "react-testing-library";
import { IndemniteLegale } from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render", () => {
    const { container } = render(
      <IndemniteLegale indemniteLegale={42} formuleLegale="1337% * 3.14" />
    );
    expect(container).toMatchSnapshot();
  });
});
