import { render } from "@testing-library/react";
import React from "react";
import FormulaDetails from "../FormulaDetails";

describe("<FormulaDetails />", () => {
  it("should render", () => {
    expect(
      render(
        <FormulaDetails
          infoCalcul={{
            formula: "1 / 4 * Sref * A * 2",
            labels: {
              "Ancienneté totale (A)": 1.83,
              "Licenciement pour inaptitude": "oui",
              "Salaire de référence (Sref)": 916.66,
            },
          }}
          withSource
        />
      )
    ).toBeTruthy();
  });

  it("should render the source", () => {
    const { getByText } = render(
      <FormulaDetails
        infoCalcul={{
          formula: "1 / 4 * Sref * A * 2",
          labels: {
            "Ancienneté totale (A)": 1.83,
            "Licenciement pour inaptitude": "oui",
            "Salaire de référence (Sref)": 916.66,
          },
        }}
        withSource
      />
    );
    expect(getByText(/Article L.1234-9/i)).toBeTruthy();
  });

  it("should render the list of labels", () => {
    const { getAllByRole } = render(
      <FormulaDetails
        infoCalcul={{
          formula: "1 / 4 * Sref * A * 2",
          labels: {
            "Ancienneté totale (A)": 1.83,
            "Licenciement pour inaptitude": "oui",
            "Salaire de référence (Sref)": 916.66,
          },
        }}
        withSource
      />
    );
    expect(getAllByRole("list").length).toBe(2);
  });
});
