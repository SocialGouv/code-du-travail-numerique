import React from "react";
import { render } from "@wrapped-testing-library/react";
import Theme from "../pages/themes/[slug]";

describe("<Theme />", () => {
  it("should render", () => {
    const { container } = render(<Theme />);
    expect(container).toMatchSnapshot();
  });
});
