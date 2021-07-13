import { render } from "@testing-library/react";
import React from "react";

import { Subtitle } from "./index.js";

describe("<Subtitle />", () => {
  it("renders a subtitle", () => {
    const { container } = render(<Subtitle>Lorem Ipsum</Subtitle>);
    expect(container).toMatchSnapshot();
  });
});
