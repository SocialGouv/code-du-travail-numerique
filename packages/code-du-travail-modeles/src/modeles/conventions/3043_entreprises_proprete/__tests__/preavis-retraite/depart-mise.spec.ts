import Engine from "publicodes";

import modeles from "../../../../../../src/modeles/modeles-preavis-retraite.json";

const engine = new Engine(modeles as any);

test.each`
  seniority | category                                     | expectedNotice | expectedNoticeUnit
  ${0}      | ${"Agents de propreté"}                      | ${0}           | ${"jour"}
  ${4}      | ${"Agents de propreté"}                      | ${2}           | ${"jour"}
  ${6}      | ${"Agents de propreté"}                      | ${7}           | ${"jour"}
  ${24}     | ${"Agents de propreté"}                      | ${7}           | ${"jour"}
  ${25}     | ${"Agents de propreté"}                      | ${7}           | ${"jour"}
  ${42}     | ${"Agents de propreté"}                      | ${7}           | ${"jour"}
  ${0}      | ${"Employés"}                                | ${0}           | ${"mois"}
  ${3}      | ${"Employés"}                                | ${1}           | ${"mois"}
  ${6}      | ${"Employés"}                                | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}                                | ${1}           | ${"mois"}
  ${25}     | ${"Employés"}                                | ${1}           | ${"mois"}
  ${42}     | ${"Employés"}                                | ${1}           | ${"mois"}
  ${1}      | ${"Techniciens et Agents de maîtrise (TAM)"} | ${0}           | ${"mois"}
  ${12}     | ${"Techniciens et Agents de maîtrise (TAM)"} | ${1}           | ${"mois"}
  ${24}     | ${"Techniciens et Agents de maîtrise (TAM)"} | ${1}           | ${"mois"}
  ${25}     | ${"Techniciens et Agents de maîtrise (TAM)"} | ${2}           | ${"mois"}
  ${42}     | ${"Techniciens et Agents de maîtrise (TAM)"} | ${2}           | ${"mois"}
  ${1}      | ${"Cadres"}                                  | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}                                  | ${1}           | ${"mois"}
  ${24}     | ${"Cadres"}                                  | ${2}           | ${"mois"}
  ${25}     | ${"Cadres"}                                  | ${2}           | ${"mois"}
  ${42}     | ${"Cadres"}                                  | ${2}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedNoticeUnit",
  ({ seniority, category, expectedNotice, expectedNoticeUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC3043'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedNoticeUnit]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category                                     | expectedNotice | expectedNoticeUnit
  ${0}      | ${"Agents de propreté"}                      | ${0}           | ${"jour"}
  ${4}      | ${"Agents de propreté"}                      | ${7}           | ${"jour"}
  ${6}      | ${"Agents de propreté"}                      | ${1}           | ${"mois"}
  ${24}     | ${"Agents de propreté"}                      | ${2}           | ${"mois"}
  ${25}     | ${"Agents de propreté"}                      | ${2}           | ${"mois"}
  ${42}     | ${"Agents de propreté"}                      | ${2}           | ${"mois"}
  ${0}      | ${"Employés"}                                | ${0}           | ${"mois"}
  ${3}      | ${"Employés"}                                | ${1}           | ${"mois"}
  ${6}      | ${"Employés"}                                | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}                                | ${2}           | ${"mois"}
  ${25}     | ${"Employés"}                                | ${2}           | ${"mois"}
  ${42}     | ${"Employés"}                                | ${2}           | ${"mois"}
  ${1}      | ${"Techniciens et Agents de maîtrise (TAM)"} | ${0}           | ${"mois"}
  ${2}      | ${"Techniciens et Agents de maîtrise (TAM)"} | ${1}           | ${"mois"}
  ${6}      | ${"Techniciens et Agents de maîtrise (TAM)"} | ${1}           | ${"mois"}
  ${12}     | ${"Techniciens et Agents de maîtrise (TAM)"} | ${1}           | ${"mois"}
  ${24}     | ${"Techniciens et Agents de maîtrise (TAM)"} | ${2}           | ${"mois"}
  ${25}     | ${"Techniciens et Agents de maîtrise (TAM)"} | ${2}           | ${"mois"}
  ${42}     | ${"Techniciens et Agents de maîtrise (TAM)"} | ${2}           | ${"mois"}
  ${1}      | ${"Cadres"}                                  | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}                                  | ${3}           | ${"mois"}
  ${24}     | ${"Cadres"}                                  | ${3}           | ${"mois"}
  ${25}     | ${"Cadres"}                                  | ${3}           | ${"mois"}
  ${42}     | ${"Cadres"}                                  | ${3}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedNoticeUnit",
  ({ seniority, category, expectedNotice, expectedNoticeUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC3043'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedNoticeUnit]);
    expect(result.missingVariables).toEqual({});
  }
);
