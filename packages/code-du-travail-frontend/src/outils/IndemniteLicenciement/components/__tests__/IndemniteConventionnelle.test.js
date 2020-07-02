import { render } from "@testing-library/react";
import React from "react";

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
          formula: "Sref * A",
          labels: { "anciennete (A)": 32, "salaire ref (Sref)": 42 },
        }}
        infoCalculConventionnel={{
          formula: "1337 * Sref * foo",
          labels: {
            foo: "bar",
            "salaire de ref (Sref)": 1337,
          },
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results with highlight on indemnité legale", () => {
    const { container } = render(
      <IndemniteCCn
        branche="0044"
        indemniteLegale={2500}
        indemniteConventionnelle={1337}
        infoCalculLegal={{
          formula: "Sref * A",
          labels: { "anciennete (A)": 32, "salaire ref (Sref)": 42 },
        }}
        infoCalculConventionnel={{
          formula: "1337 * Sref * foo",
          labels: {
            foo: "bar",
            "salaire de ref (Sref)": 1337,
          },
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
          formula: "Sref * A",
          labels: { "anciennete (A)": 32, "salaire ref (Sref)": 42 },
        }}
        infoCalculConventionnel={{
          formula: "1337 * Sref * foo",
          labels: {
            foo: "bar",
            "salaire de ref (Sref)": 1337,
          },
        }}
        error="lorem ipsum"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
