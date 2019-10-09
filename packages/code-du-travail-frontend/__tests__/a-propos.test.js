import React from "react";
import { render } from "../test/utils";
import About from "../pages/a-propos";

describe("<About />", () => {
  it("should render", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
