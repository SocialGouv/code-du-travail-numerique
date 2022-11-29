import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { mergePreavisRetraiteModels } from "../../../../../internal/merger";
import { getNotifications, getReferences } from "../../../../common";

const engine = new Engine(mergePreavisRetraiteModels());

const ReferencesParticulierEmployeur = [
  {
    article: "Article 162-5",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942454?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942454",
  },
  {
    article: "Article 162-4-1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942452?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942452",
  },
];

const ReferencesAssistantsMaternels = [
  {
    article: "Article 120",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942318?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942318",
  },
];

const DepartRetraiteCcReferencesParticulierEmployeurs = [
  ...DepartRetraiteReferences,
  ...ReferencesParticulierEmployeur,
];

const DepartRetraiteCcReferencesAssistantsMaternels = [
  ...DepartRetraiteReferences,
  ...ReferencesAssistantsMaternels,
];

const MiseRetraiteCcReferencesParticulierEmployeurs = [
  ...MiseRetraiteReferences,
  ...ReferencesParticulierEmployeur,
];

const MiseRetraiteCcReferencesAssistantsMaternels: unknown[] = [];

type InputType = {
  category: string;
  seniority: number;
  expectedResult: number;
  expectedReferences: { article: string; url: string }[];
  expectedPeriod: "jour" | "mois";
};

describe("Préavis de retraite de la CC 3239", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      category                                           | seniority | expectedResult | expectedPeriod | expectedReferences
      ${"Salariés du particulier employeur"}             | ${2}      | ${7}           | ${"jour"}      | ${DepartRetraiteCcReferencesParticulierEmployeurs}
      ${"Salariés du particulier employeur"}             | ${6}      | ${1}           | ${"mois"}      | ${DepartRetraiteCcReferencesParticulierEmployeurs}
      ${"Salariés du particulier employeur"}             | ${12}     | ${1}           | ${"mois"}      | ${DepartRetraiteCcReferencesParticulierEmployeurs}
      ${"Salariés du particulier employeur"}             | ${24}     | ${2}           | ${"mois"}      | ${DepartRetraiteCcReferencesParticulierEmployeurs}
      ${"Assistants maternels du particulier employeur"} | ${2}      | ${8}           | ${"jour"}      | ${DepartRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${6}      | ${15}          | ${"jour"}      | ${DepartRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${12}     | ${1}           | ${"mois"}      | ${DepartRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${24}     | ${1}           | ${"mois"}      | ${DepartRetraiteCcReferencesAssistantsMaternels}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult $expectedPeriod",
      ({
        category,
        seniority,
        expectedResult,
        expectedReferences,
        expectedPeriod,
      }: InputType) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC3239'",
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual([expectedPeriod]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      category                                           | seniority | expectedResult | expectedPeriod | expectedReferences
      ${"Salariés du particulier employeur"}             | ${2}      | ${7}           | ${"jour"}      | ${MiseRetraiteCcReferencesParticulierEmployeurs}
      ${"Salariés du particulier employeur"}             | ${6}      | ${1}           | ${"mois"}      | ${MiseRetraiteCcReferencesParticulierEmployeurs}
      ${"Salariés du particulier employeur"}             | ${12}     | ${1}           | ${"mois"}      | ${MiseRetraiteCcReferencesParticulierEmployeurs}
      ${"Salariés du particulier employeur"}             | ${24}     | ${2}           | ${"mois"}      | ${MiseRetraiteCcReferencesParticulierEmployeurs}
      ${"Assistants maternels du particulier employeur"} | ${2}      | ${0}           | ${"mois"}      | ${MiseRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${6}      | ${0}           | ${"mois"}      | ${MiseRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${12}     | ${0}           | ${"mois"}      | ${MiseRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${24}     | ${0}           | ${"mois"}      | ${MiseRetraiteCcReferencesAssistantsMaternels}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({
        category,
        seniority,
        expectedResult,
        expectedReferences,
        expectedPeriod,
      }: InputType) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC3239'",
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual([expectedPeriod]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});

describe("Vérification des notifications", () => {
  test("Pour une assistante maternelle  en départ à la retraite, aucune notification ne doit s'afficher", () => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle": `'Assistants maternels du particulier employeur'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );
    expect(notifications).toHaveLength(0);
  });

  test("Pour une salariée du particulier employeur en mise à la retraite, aucune  notification doit s'afficher", () => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle": `'Salariés du particulier employeur'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
    );
    expect(notifications).toHaveLength(0);
  });

  test("Pour une salariée du particulier employeur en départ à la retraite, aucune  notification doit s'afficher", () => {
    const notifications = getNotifications(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle": `'Salariés du particulier employeur'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );
    expect(notifications).toHaveLength(0);
  });
});
