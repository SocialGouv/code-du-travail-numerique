import { ReferenceSalary413 } from "../../../plugins/salaire-reference/413_handicap";

describe("Calcul du salaire pour la CC 413", () => {
  const ReferenceSalary = new ReferenceSalary413();
  describe("Cas standard", () => {
    test.each`
      salaries                                                                                                                                      | expectedResult
      ${[]}                                                                                                                                         | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${1666.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                     | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril, value: 1000000" }]} | ${3000}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
