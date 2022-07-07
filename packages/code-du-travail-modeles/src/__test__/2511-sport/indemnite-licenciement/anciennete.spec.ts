import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

describe("CC 2511", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absenceAccidentTrajet | absenceCongesCreationEntreprise | absenceCongesParentalEducation | absenceCongesPaternite | absenceCongesSabbatique | absenceCongesSansSolde | absenceGreve | absenceMaladieOrigineNonPro | absenceMaladiePro | absenceMiseAPied | entryDate       | exitDate        | expectedAnciennete
      ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${1.003}
      ${1}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${1.003}
      ${0}                  | ${1}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.919}
      ${0}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.961}
      ${0}                  | ${0}                            | ${0}                           | ${1}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${1.003}
      ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${1}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.919}
      ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${1}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.919}
      ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${1}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.919}
      ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${1}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.919}
      ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${1}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.919}
      ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${1}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.919}
      ${1}                  | ${1}                            | ${1}                           | ${1}                   | ${1}                    | ${1}                   | ${1}         | ${1}                        | ${1}              | ${1}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.378}
      ${1}                  | ${1}                            | ${1}                           | ${1}                   | ${1}                    | ${1}                   | ${1}         | ${1}                        | ${1}              | ${1}             | ${"20/01/2021"} | ${"20/02/2021"} | ${-0.54}
      ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${42.03}
    `(
      "Avec $absenceAccidentTrajet, $absenceCongesCreationEntreprise, $absenceCongesParentalEducation, $absenceCongesPaternite, $absenceCongesSabbatique, $absenceCongesSansSolde, $absenceGreve, $absenceMaladieOrigineNonPro, $absenceMaladiePro, $absenceMiseAPied, $entryDate, $exitDate, on doit avoir $expectedAnciennete",
      ({
        absenceAccidentTrajet,
        absenceCongesCreationEntreprise,
        absenceCongesParentalEducation,
        absenceCongesPaternite,
        absenceCongesSabbatique,
        absenceCongesSansSolde,
        absenceGreve,
        absenceMaladieOrigineNonPro,
        absenceMaladiePro,
        absenceMiseAPied,
        entryDate,
        exitDate,
        expectedAnciennete,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2511'",
            "contrat salarié . indemnité de licenciement . absence pour accident de trajet":
              absenceAccidentTrajet,
            "contrat salarié . indemnité de licenciement . absence pour congé création d'entreprise":
              absenceCongesCreationEntreprise,
            "contrat salarié . indemnité de licenciement . absence pour congé parental d'éducation":
              absenceCongesParentalEducation,
            "contrat salarié . indemnité de licenciement . absence pour congé paternité":
              absenceCongesPaternite,
            "contrat salarié . indemnité de licenciement . absence pour congé sabbatique":
              absenceCongesSabbatique,
            "contrat salarié . indemnité de licenciement . absence pour congé sans solde":
              absenceCongesSansSolde,
            "contrat salarié . indemnité de licenciement . absence pour grève":
              absenceGreve,
            "contrat salarié . indemnité de licenciement . absence pour maladie d'origine non pro":
              absenceMaladieOrigineNonPro,
            "contrat salarié . indemnité de licenciement . absence pour maladie non pro":
              absenceMaladiePro,
            "contrat salarié . indemnité de licenciement . absence pour mise à pied":
              absenceMiseAPied,
            "contrat salarié . indemnité de licenciement . date d'entrée":
              entryDate,
            "contrat salarié . indemnité de licenciement . date de sortie":
              exitDate,
            "indemnité de licenciement": "oui",
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année"
          );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["an"]);
        expect(result.nodeValue).toEqual(expectedAnciennete);
      }
    );
  });
});
