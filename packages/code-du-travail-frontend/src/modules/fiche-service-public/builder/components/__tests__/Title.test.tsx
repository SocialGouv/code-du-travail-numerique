import React from "react";
import { render } from "@testing-library/react";
import Title from "../Title";

describe("<Title />", () => {
  it("should render a H{x} whose {x} is headingLevel + 2", () => {
    const { getByText } = render(<Title level={2}>Hello</Title>);
    expect(getByText("Hello").tagName).toEqual("H4");
  });
  it("heading should default to H6", () => {
    const { getByText } = render(<Title level={10}>Hello</Title>);
    expect(getByText("Hello").tagName).toEqual("H6");
  });
});
