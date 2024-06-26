import type { PublicodesMissingArgs } from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1483"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que le fonctionne sans noticeSalaryPeriods", () => {
    const result = engine.calculate({
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
      noticeSalaryPeriods: undefined,
      salaryPeriods:
        '[{"month":"décembre 2023","value":3000},{"month":"novembre 2023","value":3000},{"month":"octobre 2023","value":3000},{"month":"septembre 2023","value":3000},{"month":"août 2023","value":3000},{"month":"juillet 2023","value":3000},{"month":"juin 2023","value":3000},{"month":"mai 2023","value":3000},{"month":"avril 2023","value":3000},{"month":"mars 2023","value":3000},{"month":"février 2023","value":3000},{"month":"janvier 2023","value":3000}]',
      typeContratTravail: "cdi",
    });
    expect(result).toResultBeEqual(1500, "€");
  });
  test("Vérifier que le fonctionne sans salaryPeriods", () => {
    const result = engine.calculate({
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
      noticeSalaryPeriods: undefined,
      salaryPeriods: undefined,
      typeContratTravail: "cdi",
    });
    expect(result.type).toBe("missing-args");
    expect((result as PublicodesMissingArgs).missingArgs[0].rawNode.nom).toBe(
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel"
    );
  });
});
