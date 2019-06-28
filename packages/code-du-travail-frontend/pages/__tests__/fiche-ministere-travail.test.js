import React from "react";
import { render } from "react-testing-library";
import FicheMT from "../fiche-ministere-travail";

describe("<FicheMT />", () => {
  it("should render", () => {
    const { container } = render(<FicheMT />);
    expect(container).toMatchSnapshot();
  });
});
