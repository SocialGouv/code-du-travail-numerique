import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);
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
      ${4}      | ${"Ouvriers"}           | ${8}           | ${"jours"}   | ${DepartRetraiteRefs}
      ${8}      | ${"Ouvriers"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${24}     | ${"Ouvriers"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${25}     | ${"Ouvriers"}           | ${1}           | ${"mois"}    | ${DepartRetraiteRefs}
      ${4}      | ${"Employés"}           | ${8}           | ${"jours"}   | ${DepartRetraiteRefs}
      ${8}      | ${"Employés"}           | ${15}          | ${"jours"}   | ${DepartRetraiteRefs}
      ${24}     | ${"Employés"}           | ${15}          | ${"jours"}   | ${DepartRetraiteRefs}
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
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1501'",
            "contrat salarié . convention collective . restauration rapide . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        expect(result.value).toEqual(expectedNotice);
        expect(result.unit).toEqual(expectedUnit);
        expect(missingArgs).toEqual([]);

        const references = engine.getReferences();
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("mise à la retraite", () => {
    test.each`
      seniority | category                | expectedNotice | expectedUnit | expectedReferences
      ${4}      | ${"Ouvriers"}           | ${8}           | ${"jours"}   | ${MiseRetraiteRefs}
      ${8}      | ${"Ouvriers"}           | ${1}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${24}     | ${"Ouvriers"}           | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${25}     | ${"Ouvriers"}           | ${2}           | ${"mois"}    | ${MiseRetraiteRefs}
      ${4}      | ${"Employés"}           | ${8}           | ${"jours"}   | ${MiseRetraiteRefs}
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
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1501'",
            "contrat salarié . convention collective . restauration rapide . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );

        expect(result.value).toEqual(expectedNotice);
        expect(result.unit).toEqual(expectedUnit);
        expect(missingArgs).toEqual([]);

        const references = engine.getReferences();
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
