import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "675"
);

describe("Missing variables pour l'indemnité conventionnel de licenciement pour la CC 675", () => {
  test("Catégorie professionnelle", () => {
    const { missingArgs } = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC0675'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "38",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "38",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2800",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );

    const keys = missingArgs.map(({ name }) => name.replace(/(-)/g, "."));
    expect(keys).toEqual([
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle",
    ]);
  });
});
