import React from "react";
import { render } from "react-testing-library";
import { CalculateurIndemnite } from "../";

describe("<CalculateurIndemnite />", () => {
  it("should render", () => {
    const { container } = render(<CalculateurIndemnite />);
    expect(container).toMatchSnapshot();
  });
});
