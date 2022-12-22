import { CatPro3239 } from "../../salary";

describe("Indemnité conventionnel de licenciement pour la CC 3239", () => {
  describe("Cas standard", () => {
    test.each`
      category                                  | seniority | salary  | expectedCompensation
      ${CatPro3239.salarieParticulierEmployeur} | ${0}      | ${2000} | ${0}
      ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro3239.salarieParticulierEmployeur} | ${2}      | ${2000} | ${1000}
      ${CatPro3239.salarieParticulierEmployeur} | ${10}     | ${2000} | ${5000}
      ${CatPro3239.salarieParticulierEmployeur} | ${12}     | ${2000} | ${6333.33}
      ${CatPro3239.assistantMaternel}           | ${0}      | ${2000} | ${0}
      ${CatPro3239.assistantMaternel}           | ${8 / 12} | ${2000} | ${0}
      ${CatPro3239.assistantMaternel}           | ${9 / 12} | ${2000} | ${25}
      ${CatPro3239.assistantMaternel}           | ${2}      | ${2000} | ${25}
      ${CatPro3239.assistantMaternel}           | ${10}     | ${2000} | ${25}
      ${CatPro3239.assistantMaternel}           | ${12}     | ${2000} | ${25}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC3239'",
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires": salary,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );

    describe("Assistante maternelle qui a sélectionné comme motif un retrait d'agrément", () => {
      test.each`
        seniority | salary  | expectedCompensation
        ${0}      | ${2000} | ${0}
        ${8 / 12} | ${2000} | ${0}
        ${9 / 12} | ${2000} | ${0}
        ${2}      | ${2000} | ${0}
        ${10}     | ${2000} | ${0}
        ${12}     | ${2000} | ${0}
      `(
        "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
        ({ seniority, salary, expectedCompensation }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC3239'",
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.assistantMaternel}'`,
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Oui'`,
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires": salary,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          });

          const result = situation.evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

          expect(result.missingVariables).toEqual({});
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.nodeValue).toEqual(expectedCompensation);
        }
      );
    });
  });
});
