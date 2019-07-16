import React from "react";
import { render } from "react-testing-library";
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
        inputLegals={{ "salaire ref (Sref)": 42, "anciennete (A)": 32 }}
        formuleLegale="Sref * A"
        indemniteConventionnelle={1337}
        formuleConventionnelle="1337 * Sref * foo"
        inputConventionnels={{
          "salaire de ref (Sref)": 1337,
          foo: "bar"
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
        inputLegals={{ "salaire ref (Sref)": 42, "anciennete (A)": 32 }}
        formuleLegale="Sref * A"
        indemniteConventionnelle={1337}
        formuleConventionnelle="1337 * Sref * foo"
        inputConventionnels={{
          "salaire de ref (Sref)": 1337,
          foo: "bar"
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
        inputLegals={{ "salaire ref (Sref)": 42, "anciennete (A)": 32 }}
        formuleLegale="Sref * A"
        indemniteConventionnelle={1200}
        formuleConventionnelle="1200 * Sref * foo"
        inputConventionnels={{
          "salaire de ref (Sref)": 1337,
          foo: "bar"
        }}
        error="lorem ipsum"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
