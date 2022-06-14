import { render } from "@testing-library/react";
import React from "react";
import IndemniteLegale from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render", () => {
    expect(
      render(
        <IndemniteLegale
          infoCalcul={{
            formula: "1 / 4 * Sref * A * 2",
            labels: {
              "Ancienneté totale (A)": 1.83,
              "Licenciement pour inaptitude": "oui",
              "Salaire de référence (Sref)": 916.66,
            },
          }}
          result="1000"
          unit="€"
        />
      )
    ).toBeTruthy();
  });
});
