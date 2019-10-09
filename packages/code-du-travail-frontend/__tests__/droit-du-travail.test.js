import React from "react";
import { render } from "../test/utils";
import DroitDuTravail from "../pages/droit-du-travail/index.js";

describe("<DroitDuTravail />", () => {
  it("should render", () => {
    const { container } = render(<DroitDuTravail />);
    expect(container).toMatchSnapshot();
  });
});
