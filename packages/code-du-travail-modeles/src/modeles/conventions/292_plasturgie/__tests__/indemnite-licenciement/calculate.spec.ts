import IndemniteLicenciementPublicodes from "../../../../../publicodes/IndemniteLicenciementPublicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "292"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que l'ancienneté peut être remplacer par les dates en input", () => {
    const { missingArgs } = engine.calculate({
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
    expect(missingArgs).toContain([
      {
        indice: 2,
        name: "contrat salarié - indemnité de licenciement - ancienneté requise en année",
        rawNode: {
          nom: "contrat salarié . indemnité de licenciement . ancienneté requise en année",
          titre:
            "Ancienneté calculée pour le droit à l'indemnité de licenciement",
          unité: "an",
        },
      },
      {
        indice: 1,
        name: "contrat salarié - indemnité de licenciement - salaire de référence",
        rawNode: {
          nom: "contrat salarié . indemnité de licenciement . salaire de référence",
          unité: "€",
        },
      },
    ]);
  });
});
