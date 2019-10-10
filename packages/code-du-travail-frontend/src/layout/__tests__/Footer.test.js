import React from "react";
import { render } from "@wrapped-testing-library/react";
import Footer from "../Footer";

describe("<Footer />", () => {
  it("should render", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
