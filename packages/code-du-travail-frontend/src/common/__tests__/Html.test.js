import React from "react";
import { render } from "react-testing-library";
import Html from "../Html";

describe("<Html />", () => {
  it("should render", () => {
    const { container } = render(<Html>{"<b>Hello</b> World"}</Html>);
    expect(container).toMatchSnapshot();
  });

  it("should render children", () => {
    const { container } = render(<Html>{"<b>Hello</b> World"}</Html>);
    expect(container.firstChild.innerHTML).toBe("<b>Hello</b> World");
  });

  it("should render with className", () => {
    const { container } = render(
      <Html className="toto">{"<b>Hello</b> World"}</Html>
    );
    expect(container.firstChild.getAttribute("class")).toMatch(/toto/i);
  });
});
