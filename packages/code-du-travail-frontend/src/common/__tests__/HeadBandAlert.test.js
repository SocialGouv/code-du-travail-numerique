import React from "react";
import { render } from "@testing-library/react";
import HeadBandAlert from "../HeadBandAlert";

describe("<HeadBandAlert />", () => {
  test("should render", () => {
    const { container } = render(<HeadBandAlert />);
    expect(container).toMatchSnapshot();
  });
});
