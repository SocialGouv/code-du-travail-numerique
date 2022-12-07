import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { mergePreavisRetraiteModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergePreavisRetraiteModels());

const DepartRetraiteSaufCadres = [
  ...DepartRetraiteReferences,
  {
    article: "Article 3.43.0",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026356045?idConteneur=KALICONT000005635653",
  },
];
const DepartRetraiteCadres = DepartRetraiteReferences;
const MiseRetraiteSaufCadres = [
  ...MiseRetraiteReferences,
  {
    article: "Article 3.43.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000039412127/?idConteneur=KALICONT000005635653",
  },
];
const MiseRetraiteCadres = [
  ...MiseRetraiteReferences,
  {
    article: "Article 6.50",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000026356071/?idConteneur=KALICONT000005635653",
  },
];

describe("Préavis de départ à la retraite", () => {
  test.each`
    seniority | level  | expectedNotice | expectedReferences
    ${1}      | ${"1"} | ${1}           | ${DepartRetraiteSaufCadres}
    ${6}      | ${"1"} | ${1}           | ${DepartRetraiteSaufCadres}
    ${24}     | ${"1"} | ${1}           | ${DepartRetraiteSaufCadres}
    ${1}      | ${"3"} | ${2}           | ${DepartRetraiteSaufCadres}
    ${6}      | ${"3"} | ${1}           | ${DepartRetraiteSaufCadres}
    ${24}     | ${"3"} | ${2}           | ${DepartRetraiteSaufCadres}
  `(
    "Pour un ouvrier ou employé de niveau $level possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, level, expectedNotice, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . Ouvriers et Employés . niveau": level,
        "contrat salarié . convention collective . sedima . catégorie professionnelle": `'Ouvriers et Employés'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      });
      const result = engine.evaluate("contrat salarié . préavis de retraite");
      const references = getReferences(engine);

      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual(["mois"]);
      expect(references).toHaveLength(expectedReferences.length);
      expect(references).toEqual(expect.arrayContaining(expectedReferences));
    }
  );

  test.each`
    seniority | category                               | expectedNotice | expectedReferences
    ${1}      | ${"Techniciens et agents de maîtrise"} | ${3}           | ${DepartRetraiteSaufCadres}
    ${6}      | ${"Techniciens et agents de maîtrise"} | ${1}           | ${DepartRetraiteSaufCadres}
    ${24}     | ${"Techniciens et agents de maîtrise"} | ${2}           | ${DepartRetraiteSaufCadres}
    ${1}      | ${"Cadres"}                            | ${0}           | ${DepartRetraiteCadres}
    ${6}      | ${"Cadres"}                            | ${1}           | ${DepartRetraiteCadres}
    ${24}     | ${"Cadres"}                            | ${2}           | ${DepartRetraiteCadres}
  `(
    "Pour un $category de niveau $level possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, category, expectedNotice, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      });
      const result = engine.evaluate("contrat salarié . préavis de retraite");
      const references = getReferences(engine);

      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual(["mois"]);
      expect(references).toHaveLength(expectedReferences.length);
      expect(references).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});

describe("Préavis de mise à la retraite", () => {
  test.each`
    seniority | level  | expectedNotice | expectedReferences
    ${1}      | ${"1"} | ${2}           | ${MiseRetraiteSaufCadres}
    ${6}      | ${"1"} | ${2}           | ${MiseRetraiteSaufCadres}
    ${24}     | ${"1"} | ${2}           | ${MiseRetraiteSaufCadres}
    ${1}      | ${"3"} | ${3}           | ${MiseRetraiteSaufCadres}
    ${6}      | ${"3"} | ${3}           | ${MiseRetraiteSaufCadres}
    ${24}     | ${"3"} | ${3}           | ${MiseRetraiteSaufCadres}
  `(
    "Pour un Ouvriers et Employés de niveau $level possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, level, expectedNotice, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . Ouvriers et Employés . niveau": level,
        "contrat salarié . convention collective . sedima . catégorie professionnelle": `'Ouvriers et Employés'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      });
      const result = engine.evaluate("contrat salarié . préavis de retraite");
      const references = getReferences(engine);

      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual(["mois"]);
      expect(references).toHaveLength(expectedReferences.length);
      expect(references).toEqual(expect.arrayContaining(expectedReferences));
    }
  );

  test.each`
    seniority | level  | expectedNotice | expectedReferences
    ${1}      | ${"4"} | ${3}           | ${MiseRetraiteSaufCadres}
    ${6}      | ${"4"} | ${3}           | ${MiseRetraiteSaufCadres}
    ${24}     | ${"4"} | ${3}           | ${MiseRetraiteSaufCadres}
    ${1}      | ${"5"} | ${4}           | ${MiseRetraiteSaufCadres}
    ${6}      | ${"5"} | ${4}           | ${MiseRetraiteSaufCadres}
    ${24}     | ${"5"} | ${4}           | ${MiseRetraiteSaufCadres}
  `(
    "Pour un Techniciens et agents de maîtrise de niveau $level possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, level, expectedNotice, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . Techniciens et agents de maîtrise . niveau": level,
        "contrat salarié . convention collective . sedima . catégorie professionnelle": `'Techniciens et agents de maîtrise'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      });
      const result = engine.evaluate("contrat salarié . préavis de retraite");
      const references = getReferences(engine);

      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual(["mois"]);
      expect(references).toHaveLength(expectedReferences.length);
      expect(references).toEqual(expect.arrayContaining(expectedReferences));
    }
  );

  test.each`
    seniority | expectedNotice | expectedReferences
    ${1}      | ${3}           | ${MiseRetraiteCadres}
    ${6}      | ${3}           | ${MiseRetraiteCadres}
    ${24}     | ${3}           | ${MiseRetraiteCadres}
  `(
    "Pour un Cadres possédant $seniority mois d'ancienneté, son préavis devrait être $expectedNotice mois",
    ({ seniority, expectedNotice, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle": `'Cadres'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      });
      const result = engine.evaluate("contrat salarié . préavis de retraite");
      const references = getReferences(engine);

      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedNotice);
      expect(result.unit?.numerators).toEqual(["mois"]);
      expect(references).toHaveLength(expectedReferences.length);
      expect(references).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
