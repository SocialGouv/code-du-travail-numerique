import { render } from "@testing-library/react";
import React from "react";

import FicheSP from "../pages/fiche-service-public/[slug]";

describe("<FicheSP />", () => {
  it("should render", () => {
    const { container } = render(<FicheSP />);
    expect(container).toMatchSnapshot();
  });
});
