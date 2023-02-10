import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CatPro1486, TypeLicenciement1486 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1486"
);

describe("Formule indemnité licenciement - 1486", () => {
  describe("Pour un Licenciement en raison d'un refus de respecter une clause de mobilité", () => {
    test.each`
      seniority | expectedFormula                            | expectedExplanations
      ${0}      | ${""}                                      | ${[]}
      ${8 / 12} | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
      ${8}      | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (8 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${12}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans, catégorie $category",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1486'",
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement": `'${TypeLicenciement1486.refus}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });

        const result = engine.getFormule();

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Pour un Autre Licenciement", () => {
    test.each`
      category                    | seniority | expectedFormula      | expectedExplanations
      ${CatPro1486.ingeCadre}     | ${0}      | ${""}                | ${[]}
      ${CatPro1486.ingeCadre}     | ${1.99}   | ${""}                | ${[]}
      ${CatPro1486.ingeCadre}     | ${2}      | ${"1/3 * Sref * A"}  | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.ingeCadre}     | ${19}     | ${"1/3 * Sref * A"}  | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.ingeCadre}     | ${99}     | ${"12 * Sref"}       | ${["Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.chargeEnquete} | ${0}      | ${""}                | ${[]}
      ${CatPro1486.chargeEnquete} | ${1.99}   | ${""}                | ${[]}
      ${CatPro1486.chargeEnquete} | ${2}      | ${"1/5 * Sref * A"}  | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.chargeEnquete} | ${19}     | ${"1/5 * Sref * A"}  | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.chargeEnquete} | ${99}     | ${"7 * Sref"}        | ${["Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.etam}          | ${0}      | ${""}                | ${[]}
      ${CatPro1486.etam}          | ${1.99}   | ${""}                | ${[]}
      ${CatPro1486.etam}          | ${2}      | ${"0.25 * Sref * A"} | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.etam}          | ${19}     | ${"0.25 * Sref * A"} | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.etam}          | ${20}     | ${"0.30 * Sref * A"} | ${["A : Ancienneté totale (20 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.etam}          | ${22}     | ${"0.30 * Sref * A"} | ${["A : Ancienneté totale (22 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${CatPro1486.etam}          | ${99}     | ${"10 * Sref"}       | ${["Sref : Salaire de référence (1000 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans, catégorie $category",
      ({ category, seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1486'",
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement": `'${TypeLicenciement1486.autre}'`,
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement . autres . catégorie professionnelle": `'${category}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
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
