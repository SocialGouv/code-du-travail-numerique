import React from "react";
import { render } from "@testing-library/react";
import { CalculateurIndemnite } from "../";

describe("<CalculateurIndemnite />", () => {
  it("should render", () => {
    const { container } = render(
      <CalculateurIndemnite title="Simulateur d'indemnité de licenciement" />
    );
    expect(container).toMatchSnapshot();
  });
});
