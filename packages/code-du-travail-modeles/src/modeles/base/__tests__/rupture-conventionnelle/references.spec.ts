import { IndemniteLicenciementReferences } from "../../../../__test__/common/legal-references";
import { RuptureConventionnellePublicodes } from "../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(modelsRuptureConventionnel);

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
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          seniority,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          "1000",
      });
      const result = engine.getReferences();

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
