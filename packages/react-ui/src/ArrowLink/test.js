import { render } from "@testing-library/react";
import React from "react";

import { ArrowLink } from "./index.js";

describe("<ArrowLink />", () => {
  it("renders an arrow on the right", () => {
    const { container } = render(<ArrowLink>Lorem Ipsum</ArrowLink>);
    expect(container).toMatchSnapshot();
  });
  it("renders an arrow on the left", () => {
    const { container } = render(<ArrowLink left>Lorem Ipsum</ArrowLink>);
    expect(container).toMatchSnapshot();
  });
});
