import React from "react";
import { render } from "@wrapped-testing-library/react";
import { CalculateurIndemnite } from "../";

describe("<CalculateurIndemnite />", () => {
  it("should render", () => {
    const { container } = render(<CalculateurIndemnite />);
    expect(container).toMatchSnapshot();
  });
});
