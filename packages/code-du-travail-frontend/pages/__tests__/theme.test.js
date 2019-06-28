import React from "react";
import { render } from "react-testing-library";
import Theme from "../theme.js";

describe("<Theme />", () => {
  it("should render", () => {
    const { container } = render(<Theme />);
    expect(container).toMatchSnapshot();
  });
});
