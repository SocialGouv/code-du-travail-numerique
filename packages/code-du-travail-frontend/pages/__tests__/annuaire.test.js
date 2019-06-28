import React from "react";
import { render } from "react-testing-library";
import Annuaire from "../annuaire.js";

describe("<Annuaire />", () => {
  it("should render", () => {
    const { container } = render(<Annuaire />);
    expect(container).toMatchSnapshot();
  });
});
