import React from "react";
import { render } from "@testing-library/react";
import { Tag } from "../Tag";

describe("<Tag />", () => {
  it("render default Tag", () => {
    const { container } = render(<Tag>Default content</Tag>);
    expect(container).toMatchSnapshot();
  });

  it.each([["primary"], ["secondary"]])("render %s tag", variant => {
    const { container } = render(
      <Tag variant={variant}>{variant} content</Tag>
    );
    expect(container).toMatchSnapshot();
  });
});
