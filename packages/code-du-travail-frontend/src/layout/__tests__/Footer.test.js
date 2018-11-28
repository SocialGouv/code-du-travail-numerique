import React from "react";
import { render } from "react-testing-library";
import Footer from "../Footer";

describe("<Footer />", () => {
  it("should render", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
