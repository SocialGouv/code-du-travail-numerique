import React from "react";
import { render } from "@wrapped-testing-library/react";
import FicheMT from "../pages/fiche-ministere-travail/[slug]";

describe("<FicheMT />", () => {
  it("should render", () => {
    const { container } = render(<FicheMT />);
    expect(container).toMatchSnapshot();
  });
});
