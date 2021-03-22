import { render } from "@testing-library/react";
import React from "react";

import About from "../pages/a-propos";

describe("<About />", () => {
  it("should render", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
