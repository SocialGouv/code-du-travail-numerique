import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | category                | expectedNotice | expectedUnit
  ${5}      | ${"Cadres"}             | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}             | ${1}           | ${"mois"}
  ${24}     | ${"Cadres"}             | ${2}           | ${"mois"}
  ${0}      | ${"Employés"}           | ${0}           | ${"semaines"}
  ${1}      | ${"Employés"}           | ${15}          | ${"jours"}
  ${6}      | ${"Employés"}           | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}           | ${1}           | ${"mois"}
  ${5}      | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
  ${6}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}
  ${24}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedUnit",
  ({ seniority, category, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0675'",
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);
  }
);

test.each`
  seniority | category                | expectedNotice | expectedUnit
  ${5}      | ${"Cadres"}             | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}             | ${3}           | ${"mois"}
  ${24}     | ${"Cadres"}             | ${3}           | ${"mois"}
  ${0}      | ${"Employés"}           | ${0}           | ${"semaines"}
  ${1}      | ${"Employés"}           | ${15}          | ${"jours"}
  ${6}      | ${"Employés"}           | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}           | ${2}           | ${"mois"}
  ${5}      | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
  ${6}      | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
  ${24}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedUnit",
  ({ seniority, category, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0675'",
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);
  }
);
