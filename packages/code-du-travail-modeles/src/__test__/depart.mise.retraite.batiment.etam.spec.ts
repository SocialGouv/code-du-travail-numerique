import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getNotifications } from "../utils/GetNotifications";

const engine = new Engine(mergeModels());

test.each`
  seniority | expectedNotice
  ${3}      | ${3}
  ${6}      | ${3}
  ${24}     | ${3}
`(
  "Pour un employé dans la convention collective Bâtiment Etam possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice, expectedUnit }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . ancienneté": seniority,
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
  seniority | expectedNotice
  ${2}      | ${2}
  ${6}      | ${1}
  ${24}     | ${2}
`(
  "Pour un employé dans la convention collective Bâtiment Etam possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice mois",
  ({ seniority, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);
const AlertMise =
  "L’employeur doit notifier au salarié sa mise à la retraite par lettre recommandée avec accusé de réception. La date de première présentation de cette lettre fixe le point de départ du délai de préavis. Exemple: Si le salarié a reçu la lettre recommandée notifiant sa mise en retraite le 6 mars 2020, le préavis à effectuer débutera à cette même date.";
const AlertDepart =
  "Le salarié doit notifier à l’employeur son départ en retraite par une lettre recommandée avec accusé de réception. La date de première présentation de cette lettre fixe le point de départ du délai de préavis.  Exemple: Si le 6 mars 2020 l'employeur a reçu la lettre recommandée notifiant le départ en retraite, le préavis à effectuer débutera à cette même date.";
test.each`
  retirement  | alert
  ${"départ"} | ${AlertDepart}
  ${"mise"}   | ${AlertMise}
`(
  "Pour une mise à la retraite avec un contrat conclu après le 1er juillet 2019 et un group $group, on attend une notification",
  ({ retirement, alert }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . ancienneté": 3,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toEqual(alert);
  }
);
