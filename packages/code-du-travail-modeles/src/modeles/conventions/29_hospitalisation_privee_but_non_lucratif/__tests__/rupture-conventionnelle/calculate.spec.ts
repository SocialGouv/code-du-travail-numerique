import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "0029"
);

describe("Calcul de l'indemnité de rupture conventionnelle pour la CC 29", () => {
  test.each`
    startDate       | endDate         | referenceSalary | referenceAgreementSalary | expectedCompensation
    ${"01/01/2000"} | ${"01/01/2025"} | ${2500}         | ${2500}                  | ${0}
    ${"01/06/2024"} | ${"01/01/2025"} | ${2500}         | ${2500}                  | ${0}
    ${"01/01/2024"} | ${"01/01/2025"} | ${2500}         | ${2500}                  | ${0}
  `(
    "avec une date de début $startDate et de fin $endDate",
    ({
      endDate,
      startDate,
      referenceSalary,
      referenceAgreementSalary,
      expectedCompensation,
    }) => {
      const { result, missingArgs } = engine.calculate(
        {
          "contrat salarié . convention collective": "'IDCC0029'",
          "contrat salarié . indemnité de licenciement . arrêt de travail":
            "non",
          "contrat salarié . indemnité de licenciement . date d'entrée":
            startDate,
          "contrat salarié . indemnité de licenciement . date de notification":
            endDate,
          "contrat salarié . indemnité de licenciement . date de sortie":
            endDate,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence":
            referenceSalary,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            referenceAgreementSalary,
          licenciementFauteGrave: "non",
          typeContratTravail: "cdi",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
      expect(result.value).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
    }
  );
});
