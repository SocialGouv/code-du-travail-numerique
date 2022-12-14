import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";

const engine = new Engine(modeles as any);

test.each`
  seniority | expectedNotice
  ${3}      | ${0}
  ${6}      | ${1}
  ${11}     | ${1}
  ${12}     | ${1}
  ${23}     | ${1}
  ${24}     | ${2}
  ${25}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category         | coefficient | expectedNotice
  ${5}      | ${"Ouvriers"}    | ${189}      | ${1}
  ${6}      | ${"Ouvriers"}    | ${189}      | ${1}
  ${24}     | ${"Ouvriers"}    | ${189}      | ${2}
  ${5}      | ${"Ouvriers"}    | ${190}      | ${2}
  ${6}      | ${"Ouvriers"}    | ${190}      | ${2}
  ${24}     | ${"Ouvriers"}    | ${190}      | ${2}
  ${5}      | ${"Employés"}    | ${189}      | ${1}
  ${6}      | ${"Employés"}    | ${189}      | ${1}
  ${24}     | ${"Employés"}    | ${189}      | ${2}
  ${5}      | ${"Employés"}    | ${190}      | ${2}
  ${6}      | ${"Employés"}    | ${190}      | ${2}
  ${24}     | ${"Employés"}    | ${190}      | ${2}
  ${5}      | ${"Techniciens"} | ${189}      | ${1}
  ${6}      | ${"Techniciens"} | ${189}      | ${1}
  ${24}     | ${"Techniciens"} | ${189}      | ${2}
  ${5}      | ${"Techniciens"} | ${190}      | ${2}
  ${6}      | ${"Techniciens"} | ${190}      | ${2}
  ${24}     | ${"Techniciens"} | ${190}      | ${2}
`(
  "Pour un $category avec un coefficient $coefficient possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, category, coefficient, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle . ouvriers et collaborateurs . coefficient": coefficient,
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
  seniority | category                  | coefficient | expectedNotice
  ${5}      | ${"Techniciens groupe 4"} | ${274}      | ${2}
  ${6}      | ${"Techniciens groupe 4"} | ${274}      | ${2}
  ${24}     | ${"Techniciens groupe 4"} | ${274}      | ${2}
  ${5}      | ${"Techniciens groupe 4"} | ${275}      | ${3}
  ${6}      | ${"Techniciens groupe 4"} | ${275}      | ${3}
  ${24}     | ${"Techniciens groupe 4"} | ${275}      | ${3}
  ${5}      | ${"Agents de maîtrise"}   | ${274}      | ${2}
  ${6}      | ${"Agents de maîtrise"}   | ${274}      | ${2}
  ${24}     | ${"Agents de maîtrise"}   | ${274}      | ${2}
  ${5}      | ${"Agents de maîtrise"}   | ${275}      | ${3}
  ${6}      | ${"Agents de maîtrise"}   | ${275}      | ${3}
  ${24}     | ${"Agents de maîtrise"}   | ${275}      | ${3}
`(
  "Pour un $category avec un coefficient $coefficient possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, category, coefficient, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle . agents de maitrise et techniciens . coefficient": coefficient,
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
  ${5}      | ${"Ingénieurs"} | ${3}
  ${6}      | ${"Ingénieurs"} | ${3}
  ${24}     | ${"Ingénieurs"} | ${3}
  ${5}      | ${"Cadres"}     | ${3}
  ${6}      | ${"Cadres"}     | ${3}
  ${24}     | ${"Cadres"}     | ${3}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
