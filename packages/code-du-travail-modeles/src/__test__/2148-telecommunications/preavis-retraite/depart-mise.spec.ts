import Engine from "publicodes";

import { getNotifications } from "../../..";
import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const ReferencesCc = [
  {
    article: "Article 4.4.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021550694/?idConteneur=KALICONT000005635557",
  },
  {
    article: "Article 4.4.1.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000022416125/?idConteneur=KALICONT000005635557",
  },
];

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  ...ReferencesCc,
];

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, ...ReferencesCc];

const NotificationMiseRetraiteAutre =
  "En cas de mise à la retraite, la durée du préavis des salariés hors classification est fixée dans le contrat de travail sans pouvoir être inférieure à 3 mois.";

const NotificationDepartRetraiteAutre =
  "La durée du préavis des salariés hors classification est fixée dans le contrat de travail sans pouvoir être inférieure à 3 mois.";
enum Category {
  ab = "A et B",
  cd = "C et D",
  efg = "E, F et G",
  autre = "Hors classification",
}

type InputType = {
  category: string;
  seniority: number;
  expectedResult: number;
};

describe("Préavis de retraite de la CC 2148", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      category          | seniority | expectedResult
      ${Category.ab}    | ${2}      | ${1}
      ${Category.ab}    | ${6}      | ${1}
      ${Category.ab}    | ${12}     | ${1}
      ${Category.ab}    | ${24}     | ${1}
      ${Category.ab}    | ${25}     | ${2}
      ${Category.cd}    | ${2}      | ${2}
      ${Category.cd}    | ${6}      | ${1}
      ${Category.cd}    | ${12}     | ${1}
      ${Category.cd}    | ${24}     | ${2}
      ${Category.cd}    | ${25}     | ${2}
      ${Category.efg}   | ${2}      | ${3}
      ${Category.efg}   | ${6}      | ${1}
      ${Category.efg}   | ${12}     | ${1}
      ${Category.efg}   | ${24}     | ${2}
      ${Category.efg}   | ${25}     | ${2}
      ${Category.autre} | ${2}      | ${3}
      ${Category.autre} | ${6}      | ${1}
      ${Category.autre} | ${12}     | ${1}
      ${Category.autre} | ${24}     | ${2}
      ${Category.autre} | ${25}     | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }: InputType) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC2148'",
          "contrat salarié . convention collective . télécommunications . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(DepartRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteCcReferences)
        );
      }
    );
  });

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      category          | seniority | expectedResult
      ${Category.ab}    | ${2}      | ${1}
      ${Category.ab}    | ${6}      | ${1}
      ${Category.ab}    | ${12}     | ${1}
      ${Category.ab}    | ${24}     | ${2}
      ${Category.ab}    | ${25}     | ${2}
      ${Category.cd}    | ${2}      | ${2}
      ${Category.cd}    | ${6}      | ${2}
      ${Category.cd}    | ${12}     | ${2}
      ${Category.cd}    | ${24}     | ${2}
      ${Category.cd}    | ${25}     | ${2}
      ${Category.efg}   | ${2}      | ${3}
      ${Category.efg}   | ${6}      | ${3}
      ${Category.efg}   | ${12}     | ${3}
      ${Category.efg}   | ${24}     | ${3}
      ${Category.efg}   | ${25}     | ${3}
      ${Category.autre} | ${2}      | ${3}
      ${Category.autre} | ${6}      | ${3}
      ${Category.autre} | ${12}     | ${3}
      ${Category.autre} | ${24}     | ${3}
      ${Category.autre} | ${25}     | ${3}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }: InputType) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC2148'",
          "contrat salarié . convention collective . télécommunications . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(MiseRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(MiseRetraiteCcReferences)
        );
      }
    );
  });
  describe("Vérification des notifications", () => {
    test("Pour une salarié hors classifié, en cas de mise à la retraite, une notification doit s'afficher", () => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . ancienneté": 5,
          "contrat salarié . convention collective": "'IDCC2148'",
          "contrat salarié . convention collective . télécommunications . catégorie professionnelle": `'${Category.autre}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        })
      );
      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(NotificationMiseRetraiteAutre);
    });

    test.each`
      category
      ${Category.ab}
      ${Category.cd}
      ${Category.efg}
    `(
      "Pour un $category en mise à la retraite, aucune notification doit s'afficher",
      ({ category }) => {
        const notifications = getNotifications(
          engine.setSituation({
            "contrat salarié . ancienneté": 5,
            "contrat salarié . convention collective": "'IDCC2148'",
            "contrat salarié . convention collective . télécommunications . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
            "préavis de retraite": "oui",
          })
        );
        expect(notifications).toHaveLength(0);
      }
    );

    test("Pour une salarié hors classifié avec une ancienneté < 6 mois en cas de départ à la retraite, une notification doit s'afficher", () => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . ancienneté": 5,
          "contrat salarié . convention collective": "'IDCC2148'",
          "contrat salarié . convention collective . télécommunications . catégorie professionnelle": `'${Category.autre}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        })
      );
      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(
        NotificationDepartRetraiteAutre
      );
    });

    test("Pour une salarié hors classifié avec une ancienneté > 6 mois en cas de départ à la retraite, aucune notification doit s'afficher", () => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . ancienneté": 6,
          "contrat salarié . convention collective": "'IDCC2148'",
          "contrat salarié . convention collective . télécommunications . catégorie professionnelle": `'${Category.autre}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        })
      );
      expect(notifications).toHaveLength(0);
    });

    test.each`
      category
      ${Category.ab}
      ${Category.cd}
      ${Category.efg}
    `(
      "Pour un $category en départ à la retraite, aucune notification doit s'afficher",
      ({ category }) => {
        const notifications = getNotifications(
          engine.setSituation({
            "contrat salarié . ancienneté": 5,
            "contrat salarié . convention collective": "'IDCC2148'",
            "contrat salarié . convention collective . télécommunications . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
            "préavis de retraite": "oui",
          })
        );
        expect(notifications).toHaveLength(0);
      }
    );
  });
});
