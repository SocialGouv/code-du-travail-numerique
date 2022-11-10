import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { mergePreavisRetraiteModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergePreavisRetraiteModels());

const CommonReference = {
  article: "Article 7.4.1",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000018563843/?idConteneur=KALICONT000018563755",
};

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, CommonReference];

describe("Préavis de retraite de la CC 2596", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      category                                                      | seniority | expectedResult
      ${"Salariés occupant un emploi technique de la coiffure"}     | ${2}      | ${0}
      ${"Salariés occupant un emploi technique de la coiffure"}     | ${12}     | ${1}
      ${"Salariés occupant un emploi technique de la coiffure"}     | ${24}     | ${2}
      ${"Salariés occupant un emploi technique de la coiffure"}     | ${25}     | ${2}
      ${"Salariés occupant un emploi non technique de la coiffure"} | ${2}      | ${0}
      ${"Salariés occupant un emploi non technique de la coiffure"} | ${12}     | ${1}
      ${"Salariés occupant un emploi non technique de la coiffure"} | ${24}     | ${2}
      ${"Salariés occupant un emploi non technique de la coiffure"} | ${25}     | ${2}
      ${"Salariés occupant un emploi de l'esthétique cosmétique"}   | ${2}      | ${0}
      ${"Salariés occupant un emploi de l'esthétique cosmétique"}   | ${12}     | ${1}
      ${"Salariés occupant un emploi de l'esthétique cosmétique"}   | ${24}     | ${2}
      ${"Salariés occupant un emploi de l'esthétique cosmétique"}   | ${25}     | ${2}
      ${"Agents de maîtrise"}                                       | ${2}      | ${0}
      ${"Agents de maîtrise"}                                       | ${12}     | ${1}
      ${"Agents de maîtrise"}                                       | ${24}     | ${2}
      ${"Agents de maîtrise"}                                       | ${25}     | ${2}
      ${"Cadres"}                                                   | ${2}      | ${0}
      ${"Cadres"}                                                   | ${12}     | ${1}
      ${"Cadres"}                                                   | ${24}     | ${2}
      ${"Cadres"}                                                   | ${25}     | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC2596'",
          "contrat salarié . convention collective . coiffure . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(DepartRetraiteReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteReferences)
        );
      }
    );
  });

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      category                                                      | seniority | expectedResult | expectedPeriod
      ${"Salariés occupant un emploi technique de la coiffure"}     | ${2}      | ${7}           | ${"jour"}
      ${"Salariés occupant un emploi technique de la coiffure"}     | ${12}     | ${1}           | ${"mois"}
      ${"Salariés occupant un emploi technique de la coiffure"}     | ${24}     | ${2}           | ${"mois"}
      ${"Salariés occupant un emploi technique de la coiffure"}     | ${25}     | ${2}           | ${"mois"}
      ${"Salariés occupant un emploi non technique de la coiffure"} | ${2}      | ${7}           | ${"jour"}
      ${"Salariés occupant un emploi non technique de la coiffure"} | ${12}     | ${1}           | ${"mois"}
      ${"Salariés occupant un emploi non technique de la coiffure"} | ${24}     | ${2}           | ${"mois"}
      ${"Salariés occupant un emploi non technique de la coiffure"} | ${25}     | ${2}           | ${"mois"}
      ${"Salariés occupant un emploi de l'esthétique cosmétique"}   | ${2}      | ${7}           | ${"jour"}
      ${"Salariés occupant un emploi de l'esthétique cosmétique"}   | ${12}     | ${1}           | ${"mois"}
      ${"Salariés occupant un emploi de l'esthétique cosmétique"}   | ${24}     | ${2}           | ${"mois"}
      ${"Salariés occupant un emploi de l'esthétique cosmétique"}   | ${25}     | ${2}           | ${"mois"}
      ${"Agents de maîtrise"}                                       | ${2}      | ${3}           | ${"mois"}
      ${"Agents de maîtrise"}                                       | ${12}     | ${3}           | ${"mois"}
      ${"Agents de maîtrise"}                                       | ${24}     | ${3}           | ${"mois"}
      ${"Agents de maîtrise"}                                       | ${25}     | ${3}           | ${"mois"}
      ${"Cadres"}                                                   | ${2}      | ${3}           | ${"mois"}
      ${"Cadres"}                                                   | ${12}     | ${3}           | ${"mois"}
      ${"Cadres"}                                                   | ${24}     | ${3}           | ${"mois"}
      ${"Cadres"}                                                   | ${25}     | ${3}           | ${"mois"}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult, expectedPeriod }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC2596'",
          "contrat salarié . convention collective . coiffure . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual([expectedPeriod]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(MiseRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(MiseRetraiteCcReferences)
        );
      }
    );
  });
});
