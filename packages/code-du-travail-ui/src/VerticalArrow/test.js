import React from "react";
import { render } from "react-testing-library";
import VerticalArrow from ".";

describe("<VerticalArrow />", () => {
  test("should render", () => {
    const { container } = render(<VerticalArrow />);
    expect(container).toMatchSnapshot();
  });
});
