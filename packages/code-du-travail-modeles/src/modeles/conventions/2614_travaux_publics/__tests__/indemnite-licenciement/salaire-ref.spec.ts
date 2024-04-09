import { ReferenceSalaryFactory, SupportedCc } from "../../../../common";

describe("Calcul du salaire pour la CC 2614", () => {
  const factory = new ReferenceSalaryFactory();
  const sref = factory.create(SupportedCc.IDCC2614);
  describe("Avec salaire variable", () => {
    test.each`
      salaries                                                                                                                                                                                                                                                                                                                                                                                                                                  | expectedResult
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                                                                                                                                                                                                                                                                                                                 | ${416.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                                                                                                                                                                                                                                                                                                                 | ${750}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}                                                                                                                                                                                                                                                                                                | ${758.3333333333334}
      ${[{ month: "janvier", value: 2493 }, { month: "février", value: 2631 }, { month: "mars", value: 2502 }, { month: "avril", value: 2683 }, { month: "mai", value: 2718 }, { month: "juin", value: 2778 }, { month: "juillet", value: 2534 }, { month: "aout", value: 2710 }, { month: "septembre", value: 2778 }, { month: "octobre", value: 2467 }, { month: "novembre", value: 2685 }, { month: "décembre", prime: 1200, value: 2719 }]} | ${2641.5}
      ${[{ month: "janvier", value: 2732 }, { month: "février", value: 2517 }, { month: "mars", value: 2894 }, { month: "avril", value: 2898 }, { month: "mai", value: 2679 }, { month: "juin", value: 2612 }, { month: "juillet", value: 2849 }, { month: "août", value: 2701 }, { month: "septembre", value: 2511 }, { month: "octobre", value: 2868 }, { month: "novembre", value: 2563 }, { month: "décembre", value: 2624 }]}              | ${2704}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            hasVariablePay: true,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Sans salaire variable", () => {
    test.each`
      salaries                                                                                                                                                                                                                                                                                                                                                                                                                                  | expectedResult
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                                                                                                                                                                                                                                                                                                                 | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                                                                                                                                                                                                                                                                                                                 | ${4000}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}                                                                                                                                                                                                                                                                                                | ${2200}
      ${[{ month: "janvier", value: 2493 }, { month: "février", value: 2631 }, { month: "mars", value: 2502 }, { month: "avril", value: 2683 }, { month: "mai", value: 2718 }, { month: "juin", value: 2778 }, { month: "juillet", value: 2534 }, { month: "aout", value: 2710 }, { month: "septembre", value: 2778 }, { month: "octobre", value: 2467 }, { month: "novembre", value: 2685 }, { month: "décembre", prime: 1200, value: 2719 }]} | ${2719}
      ${[{ month: "janvier", value: 2732 }, { month: "février", value: 2517 }, { month: "mars", value: 2894 }, { month: "avril", value: 2898 }, { month: "mai", value: 2679 }, { month: "juin", value: 2612 }, { month: "juillet", value: 2849 }, { month: "août", value: 2701 }, { month: "septembre", value: 2511 }, { month: "octobre", value: 2868 }, { month: "novembre", value: 2563 }, { month: "décembre", value: 2624 }]}              | ${2624}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
