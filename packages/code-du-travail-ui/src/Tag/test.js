import React from "react";
import { render } from "react-testing-library";
import Tag from ".";

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
  ])("it should render a Tag %s", variant => {
    const { container } = render(
      <Tag variant={variant}>this is a Tag {variant} </Tag>
    );
    expect(container).toMatchSnapshot();
  });
});
