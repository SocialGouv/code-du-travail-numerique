import { render } from "@testing-library/react";
import React from "react";

import Html from "../Html";

describe("<Html />", () => {
  it("should render", () => {
    const { container } = render(<Html>{"<strong>Hello</strong> World"}</Html>);
    expect(container).toMatchSnapshot();
  });
});
