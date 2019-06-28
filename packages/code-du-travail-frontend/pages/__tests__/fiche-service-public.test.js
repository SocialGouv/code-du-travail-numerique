import React from "react";
import { render } from "react-testing-library";
import FicheSP from "../fiche-service-public";

describe("<FicheSP />", () => {
  it("should render", () => {
    const { container } = render(<FicheSP />);
    expect(container).toMatchSnapshot();
  });
});
