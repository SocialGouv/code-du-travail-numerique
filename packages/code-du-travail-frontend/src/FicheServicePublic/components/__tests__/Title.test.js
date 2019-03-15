import React from "react";
import { render } from "react-testing-library";
import Title from "../Title";

describe("<Title />", () => {
  it("should render a H{x} whose {x} is headingLevel + 2", () => {
    const { container } = render(<Title level={2} />);
    expect(container).toMatchSnapshot();
  });
  it("heading should default to H6", () => {
    const { container } = render(<Title level={10} />);
    expect(container).toMatchSnapshot();
  });
});
