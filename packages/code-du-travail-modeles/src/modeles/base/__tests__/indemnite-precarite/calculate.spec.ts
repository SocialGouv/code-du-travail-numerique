import { IndemnitePrecaritePublicodes } from "../../../../publicodes/IndemnitePrecaritePublicodes";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que le CDD générique donne 10% de la rémunération brute", () => {
    const result = engine.calculate({
      "contrat salarié . type de contrat": "'CDD'",
      "contrat salarié . type de cdd": "'Autres'",
      "contrat salarié . fin à la date prévue": "'oui'",
      "contrat salarié . issue du contrat": "'autre'",
      "contrat salarié . salaire de référence": "3000",
    });
    expect(result).toResultBeEqual(300, "€");
  });

  test("Vérifier que le CTT générique donne 10% de la rémunération brute", () => {
    const result = engine.calculate({
      "contrat salarié . type de contrat": "'CTT'",
      "contrat salarié . type de cdd": "'Autres'",
      "contrat salarié . fin à la date prévue": "'non'",
      "contrat salarié . issue du contrat": "'autre'",
      "contrat salarié . salaire de référence": "3000",
    });
    expect(result).toResultBeEqual(300, "€");
  });
});
