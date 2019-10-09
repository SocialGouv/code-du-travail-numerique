import React from "react";
import { render } from "../test/utils";
import Annuaire from "../pages/annuaire.js";

describe("<Annuaire />", () => {
  it("should render", () => {
    const { container } = render(<Annuaire />);
    expect(container).toMatchSnapshot();
  });
});
