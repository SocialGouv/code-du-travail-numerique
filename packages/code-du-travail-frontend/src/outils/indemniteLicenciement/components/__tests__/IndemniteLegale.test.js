import React from "react";
import { render } from "react-testing-library";
import { IndemniteLegale } from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render", () => {
    const { container } = render(
      <IndemniteLegale indemnite={42} formula="1337% * 3.14" />
    );
    expect(container).toMatchSnapshot();
  });
});
