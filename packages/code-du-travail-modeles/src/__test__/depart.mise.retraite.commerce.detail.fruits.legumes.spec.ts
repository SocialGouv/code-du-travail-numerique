import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";
import { getNotifications } from "..";

const ArticleCc = {
  article: "Article 3.10.3",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005874375/?idConteneur=KALICONT000005635421",
};

const DepartRetraiteCcReferences = [...DepartRetraiteReferences, ArticleCc];

const MiseRetraiteCCReferences = [...MiseRetraiteReferences, ArticleCc];

const engine = new Engine(mergeModels());

describe("CC 1505", () => {
  describe("Départ à la retraite", () => {
    test.each`
      seniority | expectedResult | expectedReferences            | category
      ${2}      | ${1}           | ${DepartRetraiteCcReferences} | ${"Ouvriers, Employés (Niveaux N1 à N4)"}
      ${7}      | ${1}           | ${DepartRetraiteCcReferences} | ${"Ouvriers, Employés (Niveaux N1 à N4)"}
      ${24}     | ${1}           | ${DepartRetraiteCcReferences} | ${"Ouvriers, Employés (Niveaux N1 à N4)"}
      ${32}     | ${1}           | ${DepartRetraiteCcReferences} | ${"Ouvriers, Employés (Niveaux N1 à N4)"}
      ${2}      | ${2}           | ${DepartRetraiteCcReferences} | ${"Agents de maîtrise (Niveaux N5 et N6)"}
      ${7}      | ${1}           | ${DepartRetraiteCcReferences} | ${"Agents de maîtrise (Niveaux N5 et N6)"}
      ${24}     | ${2}           | ${DepartRetraiteCcReferences} | ${"Agents de maîtrise (Niveaux N5 et N6)"}
      ${32}     | ${2}           | ${DepartRetraiteCcReferences} | ${"Agents de maîtrise (Niveaux N5 et N6)"}
      ${2}      | ${3}           | ${DepartRetraiteCcReferences} | ${"Cadres (Niveaux N7 et N8)"}
      ${7}      | ${1}           | ${DepartRetraiteCcReferences} | ${"Cadres (Niveaux N7 et N8)"}
      ${24}     | ${2}           | ${DepartRetraiteCcReferences} | ${"Cadres (Niveaux N7 et N8)"}
      ${32}     | ${2}           | ${DepartRetraiteCcReferences} | ${"Cadres (Niveaux N7 et N8)"}
    `(
      "Pour un salarié de tel catégorie $category disposant d'une ancienneté $seniority, son préavis devrait être $expectedResult mois",
      ({ expectedResult, seniority, category, expectedReferences }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1505'",
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle": `'${category}'`,
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
      ${2}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Ouvriers, Employés (Niveaux N1 à N4)"}
      ${7}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Ouvriers, Employés (Niveaux N1 à N4)"}
      ${24}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Ouvriers, Employés (Niveaux N1 à N4)"}
      ${32}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Ouvriers, Employés (Niveaux N1 à N4)"}
      ${2}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Agents de maîtrise (Niveaux N5 et N6)"}
      ${7}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Agents de maîtrise (Niveaux N5 et N6)"}
      ${24}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Agents de maîtrise (Niveaux N5 et N6)"}
      ${32}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Agents de maîtrise (Niveaux N5 et N6)"}
      ${2}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Cadres (Niveaux N7 et N8)"}
      ${7}      | ${2}           | ${MiseRetraiteCCReferences} | ${"Cadres (Niveaux N7 et N8)"}
      ${24}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Cadres (Niveaux N7 et N8)"}
      ${32}     | ${2}           | ${MiseRetraiteCCReferences} | ${"Cadres (Niveaux N7 et N8)"}
    `(
      "Pour un salarié de tel $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, category, expectedResult, expectedReferences }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1505'",
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle": `'${category}'`,
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
    const notification =
      "Attention: L'article de la convention collective ou la convention collective saisie n’a pas été étendue au niveau national. Par conséquent, pour que ce résultat soit applicable à votre situation, il faut que l’employeur ait adhéré à l’organisation patronale signataire de cette convention. Sans cette adhésion, l'employeur n'a pas l'obligation d'appliquer les règles de la convention mais il applique le préavis prévu par le code du travail.";
    test.each`
      seniority | category                                   | expectedNotificationLength | expectedNotification
      ${5}      | ${"Ouvriers, Employés (Niveaux N1 à N4)"}  | ${0}                       | ${null}
      ${6}      | ${"Ouvriers, Employés (Niveaux N1 à N4)"}  | ${0}                       | ${null}
      ${24}     | ${"Ouvriers, Employés (Niveaux N1 à N4)"}  | ${0}                       | ${null}
      ${5}      | ${"Agents de maîtrise (Niveaux N5 et N6)"} | ${0}                       | ${null}
      ${6}      | ${"Agents de maîtrise (Niveaux N5 et N6)"} | ${0}                       | ${null}
      ${24}     | ${"Agents de maîtrise (Niveaux N5 et N6)"} | ${0}                       | ${null}
      ${5}      | ${"Cadres (Niveaux N7 et N8)"}             | ${1}                       | ${notification}
      ${6}      | ${"Cadres (Niveaux N7 et N8)"}             | ${1}                       | ${notification}
      ${24}     | ${"Cadres (Niveaux N7 et N8)"}             | ${1}                       | ${notification}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté en départ à la retraite, le nombre de notification a affiché est de $expectedNotificationLength",
      ({
        seniority,
        category,
        expectedNotificationLength,
        expectedNotification,
      }) => {
        const result = getNotifications(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC1505'",
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . départ à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
            "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle": `'${category}'`,
          })
        );

        expect(result).toHaveLength(expectedNotificationLength);
        if (result.length > 0)
          expect(result[0].description).toBe(expectedNotification);
      }
    );
  });
});
