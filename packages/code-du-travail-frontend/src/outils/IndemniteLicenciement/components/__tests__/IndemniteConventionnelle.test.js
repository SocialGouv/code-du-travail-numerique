import React from "react";
import { render } from "react-testing-library";
import { IndemniteLegale } from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render results", () => {
    const { container } = render(
      <IndemniteLegale
        branche="0044"
        montant={1337}
        indemniteLegale={42}
        formule="1337% * 3.14"
        formuleLegale="42 / 3.14"
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render error", () => {
    const { container } = render(
      <IndemniteLegale
        branche="0044"
        montant={1337}
        indemniteLegale={42}
        formule="1337% * 3.14"
        formuleLegale="42 / 3.14"
        error="lorem ipsum"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
