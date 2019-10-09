import React from "react";
import { render } from "../../../../../test/utils";
import { IndemniteLegale } from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render", () => {
    const { container } = render(
      <IndemniteLegale
        indemnite={42}
        infoCalcul={{
          formula: "1337% * 3.14",
          labels: { value: 1 }
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
