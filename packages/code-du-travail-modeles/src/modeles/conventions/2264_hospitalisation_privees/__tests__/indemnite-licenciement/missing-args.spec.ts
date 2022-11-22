import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Missing args pour la CC 2264", () => {
  test("Catégorie professionnelle", () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 3,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2000,
      })
      .evaluate(
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    expect(result.missingVariables).toEqual({
      "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle": 21,
    });
  });
  test("Non cadre durant une période", () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 3,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2000,
      })
      .evaluate(
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    expect(result.missingVariables).toEqual({
      "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période": 920,
    });
  });

  test("Non cadre", () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 3,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2000,
      })
      .evaluate(
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    expect(result.missingVariables).toEqual({});
  });

  test("Durée de la période non cadre", () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
          "'Oui'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 3,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2000,
      })
      .evaluate(
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    expect(result.missingVariables).toEqual({
      "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps effectif": 595,
    });
  });
  test("Aucune variable", () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
          "'Oui'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps effectif": 1,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 3,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2000,
      })
      .evaluate(
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    expect(result.missingVariables).toEqual({});
  });
});
