import { render } from "@testing-library/react";
import React from "react";

import PreavisDemissionSimulator from "../PreavisDemissionSimulator";

describe("<PreavisDemissionSimulator />", () => {
  it("should render", () => {
    const { container } = render(
      <PreavisDemissionSimulator
        relatedItems={[]}
        title="Durée de préavis de démission"
        displayTitle="Simulateur de durée de préavis de démission"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
