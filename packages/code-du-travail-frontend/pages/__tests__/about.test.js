import React from "react";
import { render } from "react-testing-library";
import About from "../about";

describe("<About />", () => {
  it("should render", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
