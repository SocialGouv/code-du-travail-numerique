import React from "react";
import { render } from "@testing-library/react";
import DroitDuTravailWrapper from "../DroitDuTravailWrapper";

describe("<DroitDuTravailWrapper />", () => {
  it("renders correctly", () => {
    const { container } = render(<DroitDuTravailWrapper />);
    expect(container).toMatchSnapshot();
  });
});
