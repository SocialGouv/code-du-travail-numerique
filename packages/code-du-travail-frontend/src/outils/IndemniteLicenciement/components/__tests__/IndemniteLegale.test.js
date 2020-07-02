import { render } from "@testing-library/react";
import React from "react";

import { IndemniteLegale } from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render", () => {
    const { container } = render(
      <IndemniteLegale
        indemnite={42}
        infoCalcul={{
          formula: "13 / 37 * 3.14",
          labels: { value: 1 },
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
