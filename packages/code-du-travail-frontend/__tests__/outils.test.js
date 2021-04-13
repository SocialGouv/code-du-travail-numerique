import { render } from "@testing-library/react";
import React from "react";

import { getTools } from "../pages/api/simulateurs";
import Outils from "../pages/outils";

describe("<Outils />", () => {
  it("should render", () => {
    const tools = getTools();
    const { container } = render(<Outils {...tools} />);
    expect(container).toMatchSnapshot();
  });
});
