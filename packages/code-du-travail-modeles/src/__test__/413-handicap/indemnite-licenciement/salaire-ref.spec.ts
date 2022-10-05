import { ReferenceSalary413 } from "../../../plugins/salaire-reference/413_handicap";

describe("Calcul du salaire pour la CC 413", () => {
  const ReferenceSalary = new ReferenceSalary413();
  describe("Cas standard", () => {
    test.each`
      salaries                                                                                                                                      | expectedResult
      ${[]}                                                                                                                                         | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${1666.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                     | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril", value: 1000000 }]} | ${335666.6666666667}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}    | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}    | ${2200}
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
