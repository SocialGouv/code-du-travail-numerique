import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1483"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier qu'il n'y a pas l'eligibilite Anciennete inférieur 8 mois quand cdi opération", () => {
    const { result, missingArgs, ineligibility } = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1483'",
      "contrat salarié . convention collective . habillement textiles commerce de detail . age":
        "50",
      "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":
        "'Cadres'",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2022",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      noticeSalaryPeriods: "[]",
      salaryPeriods:
        '[{"month":"décembre 2023","value":3000},{"month":"novembre 2023","value":3000},{"month":"octobre 2023","value":3000},{"month":"septembre 2023","value":3000},{"month":"août 2023","value":3000},{"month":"juillet 2023","value":3000},{"month":"juin 2023","value":3000},{"month":"mai 2023","value":3000},{"month":"avril 2023","value":3000},{"month":"mars 2023","value":3000},{"month":"février 2023","value":3000},{"month":"janvier 2023","value":3000}]',
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(ineligibility).toBeUndefined();
    expect(result.value).toEqual(1500);
  });
});
