import { generateExplanation } from "..";

describe("generateExplanation", () => {
  it("should generate explanation", () => {
    expect(
      generateExplanation({
        anciennete: 2,
        inaptitude: false,
        salaireRef: 2000,
      })
    ).toStrictEqual({
      formula: "1 / 4 * Sref * A",
      labels: {
        "Ancienneté totale (A)": 2,
        "Licenciement pour inaptitude": "non",
        "Salaire de référence (Sref)": 2000,
      },
    });
  });

  it("should generate explanation with inaptitude", () => {
    expect(
      generateExplanation({
        anciennete: 2,
        inaptitude: true,
        salaireRef: 2000,
      })
    ).toStrictEqual({
      formula: "1 / 4 * Sref * A * 2",
      labels: {
        "Ancienneté totale (A)": 2,
        "Licenciement pour inaptitude": "oui",
        "Salaire de référence (Sref)": 2000,
      },
    });
  });
});
