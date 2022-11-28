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
});
