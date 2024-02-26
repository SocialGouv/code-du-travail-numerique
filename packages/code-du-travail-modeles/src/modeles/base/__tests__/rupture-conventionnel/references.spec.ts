import {
  IndemniteLicenciementInaptitudeReferences,
  IndemniteLicenciementReferences,
} from "../../../../__test__/common/legal-references";
import { RuptureConventionnelPublicodes } from "../../../../publicodes";

const engine = new RuptureConventionnelPublicodes(modelsRuptureConventionnel);

describe("Vérification des références juridiques pour Indemnité légale de licenciement", () => {
  test.each`
    seniority | expectedReferences
    ${5}      | ${IndemniteLicenciementReferences}
    ${6}      | ${IndemniteLicenciementReferences}
    ${24}     | ${IndemniteLicenciementReferences}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . rupture conventionnelle . ancienneté en année":
          seniority,
        "contrat salarié . rupture conventionnelle . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . rupture conventionnelle . salaire de référence":
          "1000",
      });
      const result = engine.getReferences();

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
  test.each`
    seniority | expectedReferences
    ${5}      | ${[...IndemniteLicenciementReferences, ...IndemniteLicenciementInaptitudeReferences]}
    ${6}      | ${[...IndemniteLicenciementReferences, ...IndemniteLicenciementInaptitudeReferences]}
    ${24}     | ${[...IndemniteLicenciementReferences, ...IndemniteLicenciementInaptitudeReferences]}
  `(
    "pour un employé avec une ancienneté de $seniority mois licencié pour inaptitude",
    ({ seniority, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . rupture conventionnelle . ancienneté en année":
          seniority,
        "contrat salarié . rupture conventionnelle . inaptitude suite à un accident ou maladie professionnelle":
          "oui",
        "contrat salarié . rupture conventionnelle . salaire de référence":
          "1000",
      });
      const result = engine.getReferences();

      expect(result).toHaveLength(6);
      expect(result).toEqual(expectedReferences);
    }
  );
});
