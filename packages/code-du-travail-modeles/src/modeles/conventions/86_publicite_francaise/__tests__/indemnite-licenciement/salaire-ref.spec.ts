import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("Calcul du salaire pour la CC 86", () => {
  const factory = new ReferenceSalaryFactory();
  const sref = factory.create(SupportedCcIndemniteLicenciement.IDCC0086);

  test.each`
    salaries                                                                                                                                                                                                                                                                                                                                                                                                                                  | expectedResult
    ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${0}
    ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                                                                                                                                                                                                                                                                                                                 | ${3000}
    ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                                                                                                                                                                                                                                                                                                                 | ${4000}
    ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril", value: 1000000 }]}                                                                                                                                                                                                                                                                                             | ${1000000}
    ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}                                                                                                                                                                                                                                                                                                | ${2200}
    ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}                                                                                                                                                                                                                                                                                                | ${2200}
    ${[{ month: "janvier", value: 2493 }, { month: "février", value: 2631 }, { month: "mars", value: 2502 }, { month: "avril", value: 2683 }, { month: "mai", value: 2718 }, { month: "juin", value: 2778 }, { month: "juillet", value: 2534 }, { month: "aout", value: 2710 }, { month: "septembre", value: 2778 }, { month: "octobre", value: 2467 }, { month: "novembre", value: 2685 }, { month: "décembre", value: 2719 }]}              | ${2719}
    ${[{ month: "janvier", prime: 1200, value: 2493 }, { month: "février", value: 2631 }, { month: "mars", value: 2502 }, { month: "avril", value: 2683 }, { month: "mai", value: 2718 }, { month: "juin", value: 2778 }, { month: "juillet", value: 2534 }, { month: "aout", value: 2710 }, { month: "septembre", value: 2778 }, { month: "octobre", value: 2467 }, { month: "novembre", value: 2685 }, { month: "décembre", value: 2719 }]} | ${2719}
  `(
    "Salaires : $salaries => $expectedResult €",
    ({ salaries, expectedResult }) => {
      expect(
        sref.computeReferenceSalary({
          salaires: salaries,
        })
      ).toEqual(expectedResult);
    }
  );
});
