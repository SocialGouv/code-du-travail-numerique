import Engine from "publicodes";

import { getReferences } from "../../../..";
import { mergeModels } from "../../../../internal/merger";
import {
  IndemniteLicenciementInaptitudeReferences,
  IndemniteLicenciementReferences,
} from "../../legal-references";

const engine = new Engine(mergeModels());

describe("Vérification des références juridiques pour Indemnité légale de licenciement", () => {
  test.each`
    seniority | expectedReferences
    ${5}      | ${IndemniteLicenciementReferences}
    ${6}      | ${IndemniteLicenciementReferences}
    ${24}     | ${IndemniteLicenciementReferences}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . indemnité de licenciement . ancienneté": seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence": 1000,
          "indemnité de licenciement": "oui",
        })
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
  test.each`
    seniority | expectedReferences
    ${5}      | ${IndemniteLicenciementReferences.concat()}
    ${6}      | ${IndemniteLicenciementReferences}
    ${24}     | ${IndemniteLicenciementReferences}
  `(
    "pour un employé avec une ancienneté de $seniority mois licencié pour inaptitude",
    ({ seniority, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . indemnité de licenciement . ancienneté": seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "oui",
          "contrat salarié . indemnité de licenciement . salaire de référence": 1000,
          "indemnité de licenciement": "oui",
        })
      );

      expect(result).toHaveLength(6);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
      expect(result).toEqual(
        expect.arrayContaining(IndemniteLicenciementInaptitudeReferences)
      );
    }
  );
});
