import { render } from "@testing-library/react";
import React from "react";

import Outils from "../pages/outils";

describe("<Outils />", () => {
  it("should render", () => {
    const { container } = render(<Outils />);
    expect(container).toMatchSnapshot();
  });
});
