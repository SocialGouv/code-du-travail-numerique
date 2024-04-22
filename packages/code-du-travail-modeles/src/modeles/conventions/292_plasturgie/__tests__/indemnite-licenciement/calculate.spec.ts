import type { PublicodesMissingArgs } from "../../../../../publicodes";
import IndemniteLicenciementPublicodes from "../../../../../publicodes/IndemniteLicenciementPublicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "292"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que le calculate n'essaye pas de calculer le salaire au niveau de la step ancienneté", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC0292'",
      "contrat salarié . convention collective . plasturgie . indemnité de licenciement . catégorie professionnelle":
        "'Cadres (Coefficient 900 et plus)'",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2020",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result.type).toEqual("missing-args");
    expect((result as PublicodesMissingArgs).missingArgs[0].rawNode.nom).toBe(
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel"
    );
  });
});
