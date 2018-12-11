import React from "react";
import { render } from "react-testing-library";
import { Support } from "../Support";

describe("<Support />", () => {
  it("should render", () => {
    const { container } = render(<Support />);
    expect(container).toMatchSnapshot();
  });
});
