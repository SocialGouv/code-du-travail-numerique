import React from "react";
import { render } from "react-testing-library";
import Recherche from "../recherche.js";

describe("<Recherche />", () => {
  it("should render", () => {
    const { container } = render(<Recherche />);
    expect(container).toMatchSnapshot();
  });
});
