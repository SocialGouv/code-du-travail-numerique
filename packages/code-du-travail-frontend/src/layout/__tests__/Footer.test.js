import React from "react";
import { render } from "../../../test/utils";
import Footer from "../Footer";

describe("<Footer />", () => {
  it("should render", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
