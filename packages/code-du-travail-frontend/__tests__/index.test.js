import { render } from "@testing-library/react";
import React from "react";

import Home from "../pages/index.js";

describe("<Home />", () => {
  it("should render", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
