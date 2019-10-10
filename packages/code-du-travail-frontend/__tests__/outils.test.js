import React from "react";
import { render } from "@wrapped-testing-library/react";
import Outils from "../pages/outils/[slug]";

describe("<Outils />", () => {
  it("should render", () => {
    const { container } = render(<Outils />);
    expect(container).toMatchSnapshot();
  });
});
