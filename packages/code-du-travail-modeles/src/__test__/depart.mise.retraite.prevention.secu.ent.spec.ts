import Engine from "publicodes";
import { getNotifications } from "../utils/GetNotifications";
import { mergeModels } from "../internal/merger";

const engine = new Engine(mergeModels());

const NotificationMiseRetraite =
  "Le point de départ du préavis est fixé au lendemain du jour où l'employeur a reçu notification de la décision du salarié de rompre son contrat de travail. Exemple: Si le 6 mars 2020 l'employeur a été notifié du départ en retraite, le préavis à effectuer débutera le 7 mars 2020.";

test.each`
  seniority | category                                                           | expectedNotice
  ${1}      | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${6}      | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${1}
  ${24}     | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${1}      | ${"Agents de maîtrise"}                                            | ${2}
  ${6}      | ${"Agents de maîtrise"}                                            | ${1}
  ${24}     | ${"Agents de maîtrise"}                                            | ${2}
  ${1}      | ${"Cadres"}                                                        | ${3}
  ${6}      | ${"Cadres"}                                                        | ${1}
  ${24}     | ${"Cadres"}                                                        | ${2}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ à la retraite devrait être $expectedNotice $expectedNoticeUnit",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category                                                           | expectedNotice
  ${1}      | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${6}      | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${24}     | ${"Agents d'exploitation, employés administratifs et techniciens"} | ${2}
  ${1}      | ${"Agents de maîtrise"}                                            | ${2}
  ${6}      | ${"Agents de maîtrise"}                                            | ${2}
  ${24}     | ${"Agents de maîtrise"}                                            | ${2}
  ${1}      | ${"Cadres"}                                                        | ${3}
  ${6}      | ${"Cadres"}                                                        | ${3}
  ${24}     | ${"Cadres"}                                                        | ${3}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice $expectedNoticeUnit",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  category
  ${"Agents d'exploitation, employés administratifs et techniciens"}
  ${"Agents de maîtrise"}
  ${"Cadres"}
`(
  "Pour un $category possédant x mois d'ancienneté lors d'une mise à la retraite, on attend 1 notification",
  ({ category }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
      })
    );

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(NotificationMiseRetraite);
  }
);

test.each`
  category
  ${"Agents d'exploitation, employés administratifs et techniciens"}
  ${"Agents de maîtrise"}
  ${"Cadres"}
`(
  "Pour un $category possédant x mois d'ancienneté lors d'un départ à la retraite, on attend 0 notification",
  ({ category }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1351'",
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle": `'${category}'`,
      })
    );

    expect(notifications).toHaveLength(0);
  }
);

