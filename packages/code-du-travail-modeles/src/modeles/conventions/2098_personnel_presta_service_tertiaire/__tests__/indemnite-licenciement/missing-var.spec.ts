import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2098"
);

describe("Missing variables pour l'indemnité conventionnel de licenciement pour la CC 2098", () => {
  test("Licenciement pour inaptitude", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "38",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "38",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2800",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );

    const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
    expect(keys).toEqual([
      "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle",
    ]);
  });

  test("Catégorie professionnelle", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
          "'Non'",
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "38",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "38",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2800",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );

    const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
    expect(keys).toEqual([
      "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle",
    ]);
  });

  test("Age", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
          "'Non'",
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "38",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "38",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2800",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );

    const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
    expect(keys).toEqual([
      "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . cadres . age",
    ]);
  });
});
