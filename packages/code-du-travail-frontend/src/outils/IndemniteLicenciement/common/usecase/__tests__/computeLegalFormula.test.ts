import computeLegalFormula from "../computeLegalFormula";

describe("computeLegalFormula", () => {
  it.each`
    seniority | isForInaptitude | formula
    ${0}      | ${false}        | ${""}
    ${1}      | ${false}        | ${"1 / 4 * Sref * A"}
    ${1}      | ${true}         | ${"1 / 4 * Sref * A * 2"}
    ${8 / 12} | ${true}         | ${"1 / 4 * Sref * A * 2"}
    ${7 / 12} | ${true}         | ${""}
  `(
    "should compute formula for seniority $seniority and isForInaptitude $isForInaptitude",
    ({ seniority, isForInaptitude, formula }) => {
      expect(computeLegalFormula(seniority, isForInaptitude)).toBe(formula);
    }
  );
});
