import { render } from "@testing-library/react";
import React from "react";

import { DureePreavisDemission } from "..";

describe("<DureePreavisDemission />", () => {
  it("should render", () => {
    const { container } = render(
      <DureePreavisDemission
        title="Simulateur de durée de préavis de démission"
        icon="mail"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
