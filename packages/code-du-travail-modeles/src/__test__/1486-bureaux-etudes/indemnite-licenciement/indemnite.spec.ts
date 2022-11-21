import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import {
  CatPro1486,
  TypeLicenciement1486,
} from "../../../plugins/salaire-reference/1486_bureaux_etudes_techniques";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 1486", () => {
  describe("Cas standard", () => {
    test.each`
      category                    | typeLicenciement              | seniority | salary    | expectedCompensation
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${0}      | ${2000}   | ${0}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${8 / 12} | ${2000}   | ${333.33}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${8}      | ${2000}   | ${4000}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.refus} | ${12}     | ${2000}   | ${6333.33}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${0}      | ${2000}   | ${0}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${1.99}   | ${2000}   | ${0}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${2}      | ${2000}   | ${1333.33}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${19}     | ${2000}   | ${12666.67}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${99}     | ${2000}   | ${24000}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${100}    | ${2000}   | ${24000}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${0}      | ${2000}   | ${0}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${1.99}   | ${2000}   | ${0}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${2}      | ${2000}   | ${800}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${19}     | ${2000}   | ${7600}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${99}     | ${2000}   | ${14000}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${100}    | ${2000}   | ${14000}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${0}      | ${2000}   | ${0}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${1.99}   | ${2000}   | ${0}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${2}      | ${2000}   | ${1000}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${19}     | ${2000}   | ${9500}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${20}     | ${2000}   | ${12000}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${22}     | ${2000}   | ${13200}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${99}     | ${2000}   | ${20000}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${100}    | ${2000}   | ${20000}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.refus} | ${0.25}   | ${3000}   | ${0}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.refus} | ${0.67}   | ${3000}   | ${502.5}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.refus} | ${15}     | ${3000}   | ${12500}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${1.75}   | ${3262.5} | ${0}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${15}     | ${3262.5} | ${12234.38}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${20}     | ${3262.5} | ${19575}
      ${CatPro1486.etam}          | ${TypeLicenciement1486.autre} | ${20.58}  | ${3262.5} | ${20142.67}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${1.91}   | ${3262.5} | ${0}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${2}      | ${3262.5} | ${2175}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${16}     | ${3262.5} | ${17400}
      ${CatPro1486.ingeCadre}     | ${TypeLicenciement1486.autre} | ${24.91}  | ${3262.5} | ${27089.62}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${1.41}   | ${6525}   | ${0}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${2}      | ${6525}   | ${2610}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${2.08}   | ${6525}   | ${2714.4}
      ${CatPro1486.chargeEnquete} | ${TypeLicenciement1486.autre} | ${20}     | ${6525}   | ${26100}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        salary,
        expectedCompensation,
        category,
        typeLicenciement,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC1486'",
            "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement": `'${typeLicenciement}'`,
            "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement . autres . catégorie professionnelle": `'${category}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence":
              salary,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
