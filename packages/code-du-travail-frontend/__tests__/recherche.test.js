import { render } from "@testing-library/react";
import React from "react";

import Recherche from "../pages/recherche.js";

describe("<Recherche />", () => {
  it("should render", () => {
    const { container } = render(<Recherche />);
    expect(container).toMatchSnapshot();
  });
});
