import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { QuestionOuiNon } from "../../../../common";
import { CatPro573 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "573"
);

describe("Formules pour la CC 573", () => {
  describe("Autres", () => {
    test.each`
      age   | category            | typeLicenciement      | cadreAuMoins15ans     | seniority | expectedFormula                             | expectedExplanations
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.91}   | ${""}                                       | ${[]}
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${1}      | ${"1 / 5 * Sref * A1"}                      | ${["A1 : Années d'ancienneté au total (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${15}     | ${"1 / 5 * Sref * A1 + 2 / 15 * Sref * A2"} | ${["A1 : Années d'ancienneté au total (15 ans)", "A2 : Années d'ancienneté au delà de 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "ancienneté: $seniority an, catégorie $category => $expectedCompensation €",
      ({ seniority, expectedFormula, expectedExplanations, category }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });

        const result = engine.getFormule();

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Agents", () => {
    test.each`
      age   | category            | typeLicenciement      | cadreAuMoins15ans     | seniority | expectedFormula                                                                                        | expectedExplanations
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.5}    | ${""}                                                                                                  | ${[]}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.99}   | ${""}                                                                                                  | ${[]}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${1}      | ${"2 / 10 * Sref * A1"}                                                                                | ${["A1 : Années d'ancienneté au total (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${15}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                           | ${["A1 : Années d'ancienneté au total (15 ans)", "A2 : Années d'ancienneté au delà de 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${1}      | ${"2 / 10 * Sref * A1"}                                                                                | ${["A1 : Années d'ancienneté au total (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${14}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                           | ${["A1 : Années d'ancienneté au total (14 ans)", "A2 : Années d'ancienneté au delà de 10 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${57} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${14}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                           | ${["A1 : Années d'ancienneté au total (14 ans)", "A2 : Années d'ancienneté au delà de 10 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${56} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${25}     | ${"6 * Sref"}                                                                                          | ${["Sref : Salaire de référence (1000 €)"]}
      ${55} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${15}     | ${"2 / 10 * Sref * A1 + 3 / 10 * Sref * A2 + 20% * (2 / 10 * Sref * A1) + 20% * (3 / 10 * Sref * A2)"} | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche à partir de 10 ans (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "ancienneté: $seniority an, catégorie $category, age $age, typeLicenciement $typeLicenciement => $expectedCompensation €",
      ({
        seniority,
        typeLicenciement,
        expectedFormula,
        expectedExplanations,
        category,
        age,
      }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age": age,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question": `'${typeLicenciement}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });

        const result = engine.getFormule();

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Cadres", () => {
    test.each`
      age   | category            | typeLicenciement      | cadreAuMoins15ans     | seniority | expectedFormula                                                                                                                                          | expectedExplanations
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.99}   | ${""}                                                                                                                                                    | ${[]}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${1}      | ${"2 / 10 * Sref * A"}                                                                                                                                   | ${["A : Années d'ancienneté au total (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${4}      | ${"2 / 10 * Sref * A"}                                                                                                                                   | ${["A : Années d'ancienneté au total (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${5}      | ${"2 / 10 * Sref * A"}                                                                                                                                   | ${["A : Années d'ancienneté au total (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${"3 / 10 * Sref * A1"}                                                                                                                                  | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2"}                                                                                                             | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                                        | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${"3 / 10 * Sref * A1"}                                                                                                                                  | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2"}                                                                                                             | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 + 15% * (3 / 10 * Sref * A1) + 15% * (4 / 10 * Sref * A2) + 15% * (5 / 10 * Sref * A3)"} | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.non} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                                        | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${"3 / 10 * Sref * A1"}                                                                                                                                  | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2"}                                                                                                             | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 + 20% * (3 / 10 * Sref * A1) + 20% * (4 / 10 * Sref * A2) + 20% * (5 / 10 * Sref * A3)"} | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.non} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                                        | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "ancienneté: $seniority an, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        expectedFormula,
        expectedExplanations,
        category,
        cadreAuMoins15ans,
        age,
      }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans . age": age,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans question": `'${cadreAuMoins15ans}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });

        const result = engine.getFormule();

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
