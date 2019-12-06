import React from "react";
import { render } from "@testing-library/react";
import { SimulateurIndemnitePrecarite } from "..";

describe("<SimulateurIndemnitePrecarite />", () => {
  it("should render", () => {
    const { container } = render(
      <SimulateurIndemnitePrecarite title="Simulateur de l'indemnité de précarité" />
    );
    expect(container).toMatchSnapshot();
  });
});
