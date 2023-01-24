import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | expectedNotice | expectedUnit
  ${3}      | ${0}           | ${"semaines"}
  ${6}      | ${1}           | ${"mois"}
  ${11}     | ${1}           | ${"mois"}
  ${12}     | ${1}           | ${"mois"}
  ${23}     | ${1}           | ${"mois"}
  ${24}     | ${2}           | ${"mois"}
  ${25}     | ${2}           | ${"mois"}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0044'",
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
  seniority | category         | coefficient | expectedNotice | expectedUnit
  ${5}      | ${"Ouvriers"}    | ${189}      | ${1}           | ${"mois"}
  ${6}      | ${"Ouvriers"}    | ${189}      | ${1}           | ${"mois"}
  ${24}     | ${"Ouvriers"}    | ${189}      | ${2}           | ${"mois"}
  ${5}      | ${"Ouvriers"}    | ${190}      | ${2}           | ${"mois"}
  ${6}      | ${"Ouvriers"}    | ${190}      | ${2}           | ${"mois"}
  ${24}     | ${"Ouvriers"}    | ${190}      | ${2}           | ${"mois"}
  ${5}      | ${"Employés"}    | ${189}      | ${1}           | ${"mois"}
  ${6}      | ${"Employés"}    | ${189}      | ${1}           | ${"mois"}
  ${24}     | ${"Employés"}    | ${189}      | ${2}           | ${"mois"}
  ${5}      | ${"Employés"}    | ${190}      | ${2}           | ${"mois"}
  ${6}      | ${"Employés"}    | ${190}      | ${2}           | ${"mois"}
  ${24}     | ${"Employés"}    | ${190}      | ${2}           | ${"mois"}
  ${5}      | ${"Techniciens"} | ${189}      | ${1}           | ${"mois"}
  ${6}      | ${"Techniciens"} | ${189}      | ${1}           | ${"mois"}
  ${24}     | ${"Techniciens"} | ${189}      | ${2}           | ${"mois"}
  ${5}      | ${"Techniciens"} | ${190}      | ${2}           | ${"mois"}
  ${6}      | ${"Techniciens"} | ${190}      | ${2}           | ${"mois"}
  ${24}     | ${"Techniciens"} | ${190}      | ${2}           | ${"mois"}
`(
  "Pour un $category avec un coefficient $coefficient possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, category, coefficient, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle . ouvriers et collaborateurs . coefficient": coefficient,
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

test.each`
  seniority | category                  | coefficient | expectedNotice | expectedUnit
  ${5}      | ${"Techniciens groupe 4"} | ${274}      | ${2}           | ${"mois"}
  ${6}      | ${"Techniciens groupe 4"} | ${274}      | ${2}           | ${"mois"}
  ${24}     | ${"Techniciens groupe 4"} | ${274}      | ${2}           | ${"mois"}
  ${5}      | ${"Techniciens groupe 4"} | ${275}      | ${3}           | ${"mois"}
  ${6}      | ${"Techniciens groupe 4"} | ${275}      | ${3}           | ${"mois"}
  ${24}     | ${"Techniciens groupe 4"} | ${275}      | ${3}           | ${"mois"}
  ${5}      | ${"Agents de maîtrise"}   | ${274}      | ${2}           | ${"mois"}
  ${6}      | ${"Agents de maîtrise"}   | ${274}      | ${2}           | ${"mois"}
  ${24}     | ${"Agents de maîtrise"}   | ${274}      | ${2}           | ${"mois"}
  ${5}      | ${"Agents de maîtrise"}   | ${275}      | ${3}           | ${"mois"}
  ${6}      | ${"Agents de maîtrise"}   | ${275}      | ${3}           | ${"mois"}
  ${24}     | ${"Agents de maîtrise"}   | ${275}      | ${3}           | ${"mois"}
`(
  "Pour un $category avec un coefficient $coefficient possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, category, coefficient, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle . agents de maitrise et techniciens . coefficient": coefficient,
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

test.each`
  seniority | category        | expectedNotice | expectedUnit
  ${5}      | ${"Ingénieurs"} | ${3}           | ${"mois"}
  ${6}      | ${"Ingénieurs"} | ${3}           | ${"mois"}
  ${24}     | ${"Ingénieurs"} | ${3}           | ${"mois"}
  ${5}      | ${"Cadres"}     | ${3}           | ${"mois"}
  ${6}      | ${"Cadres"}     | ${3}           | ${"mois"}
  ${24}     | ${"Cadres"}     | ${3}           | ${"mois"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite doit être $expectedNotice mois",
  ({ seniority, category, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle": `'${category}'`,
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
