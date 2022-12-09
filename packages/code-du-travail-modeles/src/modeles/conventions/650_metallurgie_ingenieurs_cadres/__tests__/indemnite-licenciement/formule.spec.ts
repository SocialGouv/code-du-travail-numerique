import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getFormule } from "../../../../common";

describe("Formule pour l'indemnité conventionnel de licenciement pour la CC 650", () => {
  const engine = new Engine(mergeIndemniteLicenciementModels());

  describe("Cas standard", () => {
    test.each`
      age   | seniority | expectedFormula                                         | expectedExplanations
      ${35} | ${0.91}   | ${""}                                                   | ${[]}
      ${35} | ${1}      | ${"(1 / 5 * Sref * A1)"}                                | ${["A1 : Ancienneté de 1 ans à 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${35} | ${7.91}   | ${"(1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)"}          | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${35} | ${8}      | ${"(1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)"}          | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${35} | ${19}     | ${"(1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)"}          | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${54} | ${0.91}   | ${""}                                                   | ${[]}
      ${54} | ${1}      | ${"(1 / 5 * Sref * A1)"}                                | ${["A1 : Ancienneté de 1 ans à 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${54} | ${7.91}   | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 1.2"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${54} | ${8}      | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 1.2"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${54} | ${19}     | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 1.2"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${59} | ${0.91}   | ${""}                                                   | ${[]}
      ${59} | ${1}      | ${"(1 / 5 * Sref * A1)"}                                | ${["A1 : Ancienneté de 1 ans à 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${59} | ${7.91}   | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 1.3"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${59} | ${8}      | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 1.3"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${59} | ${19}     | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 1.3"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${61} | ${0.91}   | ${""}                                                   | ${[]}
      ${61} | ${1}      | ${"(1 / 5 * Sref * A1) * 0.95"}                         | ${["A1 : Ancienneté de 1 ans à 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${61} | ${7.91}   | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.95"} | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${61} | ${8}      | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.95"} | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${61} | ${19}     | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.95"} | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${62} | ${0.91}   | ${""}                                                   | ${[]}
      ${62} | ${1}      | ${"(1 / 5 * Sref * A1) * 0.9"}                          | ${["A1 : Ancienneté de 1 ans à 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${62} | ${7.91}   | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.9"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${62} | ${8}      | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.9"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${62} | ${19}     | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.9"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${63} | ${0.91}   | ${""}                                                   | ${[]}
      ${63} | ${1}      | ${"(1 / 5 * Sref * A1) * 0.8"}                          | ${["A1 : Ancienneté de 1 ans à 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${63} | ${7.91}   | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.8"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${63} | ${8}      | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.8"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${63} | ${19}     | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.8"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${64} | ${0.91}   | ${""}                                                   | ${[]}
      ${64} | ${1}      | ${"(1 / 5 * Sref * A1) * 0.6"}                          | ${["A1 : Ancienneté de 1 ans à 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${64} | ${7.91}   | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.6"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${64} | ${8}      | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.6"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${64} | ${19}     | ${"((1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)) * 0.6"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "$#) ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, age, expectedFormula, expectedExplanations }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age 55 ans":
            "'Non'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
            "'Oui'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        });

        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
