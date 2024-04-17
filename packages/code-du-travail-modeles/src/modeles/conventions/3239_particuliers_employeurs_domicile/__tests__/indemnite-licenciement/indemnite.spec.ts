import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CatPro3239 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3239"
);

describe("Indemnité conventionnel de licenciement pour la CC 3239", () => {
  describe("Cas standard", () => {
    test.each`
      category                                  | seniorityRight | seniority | salary  | expectedCompensation
      ${CatPro3239.salarieParticulierEmployeur} | ${7 / 12}      | ${1}      | ${2000} | ${0}
      ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12}      | ${2}      | ${2000} | ${1000}
      ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12}      | ${10}     | ${2000} | ${5000}
      ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12}      | ${12}     | ${2000} | ${6333.33}
      ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12}      | ${12}     | ${2100} | ${6650}
      ${CatPro3239.assistantMaternel}           | ${7 / 12}      | ${1}      | ${2000} | ${0}
      ${CatPro3239.assistantMaternel}           | ${8 / 12}      | ${8 / 12} | ${2000} | ${0}
      ${CatPro3239.assistantMaternel}           | ${9 / 12}      | ${9 / 12} | ${2000} | ${25}
      ${CatPro3239.assistantMaternel}           | ${9 / 12}      | ${2}      | ${2000} | ${25}
      ${CatPro3239.assistantMaternel}           | ${9 / 12}      | ${10}     | ${2000} | ${25}
      ${CatPro3239.assistantMaternel}           | ${9 / 12}      | ${12}     | ${2000} | ${25}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
        category,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC3239'",
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
              category,
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires":
              salary,
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
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );

    describe("Assistante maternelle qui a sélectionné comme motif un retrait d'agrément", () => {
      test.each`
        seniorityRight | seniority | salary  | expectedCompensation
        ${0}           | ${1}      | ${2000} | ${0}
        ${8 / 12}      | ${1}      | ${2000} | ${0}
        ${9 / 12}      | ${1}      | ${2000} | ${0}
        ${9 / 12}      | ${2}      | ${2000} | ${0}
        ${9 / 12}      | ${10}     | ${2000} | ${0}
        ${9 / 12}      | ${12}     | ${2000} | ${0}
      `(
        "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
        ({ seniority, seniorityRight, salary, expectedCompensation }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC3239'",
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.assistantMaternel}'`,
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Oui'`,
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires":
                salary,
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
          expect(result?.unit?.numerators).toEqual(["€"]);
          expect(result?.value).toEqual(expectedCompensation);
        }
      );
    });
  });
});
