import { cleanFormula } from "../formula";

describe("cleanFormula", () => {
  test("should remove good part from formula", () => {
    const formula = "[20% * A1][ + A2]";
    const explanations = ["A1 : Quantité (12 litres)"];
    expect(cleanFormula(formula, explanations)).toEqual("20% * A1");
  });

  test("should good part with + from formula", () => {
    const formula = "[20% * A1][ + A2]";
    const explanations = ["A2 : Quantité (12 litres)"];
    expect(cleanFormula(formula, explanations)).toEqual("A2");
  });

  test("should work with more complexe example", () => {
    const formula = "[20% * A1 * A2][ + A3][ + A4]";
    const explanations = [
      "A1 : Prix (20 euros)",
      "A2 : Quantité (12 litres)",
      "A3 : Majoration (30 euros)",
    ];
    expect(cleanFormula(formula, explanations)).toEqual("20% * A1 * A2 + A3");
  });

  test("should work with a real example", () => {
    const formula =
      "[(1 / 5 * Sref * A1)][ + (2 / 5 * Sref * A2)][ + (1 / 2 * Sref * A3)][ + (Sref * A4)]";
    const explanations = [
      "A1 : Ancienneté de 10 ans ou moins dans la fonction de non-cadre (1 an)",
      "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)",
      "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (10 ans)",
      "Sref : Salaire de référence (1000 €)",
    ];
    expect(cleanFormula(formula, explanations)).toEqual(
      "(1 / 5 * Sref * A1) + (1 / 2 * Sref * A3) + (Sref * A4)"
    );
  });
});
