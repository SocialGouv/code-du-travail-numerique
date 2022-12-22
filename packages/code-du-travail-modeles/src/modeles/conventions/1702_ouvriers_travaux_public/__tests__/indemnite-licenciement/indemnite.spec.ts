import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("CC 1702", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority | age   | salaireRef | expectedCompensation
      ${3}      | ${54} | ${2700}    | ${810}
      ${5}      | ${54} | ${2700}    | ${1350}
      ${6}      | ${54} | ${2700}    | ${2430}
      ${27}     | ${54} | ${2700}    | ${12555}
      ${3}      | ${57} | ${2700}    | ${891}
      ${5}      | ${57} | ${2700}    | ${1485}
      ${6}      | ${57} | ${2700}    | ${2673}
    `(
      "Avec une ancienneté $seniority ans, age: $age, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ age, salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC1702'",
            "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age": age,
            "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique": `'Non'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement en cas de licenciement économique", () => {
    test.each`
      seniority | age   | salaireRef | expectedCompensation
      ${3}      | ${54} | ${2700}    | ${1377}
      ${5}      | ${54} | ${2700}    | ${2295}
      ${6}      | ${54} | ${2700}    | ${3375}
      ${27}     | ${54} | ${2700}    | ${13500}
      ${3}      | ${56} | ${2700}    | ${1458}
      ${5}      | ${56} | ${2700}    | ${2430}
      ${6}      | ${56} | ${2700}    | ${3618}
      ${27}     | ${56} | ${2700}    | ${14755.5}
    `(
      "Avec une ancienneté $seniority ans, age: $age, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ age, salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC1702'",
            "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age": age,
            "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique": `'Oui'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
