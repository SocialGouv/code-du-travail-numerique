import { IndemnitePrecaritePublicodes } from "../../../../publicodes/IndemnitePrecarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que pour le légal on a pas de préavis", () => {
    const result = engine.calculate({
      "contrat salarié . contractType": "'CDD'",
      "contrat salarié . type de cdd": "'Autres'",
      "contrat salarié . finContratPeriodeDessai": "non",
      "contrat salarié . propositionCDIFindeContrat": "non",
      "contrat salarié . refusCDIFindeContrat": "non",
      "contrat salarié . interruptionFauteGrave": "non",
      "contrat salarié . refusRenouvellementAuto": "non",
      "contrat salarié . cttFormation": "non",
      "contrat salarié . ruptureContratFauteGrave": "non",
      "contrat salarié . propositionCDIFinContrat": "non",
      "contrat salarié . refusSouplesse": "non",
      "contrat salarié . salaire de référence": "3000",
    });
    expect(result).toResultBeEqual(300, "€");
  });
});
