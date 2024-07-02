import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "3248"
);

describe("Calcul de l'indemnité de rupture conventionnelle pour la CC 3248", () => {
  describe("Vérifier qu'il ,'y a pas d'ancienneté conventionnelle requise", () => {
    test("A, B, C, D ou E", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3248'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
          "'A, B, C, D ou E'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
          "'Non'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
          "'Non'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });

    test("F, G, H ou I", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3248'",
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . rupture conventionnelle . age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });
  });
});
