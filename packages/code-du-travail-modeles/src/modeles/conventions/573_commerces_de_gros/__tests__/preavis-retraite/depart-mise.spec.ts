import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | expectedNotice | expectedUnit
  ${5}      | ${0}           | ${"semaines"}
  ${6}      | ${1}           | ${"mois"}
  ${24}     | ${2}           | ${"mois"}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0573'",
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
  seniority | category                | expectedNotice
  ${5}      | ${"Ouvriers"}           | ${3}
  ${6}      | ${"Ouvriers"}           | ${3}
  ${24}     | ${"Ouvriers"}           | ${3}
  ${5}      | ${"Employés"}           | ${3}
  ${6}      | ${"Employés"}           | ${3}
  ${24}     | ${"Employés"}           | ${3}
  ${5}      | ${"Agents de maîtrise"} | ${3}
  ${6}      | ${"Agents de maîtrise"} | ${3}
  ${24}     | ${"Agents de maîtrise"} | ${3}
  ${5}      | ${"Techniciens"}        | ${3}
  ${6}      | ${"Techniciens"}        | ${3}
  ${24}     | ${"Techniciens"}        | ${3}
  ${5}      | ${"Cadres"}             | ${6}
  ${6}      | ${"Cadres"}             | ${6}
  ${24}     | ${"Cadres"}             | ${6}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual("mois");
    expect(missingArgs).toEqual([]);
  }
);

test.each`
  seniority
  ${5}
  ${6}
  ${24}
`(
  "Pour un employé possédant $seniority mois d'ancienneté en mise à la retraite, on ne doit pas afficher de notification",
  ({ seniority }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . convention collective": "'IDCC0573'",
      "contrat salarié . mise à la retraite": "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getNotifications();

    expect(result).toHaveLength(0);
  }
);

test.each`
  seniority | category
  ${5}      | ${"Ouvriers"}
  ${6}      | ${"Ouvriers"}
  ${24}     | ${"Ouvriers"}
  ${5}      | ${"Employés"}
  ${6}      | ${"Employés"}
  ${24}     | ${"Employés"}
  ${5}      | ${"Agents de maîtrise"}
  ${6}      | ${"Agents de maîtrise"}
  ${24}     | ${"Agents de maîtrise"}
  ${5}      | ${"Techniciens"}
  ${6}      | ${"Techniciens"}
  ${24}     | ${"Techniciens"}
  ${5}      | ${"Cadres"}
  ${6}      | ${"Cadres"}
  ${24}     | ${"Cadres"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté en mise à la retraite, on ne doit pas afficher de notification",
  ({ seniority, category }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . convention collective": "'IDCC0573'",
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getNotifications();

    expect(result).toHaveLength(0);
  }
);
