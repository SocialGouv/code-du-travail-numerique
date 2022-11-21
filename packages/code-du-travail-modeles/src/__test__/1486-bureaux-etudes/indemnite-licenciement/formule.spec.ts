import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import {
  CatPro1486,
  TypeLicenciement1486,
} from "../../../plugins/salaire-reference/1486_bureaux_etudes_techniques";
import { getFormule } from "../../../utils";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 1486", () => {
  test.each`
    category                    | typeLicenciement              | seniority | expectedFormula                            | expectedExplanations
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${0}      | ${""}                                      | ${[]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${8 / 12} | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${8}      | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (8 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${12}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${0}      | ${""}                                      | ${[]}
    ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${1.99}   | ${""}                                      | ${[]}
    ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${2}      | ${"1/3 * Sref * A"}                        | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${19}     | ${"1/3 * Sref * A"}                        | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${0}      | ${""}                                      | ${[]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${1.99}   | ${""}                                      | ${[]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${2}      | ${"1/5 * Sref * A"}                        | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${19}     | ${"1/5 * Sref * A"}                        | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${0}      | ${""}                                      | ${[]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${1.99}   | ${""}                                      | ${[]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${2}      | ${"0.25 * Sref * A"}                       | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${19}     | ${"0.25 * Sref * A"}                       | ${["A : Ancienneté totale (19 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${20}     | ${"0.30 * Sref * A"}                       | ${["A : Ancienneté totale (20 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${22}     | ${"0.30 * Sref * A"}                       | ${["A : Ancienneté totale (22 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans, catégorie $category, type de licenciement $typeLicenciement",
    ({
      category,
      seniority,
      typeLicenciement,
      expectedFormula,
      expectedExplanations,
    }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1486'",
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement": `'${typeLicenciement}'`,
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement . autres . catégorie professionnelle": `'${category}'`,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence": 1000,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      });

      const result = getFormule(situation);

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
