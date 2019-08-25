import React from "react";
import { render } from "@testing-library/react";
import VerticalArrow from ".";

describe("<VerticalArrow />", () => {
  test("should render", () => {
    const { container } = render(<VerticalArrow />);
    expect(container).toMatchSnapshot();
  });
});
