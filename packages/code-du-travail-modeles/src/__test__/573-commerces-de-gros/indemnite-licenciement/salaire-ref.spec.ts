import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";

describe("Calcul du salaire pour la CC 573", () => {
  const refSalary = new ReferenceSalaryFactory().create(
    SupportedCcIndemniteLicenciement.IDCC0573
  );

  describe("Cas standard", () => {
    test.each`
      isEconomicFiring | salaries                                                                                                                                                                                                                                                                                                                                                                                                                                   | expectedResult
      ${false}         | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${0}
      ${false}         | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 1700 }]}  | ${2008.3333333333333}
      ${false}         | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 17000 }]} | ${6175}
      ${true}          | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${0}
      ${true}          | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 17000 }]} | ${3283.3333333333335}
    `(
      "Salaires : $salaries ; isEconomicFiring: $isEconomicFiring => $expectedResult €",
      ({ salaries, isEconomicFiring, expectedResult }) => {
        expect(
          refSalary.computeReferenceSalary({
            isEconomicFiring,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
