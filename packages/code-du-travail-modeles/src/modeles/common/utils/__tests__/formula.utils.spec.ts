import { cleanFormula, removePartFromFormula } from "../formula";

describe("formule utils", () => {
  describe("cleanFormula", () => {
    test("should do nothing if nothing to clean", () => {
      const formula = "20% * A1 + A2";
      expect(cleanFormula(formula)).toEqual("20% * A1 + A2");
    });

    test("should clean square brackets", () => {
      const formula = "[20% * A1][ + A2]";
      expect(cleanFormula(formula)).toEqual("20% * A1 + A2");
    });

    test("should remove spaces at the beginning", () => {
      expect(cleanFormula(" 20% * A1 + A2")).toEqual("20% * A1 + A2");
    });

    test("should remove + at the beginning", () => {
      expect(cleanFormula("+ 20% * A1 + A2")).toEqual("20% * A1 + A2");
    });
  });
  describe("removePartFromFormula", () => {
    test("should remove good part from formula", () => {
      const formula = "[20% * A1][ + A2]";
      expect(removePartFromFormula(formula, "A2 : prix")).toEqual("[20% * A1]");
    });

    test("should good part with + from formula", () => {
      const formula = "[20% * A1][ + A2]";
      expect(removePartFromFormula(formula, "A1 : Quantité")).toEqual(
        "[ + A2]"
      );
    });

    test("should work with more complexe example", () => {
      const formula = "[20% * A1 * A2][ + A3][ + A4]";
      expect(removePartFromFormula(formula, "A4 :  je suis vide")).toEqual(
        "[20% * A1 * A2][ + A3]"
      );
    });

    test("should work with a real example", () => {
      const formula =
        "[(1 / 5 * Sref * A1)][ + (2 / 5 * Sref * A2)][ + (1 / 2 * Sref * A3)][ + (Sref * A4)]";
      expect(removePartFromFormula(formula, "A2: Années")).toEqual(
        "[(1 / 5 * Sref * A1)][ + (1 / 2 * Sref * A3)][ + (Sref * A4)]"
      );
    });
  });
});
