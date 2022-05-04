import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | category                | expectedNotice | expectedUnit
  ${5}      | ${"Cadres"}             | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}             | ${1}           | ${"mois"}
  ${24}     | ${"Cadres"}             | ${2}           | ${"mois"}
  ${0}      | ${"Employés"}           | ${0}           | ${"mois"}
  ${1}      | ${"Employés"}           | ${15}          | ${"jour"}
  ${6}      | ${"Employés"}           | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}           | ${1}           | ${"mois"}
  ${5}      | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
  ${6}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}
  ${24}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedUnit",
  ({ seniority, category, expectedNotice, expectedUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0675'",
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedUnit]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category                | expectedNotice | expectedUnit
  ${5}      | ${"Cadres"}             | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}             | ${3}           | ${"mois"}
  ${24}     | ${"Cadres"}             | ${3}           | ${"mois"}
  ${0}      | ${"Employés"}           | ${0}           | ${"mois"}
  ${1}      | ${"Employés"}           | ${15}          | ${"jour"}
  ${6}      | ${"Employés"}           | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}           | ${2}           | ${"mois"}
  ${5}      | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
  ${6}      | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
  ${24}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedUnit",
  ({ seniority, category, expectedNotice, expectedUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0675'",
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedUnit]);
    expect(result.missingVariables).toEqual({});
  }
);
