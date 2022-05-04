import Engine from "publicodes";

import { getReferences } from "../../../..";
import { mergeModels } from "../../../../internal/merger";
import { IndemniteLicenciementReferences } from "../../legal-references";

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
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "''",
          "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . salaire de référence": 1000,
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
    "pour un employé avec une ancienneté de $seniority mois licencié pour inpatitude",
    ({ seniority, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "''",
          "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
            "oui",
          "contrat salarié . salaire de référence": 1000,
          "indemnité de licenciement": "oui",
        })
      );

      expect(result).toHaveLength(3);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
      expect(result).toEqual(
        expect.arrayContaining([
          {
            article: "Article L1226-14",
            url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900981/",
          },
        ])
      );
    }
  );
});
