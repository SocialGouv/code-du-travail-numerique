import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2941"
);

describe("Vérification des notifications pour la CC 2941", () => {
  test("aucune notification ne doit remonter", () => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC2941'",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        "10",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "1000",
    });
    const result = engine.getNotifications();

    expect(result).toHaveLength(0);
  });
});
