import React from "react";
import { render } from "react-testing-library";
import Tag from "../Tag";

describe("<Tag />", () => {
  test("should render", () => {
    const { container } = render(<Tag>this is an alert </Tag>);
    expect(container).toMatchSnapshot();
  });
  test.each([
    ["success"],
    ["info"],
    ["warning"],
    ["danger"],
    ["primary"],
    ["secondary"]
  ])("it should render a Tag %s", label => {
    const props = { [label]: true };
    const { container } = render(<Tag {...props}>this is a Tag {label} </Tag>);
    expect(container).toMatchSnapshot();
  });
});
