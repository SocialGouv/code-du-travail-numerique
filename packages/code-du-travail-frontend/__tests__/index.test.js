import React from "react";
import { render } from "../test/utils";
import Home from "../pages/index.js";

describe("<Home />", () => {
  it("should render", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
