import React from "react";
import { render } from "react-testing-library";
import DroitDuTravail from "../droit-du-travail/index.js";

import Router from "next/router";
Router.router = {};

describe("<DroitDuTravail />", () => {
  it("should render", () => {
    const { container } = render(<DroitDuTravail />);
    expect(container).toMatchSnapshot();
  });
});
