import React from "react";
import { render } from "@testing-library/react";
import DroitDuTravail from "../droit-du-travail/index.js";

describe("<DroitDuTravail />", () => {
  it("should render", () => {
    const { container } = render(<DroitDuTravail />);
    expect(container).toMatchSnapshot();
  });
});
