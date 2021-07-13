import { render } from "@testing-library/react";
import React from "react";

import { VerticalArrow } from "./index.js";

describe("<VerticalArrow />", () => {
  test("should render", () => {
    const { container } = render(<VerticalArrow />);
    expect(container).toMatchSnapshot();
  });
});
