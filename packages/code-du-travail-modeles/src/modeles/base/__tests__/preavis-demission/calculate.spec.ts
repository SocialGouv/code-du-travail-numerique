import { PreavisDemissionPublicodes } from "../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que pour le légal on a pas de préavis", () => {
    const result = engine.calculate({});
    expect(result).toResultBeEqual(0, "");
  });
});
