import Engine from "publicodes";

import { mergeModels } from "../../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Salaire de référénce pour un employé", () => {
  test.each`
    salary   | salaireRef
    ${0}     | ${0}
    ${1200}  | ${1200}
    ${20000} | ${20000}
  `(
    "qui a eu le même salaire: $salary lors des 12 derniers mois",
    ({ salary, salaireRef }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "''",
          "contrat salarié . indemnité de licenciement . même salaire sur les 12 derniers mois":
            "oui",
          "contrat salarié . indemnité de licenciement . salaire des 12 derniers mois":
            salary,
        })
        .evaluate(
          "contrat salarié . indemnité de licenciement . salaire de référence"
        );
      expect(result.nodeValue).toEqual(salaireRef);
      expect(result.unit?.numerators).toEqual(["€"]);
    }
  );

  test.each`
    salary1 | salary2 | salary3 | salary4 | primes  | salaireRef
    ${0}    | ${0}    | ${0}    | ${0}    | ${0}    | ${0}
    ${1000} | ${2000} | ${2000} | ${2000} | ${1000} | ${1416.6666666666665}
    ${1000} | ${1000} | ${2000} | ${2000} | ${3000} | ${583.3333333333333}
    ${6000} | ${2000} | ${2000} | ${2000} | ${4000} | ${2333.3333333333335}
    ${6000} | ${6000} | ${6000} | ${2000} | ${4000} | ${4999.999999999999}
  `(
    "qui n'a eu le même salaire: $salary1 lors des 12 derniers mois avec un total de primes: $primes a un salaire ref de $salaireRef",
    ({ salary1, salary2, salary3, salary4, primes, salaireRef }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "''",
          "contrat salarié . indemnité de licenciement . même salaire sur les 12 derniers mois":
            "non",
          "contrat salarié . indemnité de licenciement . primes 3 derniers mois":
            primes,
          "contrat salarié . indemnité de licenciement . salaire du mois 1":
            salary1,
          "contrat salarié . indemnité de licenciement . salaire du mois 2":
            salary2,
          "contrat salarié . indemnité de licenciement . salaire du mois 3":
            salary3,
          "contrat salarié . indemnité de licenciement . salaire du mois 4":
            salary4,
        })
        .evaluate(
          "contrat salarié . indemnité de licenciement . salaire de référence"
        );
      expect(result.nodeValue).toEqual(salaireRef);
      expect(result.unit?.numerators).toEqual(["€"]);
    }
  );
  test.each`
    salary1 | salary2 | salary3 | salaryPreavis1 | salaryPreavis2 | salaryPreavis3 | preavis  | salaireRef
    ${0}    | ${0}    | ${0}    | ${0}           | ${0}           | ${0}           | ${"non"} | ${0}
    ${1000} | ${2000} | ${3000} | ${0}           | ${0}           | ${0}           | ${"non"} | ${2000}
    ${1000} | ${1000} | ${1000} | ${0}           | ${0}           | ${0}           | ${"non"} | ${1000}
    ${1000} | ${1000} | ${1000} | ${4000}        | ${0}           | ${0}           | ${"oui"} | ${2000}
    ${1000} | ${1000} | ${1000} | ${4000}        | ${4000}        | ${0}           | ${"oui"} | ${3000}
    ${1000} | ${1000} | ${1000} | ${7000}        | ${7000}        | ${7000}        | ${"oui"} | ${7000}
  `(
    "POC avec préavis: $preavis. SalaireRef: $salaireRef",
    ({
      salary1,
      salary2,
      salary3,
      salaryPreavis1,
      salaryPreavis2,
      salaryPreavis3,
      preavis,
      salaireRef,
    }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "''",
          "contrat salarié . indemnité de licenciement . moyenne des salaires des 3 derniers mois si préavis . préavis":
            preavis,
          "contrat salarié . indemnité de licenciement . moyenne des salaires des 3 derniers mois si préavis . préavis . salaire du mois 1":
            salaryPreavis1,
          "contrat salarié . indemnité de licenciement . moyenne des salaires des 3 derniers mois si préavis . préavis . salaire du mois 2":
            salaryPreavis2,
          "contrat salarié . indemnité de licenciement . moyenne des salaires des 3 derniers mois si préavis . préavis . salaire du mois 3":
            salaryPreavis3,
          "contrat salarié . indemnité de licenciement . même salaire sur les 12 derniers mois":
            "non",
          "contrat salarié . indemnité de licenciement . salaire du mois 1":
            salary1,
          "contrat salarié . indemnité de licenciement . salaire du mois 2":
            salary2,
          "contrat salarié . indemnité de licenciement . salaire du mois 3":
            salary3,
        })
        .evaluate(
          "contrat salarié . indemnité de licenciement . moyenne des salaires des 3 derniers mois si préavis"
        );
      expect(result.nodeValue).toEqual(salaireRef);
      expect(result.unit?.numerators).toEqual(["€"]);
    }
  );
});
