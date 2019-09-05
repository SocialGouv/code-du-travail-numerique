import React from "react";
import { render } from "@testing-library/react";
import OverflowWrapper from ".";

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
