import { IndemnitePrecaritePublicodes } from "../../../../publicodes/IndemnitePrecarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que pour le légal on a pas de préavis", () => {
    const result = engine.calculate({
      "contrat salarié . salaire de référence": "3000",
    });
    expect(result).toResultBeEqual(300, "€");
  });
});
