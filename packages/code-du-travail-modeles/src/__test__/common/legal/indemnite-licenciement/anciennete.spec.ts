import Engine from "publicodes";

import { mergeModels } from "../../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité légale de licenciement avec une ancienneté spécifiée", () => {
  test.each`
    absenceAccidentTrajet | absenceCongesCreationEntreprise | absenceCongesParentalEducation | absenceCongesPaternite | absenceCongesSabbatique | absenceCongesSansSolde | absenceGreve | absenceMaladieOrigineNonPro | absenceMaladiePro | absenceMiseAPied | entryDate       | exitDate        | expectedAnciennete
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
    ${1}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${0}                  | ${1}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${0}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.96}
    ${0}                  | ${0}                            | ${0}                           | ${1}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${1}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${1}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${1}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${1}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${1}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${1}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.92}
    ${1}                  | ${1}                            | ${1}                           | ${1}                   | ${1}                    | ${1}                   | ${1}         | ${1}                        | ${1}              | ${1}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.21}
    ${1}                  | ${1}                            | ${1}                           | ${1}                   | ${1}                    | ${1}                   | ${1}         | ${1}                        | ${1}              | ${1}             | ${"20/01/2021"} | ${"20/02/2021"} | ${-0.71}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${42.03}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/2020"} | ${"01/01/2022"} | ${2}
  `(
    "Calcul de l'ancienneté avec le moteur publicodes en attendant $expectedAnciennete an",
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
          "contrat salarié . indemnité de licenciement . ancienneté en année"
        );
      expect(result.missingVariables).toEqual({});
      expect(result.unit?.numerators).toEqual(["an"]);
      expect(result.nodeValue).toEqual(expectedAnciennete);
    }
  );

  test.each`
    absenceAccidentTrajet | absenceCongesCreationEntreprise | absenceCongesParentalEducation | absenceCongesPaternite | absenceCongesSabbatique | absenceCongesSansSolde | absenceGreve | absenceMaladieOrigineNonPro | absenceMaladiePro | absenceMiseAPied | entryDate       | exitDate        | salaireRef | expectedCompensation
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${3000}    | ${39530}
    ${1}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${3000}    | ${39410}
    ${1}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1981"} | ${"01/01/2021"} | ${3000}    | ${37400}
    ${1}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2020"} | ${3000}    | ${38400}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${2000}    | ${26353.333}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/2020"} | ${"01/01/2022"} | ${2000}    | ${1000}
  `(
    "Un calcul de l'indemnité avec les paramètres de l'ancienneté, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
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
      salaireRef,
      expectedCompensation,
    }) => {
      const result = engine
        .setSituation({
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
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence":
            salaireRef,
          "indemnité de licenciement": "oui",
        })
        .evaluate(
          "contrat salarié . indemnité de licenciement . résultat légal"
        );

      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedCompensation);
    }
  );
});
