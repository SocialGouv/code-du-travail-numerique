import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("Formule pour l'indemnité conventionnel de licenciement pour la CC 650", () => {
  const formula = new FormuleFactory().create(
    SupportedCcIndemniteLicenciement.IDCC650
  );
  if (!formula) throw new Error("Formula should be defined");
  describe("Cas standard", () => {
    test.each`
      age   | seniority | expectedFormula                                           | expectedExplanations
      ${35} | ${0.91}   | ${""}                                                     | ${[]}
      ${35} | ${1}      | ${"1 / 5 * Sref * A"}                                     | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${35} | ${7.91}   | ${"(1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)"}            | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${35} | ${8}      | ${"(1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)"}            | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${35} | ${19}     | ${"(1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)"}            | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${54} | ${0.91}   | ${""}                                                     | ${[]}
      ${54} | ${1}      | ${"1 / 5 * Sref * A"}                                     | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${54} | ${7.91}   | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 1.2"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${54} | ${8}      | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 1.2"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${54} | ${19}     | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 1.2"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${59} | ${0.91}   | ${""}                                                     | ${[]}
      ${59} | ${1}      | ${"1 / 5 * Sref * A"}                                     | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${59} | ${7.91}   | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 1.3"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${59} | ${8}      | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 1.3"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${59} | ${19}     | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 1.3"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${61} | ${0.91}   | ${""}                                                     | ${[]}
      ${61} | ${1}      | ${"[ 1 / 5 * Sref * A ] * 0.95"}                          | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${61} | ${7.91}   | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.95"} | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${61} | ${8}      | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.95"} | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${61} | ${19}     | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.95"} | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${62} | ${0.91}   | ${""}                                                     | ${[]}
      ${62} | ${1}      | ${"[ 1 / 5 * Sref * A ] * 0.9"}                           | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${62} | ${7.91}   | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.9"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${62} | ${8}      | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.9"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${62} | ${19}     | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.9"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${63} | ${0.91}   | ${""}                                                     | ${[]}
      ${63} | ${1}      | ${"[ 1 / 5 * Sref * A ] * 0.8"}                           | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${63} | ${7.91}   | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.8"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${63} | ${8}      | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.8"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${63} | ${19}     | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.8"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${64} | ${0.91}   | ${""}                                                     | ${[]}
      ${64} | ${1}      | ${"[ 1 / 5 * Sref * A ] * 0.6"}                           | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${64} | ${7.91}   | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.6"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (0.91 an)", "Sref : Salaire de référence (1000 €)"]}
      ${64} | ${8}      | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.6"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${64} | ${19}     | ${"[ (1 / 5 * Sref * A1) + (3 / 5 * Sref * A2) ] * 0.6"}  | ${["A1 : Ancienneté de 1 ans à 7 ans (7 ans)", "A2 : Ancienneté au delà de 7 ans (12 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "$#) ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, age, expectedFormula, expectedExplanations }) => {
        const result = formula.computeFormula({
          age,
          refSalary: 1000,
          seniority,
        });

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
