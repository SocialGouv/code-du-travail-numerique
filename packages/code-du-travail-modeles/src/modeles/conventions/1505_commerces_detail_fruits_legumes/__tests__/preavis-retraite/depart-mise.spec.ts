import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { mergePreavisRetraiteModels } from "../../../../../internal/merger";
import { getNotifications, getReferences } from "../../../../common";

const ArticleCc = {
  article: "Article 23.3",
  url:
    "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562759#KALIARTI000043562759",
};

const DepartRetraiteCcReferences = [...DepartRetraiteReferences, ArticleCc];

const MiseRetraiteCCReferences = [...MiseRetraiteReferences, ArticleCc];

const engine = new Engine(mergePreavisRetraiteModels());

describe("Vérification juridique pour la CC 1505", () => {
  describe("Départ à la retraite", () => {
    test.each`
      seniority | expectedResult | expectedReferences            | category
      ${2}      | ${1}           | ${DepartRetraiteCcReferences} | ${"Employés (E1 à E7)"}
      ${7}      | ${1}           | ${DepartRetraiteCcReferences} | ${"Employés (E1 à E7)"}
      ${24}     | ${1}           | ${DepartRetraiteCcReferences} | ${"Employés (E1 à E7)"}
      ${32}     | ${1}           | ${DepartRetraiteCcReferences} | ${"Employés (E1 à E7)"}
      ${2}      | ${2}           | ${DepartRetraiteCcReferences} | ${"Agents de maîtrise (AM1 et AM2)"}
      ${7}      | ${1}           | ${DepartRetraiteCcReferences} | ${"Agents de maîtrise (AM1 et AM2)"}
      ${24}     | ${2}           | ${DepartRetraiteCcReferences} | ${"Agents de maîtrise (AM1 et AM2)"}
      ${32}     | ${2}           | ${DepartRetraiteCcReferences} | ${"Agents de maîtrise (AM1 et AM2)"}
      ${2}      | ${3}           | ${DepartRetraiteCcReferences} | ${"Cadres (C1 et C2)"}
      ${7}      | ${1}           | ${DepartRetraiteCcReferences} | ${"Cadres (C1 et C2)"}
      ${24}     | ${2}           | ${DepartRetraiteCcReferences} | ${"Cadres (C1 et C2)"}
      ${32}     | ${2}           | ${DepartRetraiteCcReferences} | ${"Cadres (C1 et C2)"}
    `(
      "Pour un $category disposant d'une ancienneté $seniority, son préavis devrait être $expectedResult mois",
      ({ expectedResult, seniority, category, expectedReferences }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1505'",
          "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Mise à la retraite", () => {
    test.each`
      seniority | expectedResult | expectedReferences          | category
      ${2}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Employés (E1 à E7)"}
      ${7}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Employés (E1 à E7)"}
      ${24}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Employés (E1 à E7)"}
      ${32}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Employés (E1 à E7)"}
      ${2}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Agents de maîtrise (AM1 et AM2)"}
      ${7}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Agents de maîtrise (AM1 et AM2)"}
      ${24}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Agents de maîtrise (AM1 et AM2)"}
      ${32}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Agents de maîtrise (AM1 et AM2)"}
      ${2}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Cadres (C1 et C2)"}
      ${7}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Cadres (C1 et C2)"}
      ${24}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Cadres (C1 et C2)"}
      ${32}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Cadres (C1 et C2)"}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, category, expectedResult, expectedReferences }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1505'",
          "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        });

        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Notifications", () => {
    const notification = [
      "Attention: L'article de la convention collective ou la convention collective saisie n’a pas été étendue au niveau national. Par conséquent, pour que ce résultat soit applicable à votre situation, il faut que l’employeur ait adhéré à l’organisation patronale signataire de cette convention. Sans cette adhésion, l'employeur n'a pas l'obligation d'appliquer les règles de la convention mais il applique le préavis prévu par le code du travail.",
    ];
    describe("Aucune notification à afficher", () => {
      test.each`
        seniority | category
        ${5}      | ${"Employés (E1 à E7)"}
        ${6}      | ${"Employés (E1 à E7)"}
        ${24}     | ${"Employés (E1 à E7)"}
        ${5}      | ${"Agents de maîtrise (AM1 et AM2)"}
        ${6}      | ${"Agents de maîtrise (AM1 et AM2)"}
        ${24}     | ${"Agents de maîtrise (AM1 et AM2)"}
      `(
        "Pour un $category possédant $seniority mois d'ancienneté en départ à la retraite, le nombre de notification a affiché est de $expectedNotification.length",
        ({ seniority, category }) => {
          const result = getNotifications(
            engine.setSituation({
              "contrat salarié . ancienneté": seniority,
              "contrat salarié . convention collective": "'IDCC1505'",
              "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle": `'${category}'`,
              "contrat salarié . départ à la retraite": "oui",
              "contrat salarié . travailleur handicapé": "non",
            })
          );

          expect(result).toHaveLength(0);
        }
      );
    });

    describe("Une notification à afficher", () => {
      test.each`
        seniority | category               | expectedNotification
        ${5}      | ${"Cadres (C1 et C2)"} | ${notification}
        ${6}      | ${"Cadres (C1 et C2)"} | ${notification}
        ${24}     | ${"Cadres (C1 et C2)"} | ${notification}
      `(
        "Pour un $category possédant $seniority mois d'ancienneté en départ à la retraite, le nombre de notification a affiché est de $expectedNotification.length",
        ({ seniority, category, expectedNotification }) => {
          const result = getNotifications(
            engine.setSituation({
              "contrat salarié . ancienneté": seniority,
              "contrat salarié . convention collective": "'IDCC1505'",
              "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle": `'${category}'`,
              "contrat salarié . départ à la retraite": "oui",
              "contrat salarié . travailleur handicapé": "non",
            })
          );

          expect(result).toHaveLength(expectedNotification.length);
          expect(result[0].description).toBe(expectedNotification[0]);
        }
      );
    });
  });
});
