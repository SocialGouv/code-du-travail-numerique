import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1404"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier qu'il n'y a pas l'eligibilite Anciennete inférieur 8 mois quand cdi opération", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1404'",
      "contrat salarié . convention collective . sedima . question cdi opération":
        "oui",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/08/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/08/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2600",
    });
    expect(result).toNextMissingRuleBeEqual(null);
    expect(result).toIneligibilityBeEqual(null);
  });
  test("Vérifier qu'il n'y a pas l'eligibilite Anciennete inférieur 8 mois quand pas cdi opération", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1404'",
      "contrat salarié . convention collective . sedima . question cdi opération":
        "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/08/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/08/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2600",
    });
    expect(result).toIneligibilityBeEqual(
      "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois."
    );
  });
});
