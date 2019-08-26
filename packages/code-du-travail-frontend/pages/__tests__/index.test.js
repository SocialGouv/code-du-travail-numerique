import React from "react";
import { render } from "@testing-library/react";
import Home from "../index.js";

describe("<Home />", () => {
  it("should render", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
