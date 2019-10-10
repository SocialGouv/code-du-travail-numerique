import React from "react";
import { render } from "@wrapped-testing-library/react";
import FicheSP from "../pages/fiche-service-public/[slug]";

describe("<FicheSP />", () => {
  it("should render", () => {
    const { container } = render(<FicheSP />);
    expect(container).toMatchSnapshot();
  });
});
