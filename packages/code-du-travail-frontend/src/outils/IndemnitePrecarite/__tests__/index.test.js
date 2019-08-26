import React from "react";
import { render } from "@testing-library/react";
import { SimulateurIndemnitePrecarite } from "..";

describe("<SimulateurIndemnitePrecarite />", () => {
  it("should render", () => {
    const { container } = render(<SimulateurIndemnitePrecarite />);
    expect(container).toMatchSnapshot();
  });
});
