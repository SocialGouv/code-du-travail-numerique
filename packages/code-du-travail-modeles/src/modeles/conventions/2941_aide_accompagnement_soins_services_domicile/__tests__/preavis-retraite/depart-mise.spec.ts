import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

test.each`
  seniority | expectedNotice | expectedUnit
  ${1}      | ${0}           | ${"semaines"}
  ${6}      | ${1}           | ${"mois"}
  ${24}     | ${2}           | ${"mois"}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC2941'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);

    expect(engine.getNotifications()).toHaveLength(0);
  }
);

test.each`
  seniority | category          | expectedNotice | expectedUnit | expectedNotif
  ${1}      | ${"A, B, C ou D"} | ${1}           | ${"semaine"} | ${"1 semaine de date à date"}
  ${6}      | ${"A, B, C ou D"} | ${1}           | ${"mois"}    | ${"1 mois de date à date"}
  ${25}     | ${"A, B, C ou D"} | ${2}           | ${"mois"}    | ${"2 mois de date à date"}
  ${1}      | ${"E ou F"}       | ${1}           | ${"mois"}    | ${"1 mois de date à date"}
  ${6}      | ${"E ou F"}       | ${1}           | ${"mois"}    | ${"1 mois de date à date"}
  ${24}     | ${"E ou F"}       | ${2}           | ${"mois"}    | ${"2 mois de date à date"}
  ${25}     | ${"E ou F"}       | ${2}           | ${"mois"}    | ${"2 mois de date à date"}
  ${1}      | ${"G, H ou I"}    | ${2}           | ${"mois"}    | ${"2 mois de date à date"}
  ${6}      | ${"G, H ou I"}    | ${2}           | ${"mois"}    | ${"2 mois de date à date"}
  ${24}     | ${"G, H ou I"}    | ${4}           | ${"mois"}    | ${"4 mois de date à date"}
  ${25}     | ${"G, H ou I"}    | ${4}           | ${"mois"}    | ${"4 mois de date à date"}
`(
  "Pour un employé de category $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice, expectedUnit, expectedNotif }) => {
    const { result, missingArgs } = engine.setSituation(
      {
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC2941'",
        "contrat salarié . convention collective . bad . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      },
      "contrat salarié . préavis de retraite en jours"
    );
    const notifications = engine.getNotifications();

    expect(result.value).toEqual(expectedNotice);
    expect(result.unit).toEqual(expectedUnit);
    expect(missingArgs).toEqual([]);

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(expectedNotif);
  }
);

test("Pour un employé de category A, B, C ou D possédant 24 mois d'ancienneté, son préavis de mise à la retraite devrait être 2 mois mais il ne doit pas avoir de notif", () => {
  const { result, missingArgs } = engine.setSituation(
    {
      "contrat salarié . ancienneté": "24",
      "contrat salarié . convention collective": "'IDCC2941'",
      "contrat salarié . convention collective . bad . catégorie professionnelle":
        "'A, B, C ou D'",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    },
    "contrat salarié . préavis de retraite en jours"
  );
  const notifications = engine.getNotifications();

  expect(result.value).toEqual(2);
  expect(result.unit).toEqual("mois");
  expect(missingArgs).toEqual([]);

  expect(notifications).toHaveLength(0);
});
