import React from "react";
import { render } from "@testing-library/react";
import { DureePreavisLicenciement } from "..";

describe("<DureePreavisLicenciement />", () => {
  it("should render", () => {
    const { container } = render(
      <DureePreavisLicenciement title="Simulateur de durée de préavis de licenciement" />
    );
    expect(container).toMatchSnapshot();
  });
});
