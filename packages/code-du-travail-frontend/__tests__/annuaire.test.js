import React from "react";
import { render } from "@wrapped-testing-library/react";
import Annuaire from "../pages/annuaire.js";

describe("<Annuaire />", () => {
  it("should render", () => {
    const { container } = render(<Annuaire />);
    expect(container).toMatchSnapshot();
  });
});
