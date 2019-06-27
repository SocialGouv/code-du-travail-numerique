import React from "react";
import { render } from "react-testing-library";
import Outils from "../outils.js";

describe("<Outils />", () => {
  it("should render", () => {
    const { container } = render(<Outils />);
    expect(container).toMatchSnapshot();
  });
});
