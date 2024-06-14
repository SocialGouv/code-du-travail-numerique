import type { PublicodesMissingArgs } from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1404"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Si cdi opération pas de missing var si on ne fourni pas le salaire de ref et l'ancienneté requise", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1404'",
      "contrat salarié . convention collective . sedima . cdi opération . durée":
        "10",
      "contrat salarié . convention collective . sedima . cdi opération . moins de 6 mois . question période essai":
        "'Oui'",
      "contrat salarié . convention collective . sedima . cdi opération . moins de 6 mois . salaires total":
        "2000",
      "contrat salarié . convention collective . sedima . cdi opération . plus de 6 mois . salaires 1e année":
        "2000",
      "contrat salarié . convention collective . sedima . question cdi opération":
        "'Oui'",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2022",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/05/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/05/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2600",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result).toResultBeEqual(160, "€");
    expect(result).toChosenResultBeEqual("HAS_NO_LEGAL");
    expect(result).toFormulaBeEqual(
      "(8% * Sref1) + (6% * Sref2) + (4% * Sref3)"
    );
  });
  test("Si pas de cdi opération alors on a des missing var pour le legal", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1404'",
      "contrat salarié . convention collective . sedima . cdi opération . durée":
        "10",
      "contrat salarié . convention collective . sedima . cdi opération . moins de 6 mois . question période essai":
        "'Oui'",
      "contrat salarié . convention collective . sedima . cdi opération . moins de 6 mois . salaires total":
        "2000",
      "contrat salarié . convention collective . sedima . cdi opération . plus de 6 mois . salaires 1e année":
        "2000",
      "contrat salarié . convention collective . sedima . question cdi opération":
        "'Non'",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2022",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/05/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/05/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2600",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result.type).toBe("missing-args");

    expect((result as PublicodesMissingArgs).missingArgs[0].rawNode.nom).toBe(
      "contrat salarié . indemnité de licenciement . salaire de référence"
    );
  });
});
