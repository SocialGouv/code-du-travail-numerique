import { render } from "@testing-library/react";
import React from "react";

import { DureePreavisDemission } from "..";

describe("<DureePreavisDemission />", () => {
  it("should render", () => {
    const { container } = render(
      <DureePreavisDemission
        title="Durée de préavis de démission"
        titleH1="Simulateur de durée de préavis de démission"
        icon="mail"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
