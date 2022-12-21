import { getFormule, QuestionOuiNon } from "../../../../common";
import { CatPro573 } from "../../salary";

describe("Formule indemnité licenciement - 573", () => {
  test.each`
    age   | category            | licenciementEco       | cadreAuMoins15ans     | seniority | expectedFormula                                                                                                                          | expectedExplanations
    ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.91}   | ${""}                                                                                                                                    | ${[]}
    ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${1}      | ${"1 / 5 * Sref * A"}                                                                                                                    | ${["A : Années d'ancienneté au total (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${15}     | ${"1 / 5 * Sref * A1 + 2 / 15 * Sref * A2"}                                                                                              | ${["A1 : Années d'ancienneté au total (15 ans)", "A2 : Années d'ancienneté au delà de 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.5}    | ${""}                                                                                                                                    | ${[]}
    ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.99}   | ${""}                                                                                                                                    | ${[]}
    ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${1}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${["A : Années d'ancienneté au total (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${15}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                                                             | ${["A1 : Années d'ancienneté au total (15 ans)", "A2 : Années d'ancienneté au delà de 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${1}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${["A : Années d'ancienneté au total (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${14}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                                                             | ${["A1 : Années d'ancienneté au total (14 ans)", "A2 : Années d'ancienneté au delà de 10 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${57} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${14}     | ${"2 / 10 * Sref * A1 + 2 / 15 * Sref * A2"}                                                                                             | ${["A1 : Années d'ancienneté au total (14 ans)", "A2 : Années d'ancienneté au delà de 10 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${56} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${25}     | ${"2 / 10 * Sref * A1 + 3 / 10 * Sref * A2 + 20% (2 / 10 * Sref * A1 + 3 / 10 * Sref)"}                                                  | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche à partir de 10 ans (16 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${55} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${15}     | ${"2 / 10 * Sref * A1 + 3 / 10 * Sref * A2 + 20% (2 / 10 * Sref * A1 + 3 / 10 * Sref)"}                                                  | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche à partir de 10 ans (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.99}   | ${""}                                                                                                                                    | ${[]}
    ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${1}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${["A : Années d'ancienneté au total (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${4}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${["A : Années d'ancienneté au total (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${5}      | ${"2 / 10 * Sref * A"}                                                                                                                   | ${["A : Années d'ancienneté au total (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${"3 / 10 * Sref * A1"}                                                                                                                  | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2"}                                                                                             | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${"3 / 10 * Sref * A1"}                                                                                                                  | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2"}                                                                                             | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 + 15% ( 3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 )"} | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.non} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${"3 / 10 * Sref * A1"}                                                                                                                  | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2"}                                                                                             | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 + 20% ( 3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 )"} | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.non} | ${23}     | ${"3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3"}                                                                        | ${["A1 : Années de présence dans la tranche de 0 à 9 ans inclus (9 ans)", "A2 : Années de présence dans la tranche de 10 à 19 ans inclus (10 ans)", "A3 : Années de présence dans la tranche à partir de 20 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans, catégorie $category, licenciementEco $licenciementEco et ancienneté non cadre : $seniorityNonCadre",
    ({
      category,
      seniority,
      licenciementEco,
      expectedFormula,
      expectedExplanations,
      age,
      cadreAuMoins15ans,
    }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1596'",
        "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . age": age,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      });

      const result = getFormule(situation);

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
