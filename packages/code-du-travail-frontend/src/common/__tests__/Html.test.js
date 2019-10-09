import React from "react";
import { render } from "../../../test/utils";
import Html from "../Html";

describe("<Html />", () => {
  it("should render", () => {
    const { container } = render(<Html>{"<b>Hello</b> World"}</Html>);
    expect(container).toMatchSnapshot();
  });
});
