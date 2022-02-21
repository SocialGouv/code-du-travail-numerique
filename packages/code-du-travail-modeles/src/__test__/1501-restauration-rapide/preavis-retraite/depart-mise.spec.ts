import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());
describe("restauration rapide", () => {
  const CCReferences = [
    {
      article: "Article 28",
      url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005833486/?idConteneur=KALICONT000005635596",
    },
    {
      article: "Article 12",
      url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005833465/?idConteneur=KALICONT000005635596",
    },
  ];
  const DepartRetraiteRefs = [...DepartRetraiteReferences, ...CCReferences];

  const MiseRetraiteRefs = [...MiseRetraiteReferences, ...CCReferences];

  describe("départ à la retraite", () => {
    test.each`
      seniority | category                | expectedNotice | expectedUnit | expectedReferences
      ${4}      | ${"Ouvriers"}           | ${8}           | ${"jour"}    | ${DepartRetraiteRefs}
      ${8}      | ${"Ouvriers"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${24}     | ${"Ouvriers"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${25}     | ${"Ouvriers"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${4}      | ${"Employés"}           | ${8}           | ${"jour"}    | ${DepartRetraiteRefs}
      ${8}      | ${"Employés"}           | ${15}          | ${"jour"}    | ${DepartRetraiteRefs}
      ${24}     | ${"Employés"}           | ${15}          | ${"jour"}    | ${DepartRetraiteRefs}
      ${25}     | ${"Employés"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${4}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${8}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${24}     | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${25}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${4}      | ${"Cadres"}             | ${3}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${8}      | ${"Cadres"}             | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${24}     | ${"Cadres"}             | ${2}           | ${"mois"}    | ${DepartRetraiteRefs}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis est $expectedNotice $expectedUnit",
      ({
        seniority,
        category,
        expectedNotice,
        expectedUnit,
        expectedReferences,
      }) => {
        engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1501'",
          "contrat salarié . convention collective . restauration rapide . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "non",
        });

        const result = engine.evaluate("contrat salarié . préavis de retraite");
        expect(result.nodeValue).toEqual(expectedNotice);
        expect(result.unit?.numerators).toEqual([expectedUnit]);
        expect(result.missingVariables).toEqual({});

        const references = getReferences(engine);
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("mise à la retraite", () => {
    test.each`
      seniority | category                | expectedNotice | expectedUnit | expectedReferences
      ${4}      | ${"Ouvriers"}           | ${8}           | ${"jour"}    | ${MiseRetraiteRefs}
      ${8}      | ${"Ouvriers"}           | ${1}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${24}     | ${"Ouvriers"}           | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${25}     | ${"Ouvriers"}           | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${4}      | ${"Employés"}           | ${8}           | ${"jour"}    | ${MiseRetraiteRefs}
      ${8}      | ${"Employés"}           | ${1}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${24}     | ${"Employés"}           | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${25}     | ${"Employés"}           | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${4}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${8}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${24}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${25}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${4}      | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${8}      | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${24}     | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${25}     | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteRefs}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis est $expectedNotice $expectedUnit",
      ({
        seniority,
        category,
        expectedNotice,
        expectedUnit,
        expectedReferences,
      }) => {
        engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1501'",
          "contrat salarié . convention collective . restauration rapide . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "non",
        });

        const result = engine.evaluate("contrat salarié . préavis de retraite");

        expect(result.nodeValue).toEqual(expectedNotice);
        expect(result.unit?.numerators).toEqual([expectedUnit]);
        expect(result.missingVariables).toEqual({});

        const references = getReferences(engine);
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
