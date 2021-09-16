import Engine from "publicodes";
import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

/**
  TODO:
  ${6}      | ${"Agents de propreté"}               | ${7}           | ${"jour"}
  ${24}     | ${"Agents de propreté"}               | ${7}           | ${"jour"}
 */
test.each`
  seniority | category                              | expectedNotice | expectedNoticeUnit
  ${0}      | ${"Agents de propreté"}               | ${0}           | ${"mois"}
  ${4}      | ${"Agents de propreté"}               | ${2}           | ${"jour"}
  ${0}      | ${"Employés"}                         | ${0}           | ${"mois"}
  ${3}      | ${"Employés"}                         | ${1}           | ${"mois"}
  ${6}      | ${"Employés"}                         | ${1}           | ${"mois"}
  ${1}      | ${"Techniciens & Agents de maîtrise"} | ${0}           | ${"mois"}
  ${12}     | ${"Techniciens & Agents de maîtrise"} | ${1}           | ${"mois"}
  ${24}     | ${"Techniciens & Agents de maîtrise"} | ${2}           | ${"mois"}
  ${1}      | ${"Cadres"}                           | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}                           | ${1}           | ${"mois"}
  ${24}     | ${"Cadres"}                           | ${2}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedNoticeUnit",
  ({ seniority, category, expectedNotice, expectedNoticeUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC3043'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . convention collective . propreté entreprise . catégorie professionnelle": `'${category}'`,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedNoticeUnit]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category                              | expectedNotice | expectedNoticeUnit
  ${0}      | ${"Agents de propreté"}               | ${0}           | ${"mois"}
  ${4}      | ${"Agents de propreté"}               | ${1}           | ${"semaine"}
  ${6}      | ${"Agents de propreté"}               | ${1}           | ${"mois"}
  ${24}     | ${"Agents de propreté"}               | ${2}           | ${"mois"}
  ${0}      | ${"Employés"}                         | ${0}           | ${"mois"}
  ${3}      | ${"Employés"}                         | ${1}           | ${"mois"}
  ${6}      | ${"Employés"}                         | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}                         | ${2}           | ${"mois"}
  ${1}      | ${"Techniciens & Agents de maîtrise"} | ${0}           | ${"mois"}
  ${12}     | ${"Techniciens & Agents de maîtrise"} | ${1}           | ${"mois"}
  ${24}     | ${"Techniciens & Agents de maîtrise"} | ${2}           | ${"mois"}
  ${1}      | ${"Cadres"}                           | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}                           | ${3}           | ${"mois"}
  ${24}     | ${"Cadres"}                           | ${3}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedNoticeUnit",
  ({ seniority, category, expectedNotice, expectedNoticeUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC3043'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . convention collective . propreté entreprise . catégorie professionnelle": `'${category}'`,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedNoticeUnit]);
    expect(result.missingVariables).toEqual({});
  }
);
