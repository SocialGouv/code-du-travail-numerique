import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1404"
);

describe("Test de la fonctionnalité 'calculateResult'", () => {
  test("Si cdi opération pas de missing var si on ne fourni pas le salaire de ref et l'ancienneté requise", () => {
    const { result, missingArgs, detail, formula } = engine.calculateResult({
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
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(160);
    expect(detail.chosenResult).toEqual("HAS_NO_LEGAL");
    expect(formula.formula).toEqual(
      "(8% * Sref1) + (6% * Sref2) + (4% * Sref3)"
    );
  });
  test("Si pas de cdi opération alors on a des missing var pour le legal", () => {
    const { missingArgs } = engine.calculateResult({
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
    expect(missingArgs).toEqual([
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
