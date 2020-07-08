import { render } from "@testing-library/react";
import React from "react";

import { Header } from "../Header";

describe("<Header />", () => {
  it("should render", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
