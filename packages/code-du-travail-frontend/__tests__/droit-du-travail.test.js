import { render } from "@testing-library/react";
import React from "react";

import DroitDuTravail from "../pages/droit-du-travail";

describe("<DroitDuTravail />", () => {
  it("should render", () => {
    const { container } = render(<DroitDuTravail />);
    expect(container).toMatchSnapshot();
  });
});
