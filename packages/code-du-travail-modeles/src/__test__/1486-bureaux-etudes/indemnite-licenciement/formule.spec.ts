import {
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";
import {
  CatPro1486,
  TypeLicenciement1486,
} from "../../../plugins/salaire-reference/1486_bureaux_etudes_techniques";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 1486", () => {
  test.each`
    category                    | typeLicenciement              | seniority | expectedFormula                              | expectedExplanations
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${0}      | ${""}                                        | ${[]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${8 / 12} | ${"1 / 4 * Sref * A"}                        | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${8}      | ${"1 / 4 * Sref * A"}                        | ${["A : Ancienneté totale (8 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${12}     | ${"(1 / 4 * Sref * A1 + 1 / 3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${0}      | ${""}                                        | ${[]}
    ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${1.99}   | ${""}                                        | ${[]}
    ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${2}      | ${"1/3 * Sref * A"}                          | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${19}     | ${"1/3 * Sref * A"}                          | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${0}      | ${""}                                        | ${[]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${1.99}   | ${""}                                        | ${[]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${2}      | ${"1/5 * Sref * A"}                          | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${19}     | ${"1/5 * Sref * A"}                          | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${0}      | ${""}                                        | ${[]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${1.99}   | ${""}                                        | ${[]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${2}      | ${"0.25 * Sref * A"}                         | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${19}     | ${"0.25 * Sref * A"}                         | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${20}     | ${"0.30 * Sref * A"}                         | ${["A : Ancienneté totale (20 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${22}     | ${"0.30 * Sref * A"}                         | ${["A : Ancienneté totale (22 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans, catégorie $category, type de licenciement $typeLicenciement et ancienneté non cadre : $seniorityNonCadre",
    ({
      category,
      seniority,
      typeLicenciement,
      expectedFormula,
      expectedExplanations,
    }) => {
      const formula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1486
      );

      const result = formula.computeFormula({
        category,
        refSalary: 1000,
        seniority,
        typeLicenciement,
      });

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
