import Engine from "publicodes";

import { getNotifications } from "../../../index";
import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

test.each`
  seniority | expectedNotice
  ${1}      | ${0}
  ${6}      | ${1}
  ${24}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const situation = engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . convention collective": "'IDCC2941'",
      "contrat salarié . mise à la retraite": "non",
      "contrat salarié . travailleur handicapé": "non",
      "préavis de retraite": "oui",
    });
    const result = situation.evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});

    expect(getNotifications(situation)).toHaveLength(0);
  }
);

test.each`
  seniority | category          | expectedNotice | expectedUnit | expectedNotif
  ${1}      | ${"A, B, C ou D"} | ${7}           | ${"jour"}    | ${"1 semaine de date à date"}
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
    const situation = engine.setSituation({
      "contrat salarié . ancienneté": seniority,
      "contrat salarié . convention collective": "'IDCC2941'",
      "contrat salarié . convention collective . bad . catégorie professionnelle": `'${category}'`,
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
      "préavis de retraite": "oui",
    });
    const result = situation.evaluate("contrat salarié . préavis de retraite");
    const notifications = getNotifications(situation);

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual([expectedUnit]);
    expect(result.missingVariables).toEqual({});

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(expectedNotif);
  }
);

test("Pour un employé de category A, B, C ou D possédant 24 mois d'ancienneté, son préavis de mise à la retraite devrait être 2 mois mais il ne doit pas avoir de notif", () => {
  const situation = engine.setSituation({
    "contrat salarié . ancienneté": 24,
    "contrat salarié . convention collective": "'IDCC2941'",
    "contrat salarié . convention collective . bad . catégorie professionnelle":
      "'A, B, C ou D'",
    "contrat salarié . mise à la retraite": "oui",
    "contrat salarié . travailleur handicapé": "non",
    "préavis de retraite": "oui",
  });
  const result = situation.evaluate("contrat salarié . préavis de retraite");
  const notifications = getNotifications(situation);

  expect(result.nodeValue).toEqual(2);
  expect(result.unit?.numerators).toEqual(["mois"]);
  expect(result.missingVariables).toEqual({});

  expect(notifications).toHaveLength(0);
});
