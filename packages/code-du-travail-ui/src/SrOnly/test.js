import React from "react";
import { render } from "react-testing-library";
import SrOnly from ".";

describe("<SrOnly />", () => {
  test("should render", () => {
    const { container } = render(<SrOnly />);
    expect(container).toMatchSnapshot();
  });
});
