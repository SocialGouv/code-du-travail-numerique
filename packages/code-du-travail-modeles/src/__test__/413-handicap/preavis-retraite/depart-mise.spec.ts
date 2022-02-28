import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getNotifications } from "../../../utils";

const engine = new Engine(mergeModels());

test.each`
  seniority | category                                                 | expectedNotice
  ${3}      | ${"Non cadres"}                                          | ${1}
  ${6}      | ${"Non cadres"}                                          | ${1}
  ${24}     | ${"Non cadres"}                                          | ${1}
  ${3}      | ${"Autres cadres"}                                       | ${2}
  ${6}      | ${"Autres cadres"}                                       | ${1}
  ${23}     | ${"Autres cadres"}                                       | ${1}
  ${24}     | ${"Autres cadres"}                                       | ${2}
  ${3}      | ${"Directeurs de service"}                               | ${2}
  ${6}      | ${"Directeurs de service"}                               | ${1}
  ${24}     | ${"Directeurs de service"}                               | ${2}
  ${3}      | ${"Directeurs d'établissement"}                          | ${2}
  ${6}      | ${"Directeurs d'établissement"}                          | ${1}
  ${24}     | ${"Directeurs d'établissement"}                          | ${2}
  ${3}      | ${"Directeurs de centre de formation en travail social"} | ${2}
  ${6}      | ${"Directeurs de centre de formation en travail social"} | ${1}
  ${24}     | ${"Directeurs de centre de formation en travail social"} | ${2}
  ${3}      | ${"Directeurs généraux"}                                 | ${2}
  ${6}      | ${"Directeurs généraux"}                                 | ${1}
  ${24}     | ${"Directeurs généraux"}                                 | ${2}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de départ la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0413'",
        "contrat salarié . convention collective . établissement handicap . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category                                                 | expectedNotice
  ${3}      | ${"Non cadres"}                                          | ${1}
  ${6}      | ${"Non cadres"}                                          | ${1}
  ${24}     | ${"Non cadres"}                                          | ${2}
  ${3}      | ${"Autres cadres"}                                       | ${4}
  ${6}      | ${"Autres cadres"}                                       | ${4}
  ${23}     | ${"Autres cadres"}                                       | ${4}
  ${24}     | ${"Autres cadres"}                                       | ${4}
  ${3}      | ${"Directeurs de service"}                               | ${4}
  ${6}      | ${"Directeurs de service"}                               | ${4}
  ${24}     | ${"Directeurs de service"}                               | ${6}
  ${3}      | ${"Directeurs d'établissement"}                          | ${4}
  ${6}      | ${"Directeurs d'établissement"}                          | ${4}
  ${24}     | ${"Directeurs d'établissement"}                          | ${6}
  ${3}      | ${"Directeurs de centre de formation en travail social"} | ${4}
  ${6}      | ${"Directeurs de centre de formation en travail social"} | ${4}
  ${24}     | ${"Directeurs de centre de formation en travail social"} | ${6}
  ${3}      | ${"Directeurs généraux"}                                 | ${4}
  ${6}      | ${"Directeurs généraux"}                                 | ${4}
  ${24}     | ${"Directeurs généraux"}                                 | ${6}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, son préavis de mise à la retraite devrait être $expectedNotice mois",
  ({ seniority, category, expectedNotice }) => {
    const result = engine
      .setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0413'",
        "contrat salarié . convention collective . établissement handicap . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
      .evaluate("contrat salarié . préavis de retraite");

    expect(result.nodeValue).toEqual(expectedNotice);
    expect(result.unit?.numerators).toEqual(["mois"]);
    expect(result.missingVariables).toEqual({});
  }
);

test.each`
  seniority | category
  ${3}      | ${"Non cadres"}
  ${6}      | ${"Non cadres"}
  ${24}     | ${"Non cadres"}
  ${3}      | ${"Autres cadres"}
  ${6}      | ${"Autres cadres"}
  ${23}     | ${"Autres cadres"}
  ${24}     | ${"Autres cadres"}
  ${3}      | ${"Directeurs de service"}
  ${6}      | ${"Directeurs de service"}
  ${24}     | ${"Directeurs de service"}
  ${3}      | ${"Directeurs d'établissement"}
  ${6}      | ${"Directeurs d'établissement"}
  ${24}     | ${"Directeurs d'établissement"}
  ${3}      | ${"Directeurs de centre de formation en travail social"}
  ${6}      | ${"Directeurs de centre de formation en travail social"}
  ${24}     | ${"Directeurs de centre de formation en travail social"}
  ${3}      | ${"Directeurs généraux"}
  ${6}      | ${"Directeurs généraux"}
  ${24}     | ${"Directeurs généraux"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, on attend une notification",
  ({ seniority, category }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0413'",
        "contrat salarié . convention collective . établissement handicap . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
    );

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(
      `Attention : L'article de la convention collective ou la convention collective saisie n’a pas été étendue au niveau national. Par conséquent, pour que ce résultat soit applicable à votre situation, il faut que l’employeur ait adhéré à l’organisation patronale signataire de cette convention. Sans cette adhésion, l'employeur n'a pas l'obligation d'appliquer les règles de la convention mais il applique le préavis prévu par le code du travail.`
    );
  }
);

test.each`
  seniority | category
  ${3}      | ${"Non cadres"}
  ${6}      | ${"Non cadres"}
  ${24}     | ${"Non cadres"}
  ${3}      | ${"Autres cadres"}
  ${6}      | ${"Autres cadres"}
  ${23}     | ${"Autres cadres"}
  ${24}     | ${"Autres cadres"}
  ${3}      | ${"Directeurs de service"}
  ${6}      | ${"Directeurs de service"}
  ${24}     | ${"Directeurs de service"}
  ${3}      | ${"Directeurs d'établissement"}
  ${6}      | ${"Directeurs d'établissement"}
  ${24}     | ${"Directeurs d'établissement"}
  ${3}      | ${"Directeurs de centre de formation en travail social"}
  ${6}      | ${"Directeurs de centre de formation en travail social"}
  ${24}     | ${"Directeurs de centre de formation en travail social"}
  ${3}      | ${"Directeurs généraux"}
  ${6}      | ${"Directeurs généraux"}
  ${24}     | ${"Directeurs généraux"}
`(
  "Pour un $category possédant $seniority mois d'ancienneté, on attend une notification",
  ({ seniority, category }) => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0413'",
        "contrat salarié . convention collective . établissement handicap . catégorie professionnelle": `'${category}'`,
        "contrat salarié . départ à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
    );

    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(
      `Attention : L'article de la convention collective ou la convention collective saisie n’a pas été étendue au niveau national. Par conséquent, pour que ce résultat soit applicable à votre situation, il faut que l’employeur ait adhéré à l’organisation patronale signataire de cette convention. Sans cette adhésion, l'employeur n'a pas l'obligation d'appliquer les règles de la convention mais il applique le préavis prévu par le code du travail.`
    );
  }
);
