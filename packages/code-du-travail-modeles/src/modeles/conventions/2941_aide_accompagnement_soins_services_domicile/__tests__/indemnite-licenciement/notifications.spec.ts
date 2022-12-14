import { getNotifications } from "../../../../common";

import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-indemnite-licenciement.json";

const engine = new Engine(modeles as any);

describe("Vérification des notifications pour la CC 2941", () => {
  test("aucune notification ne doit remonter", () => {
    const result = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2941'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 10,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      })
    );

    expect(result).toHaveLength(0);
  });
});
