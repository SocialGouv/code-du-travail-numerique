import React from "react";
import { render } from "@testing-library/react";
import Recherche from "../recherche.js";

describe("<Recherche />", () => {
  it("should render", () => {
    const { container } = render(<Recherche />);
    expect(container).toMatchSnapshot();
  });
});
