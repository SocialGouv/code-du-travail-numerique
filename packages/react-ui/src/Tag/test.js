import { render } from "@testing-library/react";
import React from "react";

import { Tag } from ".";

describe("<Tag />", () => {
  it("renders text", () => {
    const { container } = render(<Tag>A simple text</Tag>);
    expect(container).toMatchSnapshot();
  });
});
