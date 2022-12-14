import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";

const engine = new Engine(modeles as any);

test.each`
  seniority | category      | expectedNotice
  ${4}      | ${"Employés"} | ${1}
  ${10}     | ${"Employés"} | ${1}
  ${25}     | ${"Employés"} | ${2}
  ${4}      | ${"Cadres"}   | ${3}
  ${10}     | ${"Cadres"}   | ${3}
  ${25}     | ${"Cadres"}   | ${3}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0787'",
        "contrat salarié . convention collective . comptables . mise à la retraite . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category        | expectedNotice
  ${4}      | ${"Assistants"} | ${1}
  ${10}     | ${"Assistants"} | ${1}
  ${25}     | ${"Assistants"} | ${2}
  ${4}      | ${"Autres"}     | ${2}
  ${10}     | ${"Autres"}     | ${1}
  ${25}     | ${"Autres"}     | ${2}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0787'",
        "contrat salarié . convention collective . comptables . départ à la retraite . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
