import { render } from "@testing-library/react";
import React from "react";

import Footer from "../Footer";

describe("<Footer />", () => {
  it("should render", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
