import React from "react";
import { render } from "@testing-library/react";
import FicheMT from "../fiche-ministere-travail";

describe("<FicheMT />", () => {
  it("should render", () => {
    const { container } = render(<FicheMT />);
    expect(container).toMatchSnapshot();
  });
});
