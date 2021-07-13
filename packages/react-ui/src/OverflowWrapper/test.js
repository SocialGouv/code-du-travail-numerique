import { render } from "@testing-library/react";
import React from "react";

import { OverflowWrapper } from "./index.js";

describe("<OverflowWrapper />", () => {
  test("should render", () => {
    const { container } = render(
      <OverflowWrapper>Default shadow color</OverflowWrapper>
    );
    expect(container).toMatchSnapshot();
  });
  test("should render with correct color", () => {
    const { container } = render(
      <OverflowWrapper shadowColor="red">Red shadow color</OverflowWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
