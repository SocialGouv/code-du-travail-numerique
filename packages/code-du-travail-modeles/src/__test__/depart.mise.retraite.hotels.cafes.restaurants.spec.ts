import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());
describe("Prévis de retraite pour la CC 1979", () => {
  const CCReferences = [
    {
      article: "Article 33",
      url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005826299/?idConteneur=KALICONT000005635534",
    },
    {
      article: "Article 30.2",
      url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005826296/?idConteneur=KALICONT000005635534",
    },
  ];
  const DepartRetraiteRefs = [...DepartRetraiteReferences, ...CCReferences];

  const MiseRetraiteRefs = [...MiseRetraiteReferences, ...CCReferences];
  describe("Départ à la retraite", () => {
    test.each`
      seniority | category                | expectedNotice | expectedUnit | expectedReferences
      ${3}      | ${"Employés"}           | ${8}           | ${"jour"}    | ${DepartRetraiteRefs}
      ${8}      | ${"Employés"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${24}     | ${"Employés"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${25}     | ${"Employés"}           | ${2}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${3}      | ${"Agents de maîtrise"} | ${15}          | ${"jour"}    | ${DepartRetraiteRefs}
      ${8}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${24}     | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${25}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${3}      | ${"Cadres"}             | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
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
          "contrat salarié . convention collective": "'IDCC1979'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle": `'${category}'`,
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
  describe("Mise à la retraite", () => {
    test.each`
      seniority | category                | expectedNotice | expectedUnit | expectedReferences
      ${3}      | ${"Employés"}           | ${8}           | ${"jour"}    | ${MiseRetraiteRefs}
      ${8}      | ${"Employés"}           | ${1}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${24}     | ${"Employés"}           | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${25}     | ${"Employés"}           | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${3}      | ${"Agents de maîtrise"} | ${15}          | ${"jour"}    | ${MiseRetraiteRefs}
      ${8}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${24}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${25}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${3}      | ${"Cadres"}             | ${1}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${8}      | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${24}     | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteRefs}
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
          "contrat salarié . convention collective": "'IDCC1979'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle": `'${category}'`,
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
