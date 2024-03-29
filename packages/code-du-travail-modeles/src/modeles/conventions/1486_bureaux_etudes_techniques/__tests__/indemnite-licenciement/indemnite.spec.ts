import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CatPro1486, TypeLicenciement1486 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1486"
);

describe("Indemnité conventionnel de licenciement pour la CC 1486", () => {
  describe("Calcul avant le 1er mai 2023", () => {
    describe("Pour un Licenciement en raison d'un refus de respecter une clause de mobilité", () => {
      test.each`
        seniorityRight | seniority | salary  | expectedCompensation
        ${7 / 12}      | ${7 / 12} | ${3000} | ${0}
        ${7 / 12}      | ${8 / 12} | ${3000} | ${0}
        ${8 / 12}      | ${8 / 12} | ${3000} | ${500}
        ${8 / 12}      | ${8}      | ${2000} | ${4000}
        ${8 / 12}      | ${12}     | ${2000} | ${6333.33}
        ${8 / 12}      | ${15}     | ${3000} | ${12500}
      `(
        "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
        ({ seniority, seniorityRight, salary, expectedCompensation }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1486'",
              "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle": `${CatPro1486.etam}`,
              "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement": `${TypeLicenciement1486.refus}`,
              "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . utilisation des anciennes règles de calcul":
                "oui",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
                salary,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          expect(missingArgs).toEqual([]);
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.value).toEqual(expectedCompensation);
        }
      );

      describe("Pour un Autre licenciement", () => {
        test.each`
          category                    | seniorityRight | seniority | salary    | expectedCompensation
          ${CatPro1486.ingeCadre}     | ${0}           | ${0}      | ${2000}   | ${0}
          ${CatPro1486.ingeCadre}     | ${1.99}        | ${1.99}   | ${2000}   | ${0}
          ${CatPro1486.ingeCadre}     | ${1.99}        | ${2}      | ${2000}   | ${0}
          ${CatPro1486.ingeCadre}     | ${2}           | ${2}      | ${2000}   | ${1333.33}
          ${CatPro1486.ingeCadre}     | ${2}           | ${19}     | ${2000}   | ${12666.67}
          ${CatPro1486.ingeCadre}     | ${2}           | ${99}     | ${2000}   | ${24000}
          ${CatPro1486.ingeCadre}     | ${2}           | ${100}    | ${2000}   | ${24000}
          ${CatPro1486.chargeEnquete} | ${0}           | ${0}      | ${2000}   | ${0}
          ${CatPro1486.chargeEnquete} | ${1.99}        | ${1.99}   | ${2000}   | ${0}
          ${CatPro1486.chargeEnquete} | ${1.99}        | ${2}      | ${2000}   | ${0}
          ${CatPro1486.chargeEnquete} | ${2}           | ${2}      | ${2000}   | ${800}
          ${CatPro1486.chargeEnquete} | ${2}           | ${19}     | ${2000}   | ${7600}
          ${CatPro1486.chargeEnquete} | ${2}           | ${99}     | ${2000}   | ${14000}
          ${CatPro1486.chargeEnquete} | ${2}           | ${100}    | ${2000}   | ${14000}
          ${CatPro1486.etam}          | ${0}           | ${0}      | ${2000}   | ${0}
          ${CatPro1486.etam}          | ${1.99}        | ${1.99}   | ${2000}   | ${0}
          ${CatPro1486.etam}          | ${1.99}        | ${2}      | ${2000}   | ${0}
          ${CatPro1486.etam}          | ${2}           | ${2}      | ${2000}   | ${1000}
          ${CatPro1486.etam}          | ${2}           | ${19}     | ${2000}   | ${9500}
          ${CatPro1486.etam}          | ${2}           | ${20}     | ${2000}   | ${12000}
          ${CatPro1486.etam}          | ${2}           | ${22}     | ${2000}   | ${13200}
          ${CatPro1486.etam}          | ${2}           | ${99}     | ${2000}   | ${20000}
          ${CatPro1486.etam}          | ${2}           | ${100}    | ${2000}   | ${20000}
          ${CatPro1486.etam}          | ${1.75}        | ${1.75}   | ${3262.5} | ${0}
          ${CatPro1486.etam}          | ${1.99}        | ${1.99}   | ${3262.5} | ${0}
          ${CatPro1486.etam}          | ${1.99}        | ${2}      | ${3262.5} | ${0}
          ${CatPro1486.etam}          | ${2}           | ${2}      | ${3262.5} | ${1631.25}
          ${CatPro1486.etam}          | ${2}           | ${15}     | ${3262.5} | ${12234.38}
          ${CatPro1486.etam}          | ${2}           | ${20}     | ${3262.5} | ${19575}
          ${CatPro1486.etam}          | ${2}           | ${20.58}  | ${3262.5} | ${20142.67}
          ${CatPro1486.ingeCadre}     | ${1.91}        | ${1.91}   | ${3262.5} | ${0}
          ${CatPro1486.ingeCadre}     | ${1.99}        | ${2}      | ${3262.5} | ${0}
          ${CatPro1486.ingeCadre}     | ${2}           | ${2}      | ${3262.5} | ${2175}
          ${CatPro1486.ingeCadre}     | ${2}           | ${16}     | ${3262.5} | ${17400}
          ${CatPro1486.ingeCadre}     | ${2}           | ${24.91}  | ${3262.5} | ${27089.62}
          ${CatPro1486.chargeEnquete} | ${1.41}        | ${1.41}   | ${6525}   | ${0}
          ${CatPro1486.chargeEnquete} | ${1.99}        | ${2}      | ${6525}   | ${0}
          ${CatPro1486.chargeEnquete} | ${2}           | ${2}      | ${6525}   | ${2610}
          ${CatPro1486.chargeEnquete} | ${2}           | ${2.08}   | ${6525}   | ${2714.4}
          ${CatPro1486.chargeEnquete} | ${2}           | ${20}     | ${6525}   | ${26100}
        `(
          "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
          ({
            seniority,
            seniorityRight,
            salary,
            category,
            expectedCompensation,
          }) => {
            const { result, missingArgs } = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC1486'",
                "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle": `${category}`,
                "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement": `${TypeLicenciement1486.autre}`,
                "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . utilisation des anciennes règles de calcul":
                  "oui",
                "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                  seniority,
                "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                  seniorityRight,
                "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
                  salary,
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
            expect(missingArgs).toEqual([]);
            expect(result.unit?.numerators).toEqual(["€"]);
            expect(result.value).toEqual(expectedCompensation);
          }
        );
      });
    });
  });
  describe("Calcul à partir du 1er mai 2023", () => {
    test.each`
      category                    | seniorityRight | seniority | salary  | expectedCompensation
      ${CatPro1486.ingeCadre}     | ${0}           | ${0}      | ${2000} | ${0}
      ${CatPro1486.ingeCadre}     | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
      ${CatPro1486.ingeCadre}     | ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro1486.ingeCadre}     | ${8 / 12}      | ${2}      | ${2000} | ${1333.33}
      ${CatPro1486.ingeCadre}     | ${8 / 12}      | ${10}     | ${2000} | ${6666.67}
      ${CatPro1486.chargeEnquete} | ${0}           | ${0}      | ${2000} | ${0}
      ${CatPro1486.chargeEnquete} | ${1.99}        | ${1.99}   | ${2000} | ${0}
      ${CatPro1486.chargeEnquete} | ${1.99}        | ${2}      | ${2000} | ${0}
      ${CatPro1486.chargeEnquete} | ${2}           | ${2}      | ${2000} | ${800}
      ${CatPro1486.chargeEnquete} | ${2}           | ${19}     | ${2000} | ${7600}
      ${CatPro1486.chargeEnquete} | ${2}           | ${99}     | ${2000} | ${14000}
      ${CatPro1486.chargeEnquete} | ${2}           | ${100}    | ${2000} | ${14000}
      ${CatPro1486.etam}          | ${0}           | ${0}      | ${2000} | ${0}
      ${CatPro1486.etam}          | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
      ${CatPro1486.etam}          | ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro1486.etam}          | ${8 / 12}      | ${10}     | ${2000} | ${5000}
      ${CatPro1486.etam}          | ${8 / 12}      | ${15}     | ${2000} | ${10000}
      ${CatPro1486.etam}          | ${8 / 12}      | ${20}     | ${2000} | ${13333.33}
      ${CatPro1486.chargeEnquete} | ${1.41}        | ${1.41}   | ${6525} | ${0}
      ${CatPro1486.chargeEnquete} | ${1.99}        | ${2}      | ${6525} | ${0}
      ${CatPro1486.chargeEnquete} | ${2}           | ${2}      | ${6525} | ${2610}
      ${CatPro1486.chargeEnquete} | ${2}           | ${2.08}   | ${6525} | ${2714.4}
      ${CatPro1486.chargeEnquete} | ${2}           | ${20}     | ${6525} | ${26100}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        seniorityRight,
        salary,
        category,
        expectedCompensation,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1486'",
            "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle": `${category}`,
            "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . utilisation des anciennes règles de calcul":
              "non",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
});
