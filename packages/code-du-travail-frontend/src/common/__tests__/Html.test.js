import React from "react";
import { render } from "react-testing-library";
import Html from "../Html";

describe("<Html />", () => {
  it("should render", () => {
    const { container } = render(
      <Html className="toto">{"<b>Hello</b> World"}</Html>
    );
    expect(container).toMatchSnapshot();
  });
});
