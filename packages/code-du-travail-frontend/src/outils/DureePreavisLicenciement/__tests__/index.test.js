import React from "react";
import { render } from "@testing-library/react";
import { DureePreavisLicenciement } from "..";

describe("<DureePreavisLicenciement />", () => {
  it("should render", () => {
    const { container } = render(<DureePreavisLicenciement />);
    expect(container).toMatchSnapshot();
  });
});
