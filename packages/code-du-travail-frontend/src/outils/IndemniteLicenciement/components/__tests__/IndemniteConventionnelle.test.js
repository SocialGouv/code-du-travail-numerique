import React from "react";
import { render } from "../../../../../test/utils";
import { IndemniteCCn } from "../IndemniteConventionnelle";

// branche,
// indemniteConventionnelle,
// indemniteLegale,
// formuleConventionnelle,
// formuleLegale,
// error,
// inputLegals = {},
// inputConventionnels = {}

describe("<IndemniteCCn />", () => {
  it("should render results with highlight on indemnité conventionnelle", () => {
    const { container } = render(
      <IndemniteCCn
        branche="0044"
        indemniteLegale={42}
        indemniteConventionnelle={2000}
        infoCalculLegal={{
          labels: { "salaire ref (Sref)": 42, "anciennete (A)": 32 },
          formula: "Sref * A"
        }}
        infoCalculConventionnel={{
          formula: "1337 * Sref * foo",
          labels: {
            "salaire de ref (Sref)": 1337,
            foo: "bar"
          }
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results with highlight on indemnité legale", () => {
    const { container } = render(
      <IndemniteCCn
        branche="0044"
        indemniteLegale={2000}
        indemniteConventionnelle={1337}
        infoCalculLegal={{
          labels: { "salaire ref (Sref)": 42, "anciennete (A)": 32 },
          formula: "Sref * A"
        }}
        infoCalculConventionnel={{
          formula: "1337 * Sref * foo",
          labels: {
            "salaire de ref (Sref)": 1337,
            foo: "bar"
          }
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render error", () => {
    const { container } = render(
      <IndemniteCCn
        branche="0044"
        indemniteLegale={42}
        indemniteConventionnelle={1200}
        infoCalculLegal={{
          labels: { "salaire ref (Sref)": 42, "anciennete (A)": 32 },
          formula: "Sref * A"
        }}
        infoCalculConventionnel={{
          formula: "1337 * Sref * foo",
          labels: {
            "salaire de ref (Sref)": 1337,
            foo: "bar"
          }
        }}
        error="lorem ipsum"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
