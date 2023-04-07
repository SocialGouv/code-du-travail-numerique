import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2264"
);

describe("Missing args pour la CC 2264", () => {
  test("Catégorie professionnelle", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "3",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "3",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
    expect(keys).toEqual([
      "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
    ]);
  });
  test("Non cadre durant une période", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "3",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "3",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
    expect(keys).toEqual([
      "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période",
    ]);
  });

  test("Non cadre", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "3",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "3",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(missingArgs).toEqual([]);
  });

  test("Durée de la période non cadre", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
          "'Oui'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "3",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "3",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
    expect(keys).toEqual([
      "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps effectif",
    ]);
  });
  test("Aucune variable", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
          "'Oui'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps effectif":
          "1",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "3",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "3",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(missingArgs).toEqual([]);
  });
});
