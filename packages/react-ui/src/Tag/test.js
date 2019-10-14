import React from "react";
import { render } from "@testing-library/react";
import { variants } from "../theme";
import { Tag } from ".";

describe("<Tag />", () => {
  test("should render", () => {
    const { container } = render(<Tag>this is a tag </Tag>);
    expect(container).toMatchSnapshot();
  });
  test("should render a small tag", () => {
    const { container } = render(<Tag size="small">this is a small tag </Tag>);
    expect(container).toMatchSnapshot();
  });
  test.each(variants)("it should render a %s tag", variant => {
    const { container } = render(
      <Tag variant={variant}>this is a {variant} tag </Tag>
    );
    expect(container).toMatchSnapshot();
  });
});
