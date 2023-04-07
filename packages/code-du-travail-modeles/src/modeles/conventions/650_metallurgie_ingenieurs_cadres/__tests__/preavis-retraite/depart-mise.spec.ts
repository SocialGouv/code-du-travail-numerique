import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | expectedNotice
  ${3}      | ${1}
  ${6}      | ${1}
  ${24}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0650'",
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
  seniority | expectedNotice
  ${3}      | ${1}
  ${6}      | ${1}
  ${24}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0650'",
        "contrat salarié . mise à la retraite": "non",
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
  ${3}
  ${6}
  ${24}
`(
  "Pour une employée avec une anciénneté de $seniority lors d'un départ à la retraite, on n'attend pas de notification",
  ({ seniority }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . convention collective": "'IDCC0650'",
      "contrat salarié . mise à la retraite": "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const notifications = engine.getNotifications();

    expect(notifications).toHaveLength(0);
  }
);

test.each`
  seniority
  ${3}
  ${6}
  ${24}
`(
  "Pour une employée avec une anciénneté de $seniority lors d'une mise à la retraite, on n'attend pas de notification",
  ({ seniority }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . convention collective": "'IDCC0650'",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    const notifications = engine.getNotifications();

    expect(notifications).toHaveLength(0);
  }
);
