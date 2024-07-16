import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2148"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier qu'il n'y a pas l'eligibilite Anciennete inférieur 1 an", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC2148'",
      "contrat salarié . convention collective . télécommunications . age":
        "42",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/11/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/11/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2600",
    });
    expect(result).toNextMissingRuleBeEqual(null);
    expect(result).toIneligibilityBeEqual(null);
  });
});
