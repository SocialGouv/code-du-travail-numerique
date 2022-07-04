import Engine from "publicodes";

import { mergeModels } from "../../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité légale de licenciement avec une ancienneté spécifiée", () => {
  test.each`
    absenceAccidentTrajet | absenceCongesCreationEntreprise | absenceCongesParentalEducation | absenceCongesPaternite | absenceCongesSabbatique | absenceCongesSansSolde | absenceGreve | absenceMaladieOrigineNonPro | absenceMaladiePro | absenceMiseAPied | entryDate       | exitDate        | expectedAnciennete
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${1.0027397260273974}
    ${1}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${0}                  | ${1}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${0}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9610730593607306}
    ${0}                  | ${0}                            | ${0}                           | ${1}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${1}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${1}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${1}         | ${0}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${1}                        | ${0}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${1}              | ${0}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${1}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9194063926940641}
    ${1}                  | ${1}                            | ${1}                           | ${1}                   | ${1}                    | ${1}                   | ${1}         | ${1}                        | ${1}              | ${1}             | ${"20/02/2020"} | ${"20/02/2021"} | ${0.21107305936073073}
    ${1}                  | ${1}                            | ${1}                           | ${1}                   | ${1}                    | ${1}                   | ${1}         | ${1}                        | ${1}              | ${1}             | ${"20/01/2021"} | ${"20/02/2021"} | ${-0.7067351598173516}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${42.03013698630137}
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
          "contrat salarié . absence pour accident de trajet":
            absenceAccidentTrajet,
          "contrat salarié . absence pour congé création d'entreprise":
            absenceCongesCreationEntreprise,
          "contrat salarié . absence pour congé parental d'éducation":
            absenceCongesParentalEducation,
          "contrat salarié . absence pour congé paternité":
            absenceCongesPaternite,
          "contrat salarié . absence pour congé sabbatique":
            absenceCongesSabbatique,
          "contrat salarié . absence pour congé sans solde":
            absenceCongesSansSolde,
          "contrat salarié . absence pour grève": absenceGreve,
          "contrat salarié . absence pour maladie d'origine non pro":
            absenceMaladieOrigineNonPro,
          "contrat salarié . absence pour maladie non pro": absenceMaladiePro,
          "contrat salarié . absence pour mise à pied": absenceMiseAPied,
          "contrat salarié . date d'entrée": entryDate,
          "contrat salarié . date de sortie": exitDate,
          "indemnité de licenciement": "oui",
        })
        .evaluate("contrat salarié . ancienneté en année");
      expect(result.missingVariables).toEqual({});
      expect(result.unit?.numerators).toEqual(["an"]);
      expect(result.nodeValue).toEqual(expectedAnciennete);
    }
  );

  test.each`
    absenceAccidentTrajet | absenceCongesCreationEntreprise | absenceCongesParentalEducation | absenceCongesPaternite | absenceCongesSabbatique | absenceCongesSansSolde | absenceGreve | absenceMaladieOrigineNonPro | absenceMaladiePro | absenceMiseAPied | entryDate       | exitDate        | salaireRef | expectedCompensation
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${3000}    | ${39530.137}
    ${1}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${3000}    | ${39405.137}
    ${1}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1981"} | ${"01/01/2021"} | ${3000}    | ${37402.397}
    ${1}                  | ${0}                            | ${1}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2020"} | ${3000}    | ${38402.397}
    ${0}                  | ${0}                            | ${0}                           | ${0}                   | ${0}                    | ${0}                   | ${0}         | ${0}                        | ${0}              | ${0}             | ${"01/01/1979"} | ${"01/01/2021"} | ${2000}    | ${26353.425}
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
          "contrat salarié . absence pour accident de trajet":
            absenceAccidentTrajet,
          "contrat salarié . absence pour congé création d'entreprise":
            absenceCongesCreationEntreprise,
          "contrat salarié . absence pour congé parental d'éducation":
            absenceCongesParentalEducation,
          "contrat salarié . absence pour congé paternité":
            absenceCongesPaternite,
          "contrat salarié . absence pour congé sabbatique":
            absenceCongesSabbatique,
          "contrat salarié . absence pour congé sans solde":
            absenceCongesSansSolde,
          "contrat salarié . absence pour grève": absenceGreve,
          "contrat salarié . absence pour maladie d'origine non pro":
            absenceMaladieOrigineNonPro,
          "contrat salarié . absence pour maladie non pro": absenceMaladiePro,
          "contrat salarié . absence pour mise à pied": absenceMiseAPied,
          "contrat salarié . convention collective": "''",
          "contrat salarié . date d'entrée": entryDate,
          "contrat salarié . date de sortie": exitDate,
          "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . salaire de référence": salaireRef,
          "indemnité de licenciement": "oui",
        })
        .evaluate("contrat salarié . indemnité de licenciement");
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
