import React from "react";
import { render } from "../test/utils";
import FicheMT from "../pages/fiche-ministere-travail/[slug]";

describe("<FicheMT />", () => {
  it("should render", () => {
    const { container } = render(<FicheMT />);
    expect(container).toMatchSnapshot();
  });
});
