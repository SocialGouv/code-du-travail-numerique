import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../utils/GetNotifications";

const engine = new Engine(mergeModels());

test.each`
  seniority | expectedNotice
  ${3}      | ${1}
  ${6}      | ${1}
  ${24}     | ${2}
`(
  "Pour un employé possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0650'",
        "contrat salarié . mise à la retraite": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
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
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0650'",
        "contrat salarié . mise à la retraite": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority
  ${3}
  ${6}
  ${24}
`(
  "Pour une employée avec une anciénneté de $seniority lors d'un départ à la retraite, on attend une notification",
  ({ seniority, expectedNotification }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0650'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
      })
    );

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toEqual(
      "L'ancienneté se calcule à la date de notification du départ à la retraite."
    );
  }
);

test.each`
  seniority
  ${3}
  ${6}
  ${24}
`(
  "Pour une employée avec une anciénneté de $seniority lors d'une mise à la retraite, on attend une notification",
  ({ seniority, expectedNotification }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0650'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
      })
    );

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toEqual(
      "L'ancienneté se calcule à la date de notification du départ à la retraite."
    );
  }
);
