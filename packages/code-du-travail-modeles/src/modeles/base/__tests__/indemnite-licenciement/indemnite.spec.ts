import { IndemniteLicenciementPublicodes } from "../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(modelsIndemniteLicenciement);

describe("Indemnité légale de licenciement pour un employé", () => {
  test.each`
    seniority             | salary  | expectedCompensation
    ${0}                  | ${0}    | ${0}
    ${1}                  | ${0}    | ${0}
    ${1.3}                | ${0}    | ${0}
    ${0.12}               | ${1000} | ${0}
    ${0.5}                | ${1000} | ${0}
    ${8 / 12}             | ${1000} | ${166.67}
    ${11 / 12}            | ${2000} | ${458.33}
    ${1.083333333}        | ${2000} | ${541.67}
    ${1}                  | ${2000} | ${500}
    ${2}                  | ${2000} | ${1000}
    ${2.333333333}        | ${2000} | ${1166.67}
    ${10.91}              | ${2000} | ${5606.67}
    ${11.666666666666666} | ${2980} | ${9105.56}
    ${42}                 | ${2500} | ${32916.67}
  `(
    "ancienneté: $seniority mois, salaire de référence: $salary => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          seniority.toString(),
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          salary.toString(),
      });
      expect(result.value).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(missingArgs).toEqual([]);
    }
  );
  test.each`
    seniority             | salary  | expectedCompensation
    ${0}                  | ${0}    | ${0}
    ${1}                  | ${0}    | ${0}
    ${1.3}                | ${0}    | ${0}
    ${0.12}               | ${1000} | ${60}
    ${0.5}                | ${1000} | ${250}
    ${8 / 12}             | ${1000} | ${333.34}
    ${11 / 12}            | ${2000} | ${916.66}
    ${1.083333333}        | ${2000} | ${1083.34}
    ${1}                  | ${2000} | ${1000}
    ${2}                  | ${2000} | ${2000}
    ${2.333333333}        | ${2000} | ${2333.34}
    ${10.91}              | ${2000} | ${11213.34}
    ${11.666666666666666} | ${2980} | ${18211.12}
    ${42}                 | ${2500} | ${65833.34}
  `(
    "licenciement pour inaptitude : ancienneté: $seniority mois, salaire de référence: $salary => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "oui",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          salary,
      });
      expect(result.value).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(missingArgs).toEqual([]);
    }
  );

  describe("Cas limites pour le droit à l'indemnité de licenciement", () => {
    test("Ancienneté requise pas atteinte et ancienneté de calcul atteinte", () => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          "1",
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          "0.6",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          "2000",
      });
      expect(result.value).toEqual(0);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(missingArgs).toEqual([]);
    });

    test("Ancienneté requise atteinte et ancienneté de calcul atteinte", () => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          "1",
        "contrat salarié . indemnité de licenciement . ancienneté requise en année": `${
          8 / 12
        }`,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          "2000",
      });
      expect(result.value).toEqual(500);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(missingArgs).toEqual([]);
    });

    test("non eligible", () => {
      const { result, missingArgs } = engine.setSituation({
        "contrat salarié . indemnité de licenciement . contrat type cdi": "non",
      });
      expect(missingArgs).toEqual([]);
      expect(result.value).toEqual("non eligible pas en cdi");
    });
  });
});
