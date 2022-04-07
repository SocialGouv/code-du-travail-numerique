import { computeSalaireRefLegal } from "../../../../rules";

describe("Salaire de référénce pour un employé", () => {
  test.each`
    salary   | salaireRef
    ${0}     | ${0}
    ${1200}  | ${1200}
    ${20000} | ${20000}
  `(
    "qui a eu le même salaire: $salary lors des 12 derniers mois",
    ({ salary, salaireRef }) => {
      const salaries = [];
      for (let i = 0; i < 12; i++) {
        salaries.push(salary);
      }
      expect(computeSalaireRefLegal(salaries)).toEqual(salaireRef);
    }
  );

  test.each`
    salary1 | salary2 | salary3 | salary4 | salaryNum | primes  | salaireRef
    ${0}    | ${0}    | ${0}    | ${0}    | ${0}      | ${0}    | ${0}
    ${1000} | ${1000} | ${1000} | ${0}    | ${3}      | ${1000} | ${1000}
    ${1000} | ${2000} | ${2000} | ${2000} | ${4}      | ${1000} | ${1416.6666666666665}
    ${1000} | ${1000} | ${2000} | ${2000} | ${4}      | ${3000} | ${583.3333333333333}
    ${6000} | ${2000} | ${2000} | ${2000} | ${4}      | ${4000} | ${2333.3333333333335}
    ${6000} | ${6000} | ${6000} | ${2000} | ${4}      | ${4000} | ${4999.999999999999}
  `(
    "qui n'a eu le même salaire: $salary1 lors des 12 derniers mois avec un total de primes: $primes a un salaire ref de $salaireRef",
    ({ salary1, salary2, salary3, salary4, salaireRef }) => {
      expect(
        computeSalaireRefLegal([salary1, salary2, salary3, salary4])
      ).toEqual(salaireRef);
    }
  );
});
