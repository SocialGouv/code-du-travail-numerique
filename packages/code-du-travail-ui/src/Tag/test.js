import React from "react";
import { render } from "react-testing-library";
import Tag from ".";

describe("<Tag />", () => {
  test("should render", () => {
    const { container } = render(<Tag>this is a tag </Tag>);
    expect(container).toMatchSnapshot();
  });
  test.each([
    ["success"],
    ["info"],
    ["warning"],
    ["danger"],
    ["primary"],
    ["secondary"]
  ])("it should render a %s tag", variant => {
    const { container } = render(
      <Tag variant={variant}>this is a {variant} tag </Tag>
    );
    expect(container).toMatchSnapshot();
  });
});
