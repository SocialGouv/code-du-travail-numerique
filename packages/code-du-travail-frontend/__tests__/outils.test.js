import React from "react";
import { render } from "@testing-library/react";
import Outils from "../pages/outils.js";

describe("<Outils />", () => {
  it("should render", () => {
    const { container } = render(<Outils />);
    expect(container).toMatchSnapshot();
  });
});
