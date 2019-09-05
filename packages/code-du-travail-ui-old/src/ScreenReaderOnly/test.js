import React from "react";
import { render } from "@testing-library/react";
import ScreenReaderOnly from ".";

describe("<ScreenReaderOnly />", () => {
  test("should render", () => {
    const { container } = render(<ScreenReaderOnly>SR Only</ScreenReaderOnly>);
    expect(container).toMatchSnapshot();
  });
});
