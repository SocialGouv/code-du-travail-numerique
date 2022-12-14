import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getNotifications, getReferences } from "../../../../common";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";

const engine = new Engine(modeles as any);

const DepartRetraiteReferencesEmployes = [
  ...DepartRetraiteReferences,
  {
    article: "Article 32.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036832772/?idConteneur=KALICONT000005635630",
  },
  {
    article: "Article 30",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005857304?idConteneur=KALICONT000005635",
  },
];

const DepartRetraiteReferencesTechniciens = [
  ...DepartRetraiteReferences,
  {
    article: "Article 51.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036832767/?idConteneur=KALICONT000005635630",
  },
  {
    article: "Article 49",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023734748/?idConteneur=KALICONT000005635630",
  },
];

const DepartRetraiteReferencesCadres = [
  ...DepartRetraiteReferences,
  {
    article: "Article 70.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036832762/?idConteneur=KALICONT000005635630",
  },
  {
    article: "Article 68",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005857360/?idConteneur=KALICONT000005635630",
  },
];

const MiseRetraiteReferencesEmployes = [
  ...MiseRetraiteReferences,
  {
    article: "Article 32.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036832772/?idConteneur=KALICONT000005635630",
  },
  {
    article: "Article 30",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005857304?idConteneur=KALICONT000005635",
  },
];

const MiseRetraiteReferencesTechniciens = [
  ...MiseRetraiteReferences,
  {
    article: "Article 51.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036832767/?idConteneur=KALICONT000005635630",
  },
  {
    article: "Article 49",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023734748/?idConteneur=KALICONT000005635630",
  },
];

const MiseRetraiteReferencesCadres = [
  ...MiseRetraiteReferences,
  {
    article: "Article 70.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000036832762/?idConteneur=KALICONT000005635630",
  },
  {
    article: "Article 68",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005857360/?idConteneur=KALICONT000005635630",
  },
];

const NotificationDeMiseALaRetraite =
  "Le préavis démarre à partir du premier jour du mois suivant la notification par l'employeur de la mise à la retraite au salarié (ou la notification de l’accord par le salarié le cas échéant). Exemple : Si le 6 mars 2020 un employeur notifie au salarié sa mise à la retraite, le préavis à effectuer débutera le 1er avril 2020.";

const NotificationDeMiseALaRetraite2 =
  "Pour le préavis de mise à la retraite, la convention collective indique une durée minimale et maximale. Il convient donc de se reporter vers l'employeur ou son représentant (ex : service RH) pour déterminer la durée applicable au préavis.";

const NotificationDeDepartALaRetraite =
  "Le préavis démarre à partir du premier jour du mois suivant la notification par le salarié de sa demande de départ volontaire à la retraite. Exemple: Si le 6 mars 2020 un salarié notifie sa décision de partir à la retraite à son employeur, le préavis à effectuer débutera le 1er avril 2020.";

enum Category {
  employes = "Employés (coefficients 120 à 215 inclus)",
  cadres = "Cadres (à partir du coefficient 400)",
  techniciens = "Techniciens et agents de maitrise (coefficients 220 à 390)",
}

type InputType = {
  category: Category;
  seniority: number;
  expectedResult: number;
  expectedReferences: { article: string; url: string }[];
};

type MiseInputType = InputType & { maximumValue: number };

describe("Préavis de retraite de la CC 86", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      category                | seniority | expectedResult | expectedReferences
      ${Category.employes}    | ${2}      | ${1}           | ${DepartRetraiteReferencesEmployes}
      ${Category.employes}    | ${6}      | ${1}           | ${DepartRetraiteReferencesEmployes}
      ${Category.employes}    | ${24}     | ${2}           | ${DepartRetraiteReferencesEmployes}
      ${Category.techniciens} | ${2}      | ${2}           | ${DepartRetraiteReferencesTechniciens}
      ${Category.techniciens} | ${6}      | ${1}           | ${DepartRetraiteReferencesTechniciens}
      ${Category.techniciens} | ${24}     | ${2}           | ${DepartRetraiteReferencesTechniciens}
      ${Category.cadres}      | ${2}      | ${3}           | ${DepartRetraiteReferencesCadres}
      ${Category.cadres}      | ${6}      | ${1}           | ${DepartRetraiteReferencesCadres}
      ${Category.cadres}      | ${24}     | ${2}           | ${DepartRetraiteReferencesCadres}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({
        category,
        seniority,
        expectedResult,
        expectedReferences,
      }: InputType) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC0086'",
          "contrat salarié . convention collective . publicité française . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const maximumResult = situation.evaluate(
          "contrat salarié . préavis de retraite collective maximum"
        );
        const references = getReferences(situation);

        expect(maximumResult.nodeValue).toBe(false);
        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      category                | seniority | expectedResult | expectedReferences                   | maximumValue
      ${Category.employes}    | ${2}      | ${1}           | ${MiseRetraiteReferencesEmployes}    | ${3}
      ${Category.employes}    | ${6}      | ${1}           | ${MiseRetraiteReferencesEmployes}    | ${3}
      ${Category.employes}    | ${24}     | ${2}           | ${MiseRetraiteReferencesEmployes}    | ${3}
      ${Category.techniciens} | ${2}      | ${2}           | ${MiseRetraiteReferencesTechniciens} | ${4}
      ${Category.techniciens} | ${6}      | ${2}           | ${MiseRetraiteReferencesTechniciens} | ${4}
      ${Category.techniciens} | ${24}     | ${2}           | ${MiseRetraiteReferencesTechniciens} | ${4}
      ${Category.cadres}      | ${2}      | ${3}           | ${MiseRetraiteReferencesCadres}      | ${6}
      ${Category.cadres}      | ${6}      | ${3}           | ${MiseRetraiteReferencesCadres}      | ${6}
      ${Category.cadres}      | ${24}     | ${3}           | ${MiseRetraiteReferencesCadres}      | ${6}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({
        category,
        seniority,
        expectedResult,
        expectedReferences,
        maximumValue,
      }: MiseInputType) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC0086'",
          "contrat salarié . convention collective . publicité française . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);
        const maximumResult = situation.evaluate(
          "contrat salarié . préavis de retraite collective maximum"
        );

        expect(maximumResult.nodeValue).toBe(maximumValue);
        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});

describe("Vérification des notifications", () => {
  test("Pour un départ à la retraite, une notification doit s'afficher si son ancienneté est inférieur à 6 mois", () => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC0086'",
        "contrat salarié . convention collective . publicité française . catégorie professionnelle": `'${Category.employes}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );
    expect(notifications).toHaveLength(1);
    expect(notifications[0].description).toBe(NotificationDeDepartALaRetraite);
  });

  test("Pour un départ à la retraite, une notification doit s'afficher si son ancienneté est  supérieur à 6 mois", () => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 7,
        "contrat salarié . convention collective": "'IDCC0086'",
        "contrat salarié . convention collective . publicité française . catégorie professionnelle": `'${Category.employes}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );
    expect(notifications).toHaveLength(0);
  });

  test("Pour une  mise à la retraite, une notification doit s'afficher", () => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC0086'",
        "contrat salarié . convention collective . publicité française . catégorie professionnelle": `'${Category.employes}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
    );
    expect(notifications).toHaveLength(2);
    expect(notifications[0].description).toBe(NotificationDeMiseALaRetraite);
    expect(notifications[1].description).toBe(NotificationDeMiseALaRetraite2);
  });
});
