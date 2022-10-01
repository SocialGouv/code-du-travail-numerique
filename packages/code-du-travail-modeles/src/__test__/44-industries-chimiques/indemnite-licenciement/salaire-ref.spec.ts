import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";
import { CategoryPro44 } from "../../../plugins/salaire-reference/44_industries_chimiques";

describe("Calcul du salaire pour la CC 44", () => {
  const factory = new ReferenceSalaryFactory();
  const sref = factory.create(SupportedCcIndemniteLicenciement.IDCC0044);
  describe("Ouvrier avec salaire variable", () => {
    test.each`
      salaries                                                                                                                                      | expectedResult
      ${[]}                                                                                                                                         | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${1666.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                     | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril, value: 1000000" }]} | ${3000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}    | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}    | ${2200}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.ouvrier,
            hasVariablePay: true,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Ouvrier avec salaire non variable", () => {
    test.each`
      salaries                                                                                                                                      | expectedResult
      ${[]}                                                                                                                                         | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${1666.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                     | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril, value: 1000000" }]} | ${3000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}    | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}    | ${2200}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.ouvrier,
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Technicien avec salaire variable", () => {
    test.each`
      salaries                                                                                                                                      | expectedResult
      ${[]}                                                                                                                                         | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${1666.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                     | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril, value: 1000000" }]} | ${3000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}    | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}    | ${2200}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.techniciens,
            hasVariablePay: true,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Technicien avec salaire non variable", () => {
    test.each`
      salaries                                                                                                                                      | expectedResult
      ${[]}                                                                                                                                         | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${1666.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                     | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril, value: 1000000" }]} | ${3000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}    | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}    | ${2200}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.techniciens,
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Inge avec salaire variable", () => {
    test.each`
      salaries                                                                                                                                      | expectedResult
      ${[]}                                                                                                                                         | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${1666.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                     | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril, value: 1000000" }]} | ${3000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}    | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}    | ${2200}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.inge,
            hasVariablePay: true,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Inge avec salaire non variable", () => {
    test.each`
      salaries                                                                                                                                      | expectedResult
      ${[]}                                                                                                                                         | ${0}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${1666.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }]}                                     | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril, value: 1000000" }]} | ${3000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}    | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}    | ${2200}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.inge,
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
