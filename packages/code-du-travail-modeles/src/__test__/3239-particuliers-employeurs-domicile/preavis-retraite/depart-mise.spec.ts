import Engine from "publicodes";

import { getNotifications } from "../../..";
import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const ReferencesParticulierEmployeur = [
  {
    article: "Article 162-5",
    url: "",
  },
  {
    article: "Article 162-4-1",
    url: "",
  },
];

const ReferencesAssistantsMaternels = [
  {
    article: "Article 120",
    url: "",
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

const MiseRetraiteCcReferencesAssistantsMaternels = [
  ...MiseRetraiteReferences,
  ...ReferencesAssistantsMaternels,
];

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
      ${"Assistants maternels du particulier employeur"} | ${2}      | ${8}           | ${"jour"}      | ${MiseRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${6}      | ${1}           | ${"mois"}      | ${MiseRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${12}     | ${1}           | ${"mois"}      | ${MiseRetraiteCcReferencesAssistantsMaternels}
      ${"Assistants maternels du particulier employeur"} | ${24}     | ${2}           | ${"mois"}      | ${MiseRetraiteCcReferencesAssistantsMaternels}
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
  test.each`
    category                                           | expectedNotification
    ${"Salariés du particulier employeur"}             | ${'Si la lettre de départ à la retraite a été présentée avant le 01/01/2022, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/21 c’est la convention collective "Salariés du particulier employeur (IDCC 2111)" qui s’appliquait. Celle-ci a fusionné avec la convention collective “Salariés du particulier employeur (IDCC 2111)” pour former la convention collective “Particuliers employeurs et emploi à domicile (IDCC 3239)” applicable à partir du 01/01/2022.'}
    ${"Assistants maternels du particulier employeur"} | ${'Si la lettre de départ à la retraite a été présentée avant le 01/01/2022, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/21 c’est la convention collective "Assistants maternels du particulier employeur (IDCC 2395)" qui s’appliquait. Celle-ci a fusionné avec la convention collective “Salariés du particulier employeur (IDCC 2111)” pour former la convention collective “Particuliers employeurs et emploi à domicile (IDCC 3239)” applicable à partir du 01/01/2022.'}
  `(
    "Pour un $category en départ à la retraite, une notification doit s'afficher",
    ({ category, expectedNotification }) => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . ancienneté": 5,
          "contrat salarié . convention collective": "'IDCC3239'",
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        })
      );
      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(expectedNotification);
    }
  );

  test.each`
    category                                           | expectedNotification
    ${"Salariés du particulier employeur"}             | ${'Si la lettre de mise à la retraite a été présentée avant le 01/01/2022, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/21 c’est la convention collective "Salariés du particulier employeur (IDCC 2111)" qui s’appliquait. Celle-ci a fusionné avec la convention collective “Salariés du particulier employeur (IDCC 2111)” pour former la convention collective “Particuliers employeurs et emploi à domicile (IDCC 3239)” applicable à partir du 01/01/2022.'}
    ${"Assistants maternels du particulier employeur"} | ${'Si la lettre de mise à la retraite a été présentée avant le 01/01/2022, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/21 c’est la convention collective "Assistants maternels du particulier employeur (IDCC 2395)" qui s’appliquait. Celle-ci a fusionné avec la convention collective “Salariés du particulier employeur (IDCC 2111)” pour former la convention collective “Particuliers employeurs et emploi à domicile (IDCC 3239)” applicable à partir du 01/01/2022.'}
  `(
    "Pour un salarié en mise à la retraite, une notification doit s'afficher",
    ({ category, expectedNotification }) => {
      const notifications = getNotifications(
        engine.setSituation({
          "contrat salarié . ancienneté": 5,
          "contrat salarié . convention collective": "'IDCC3239'",
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        })
      );
      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toBe(expectedNotification);
    }
  );
});
