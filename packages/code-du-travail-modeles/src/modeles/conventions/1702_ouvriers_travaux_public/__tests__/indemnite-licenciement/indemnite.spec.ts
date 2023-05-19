import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1702"
);

describe("CC 1702", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniorityRight | seniority | age   | salaireRef | expectedCompensation
      ${1.99}        | ${3}      | ${54} | ${2700}    | ${0}
      ${2}           | ${3}      | ${54} | ${2700}    | ${810}
      ${2}           | ${5}      | ${54} | ${2700}    | ${1350}
      ${2}           | ${6}      | ${54} | ${2700}    | ${2430}
      ${2}           | ${15}     | ${54} | ${2700}    | ${6075}
      ${2}           | ${27}     | ${54} | ${2700}    | ${12555}
      ${2}           | ${3}      | ${57} | ${2700}    | ${891}
      ${2}           | ${5}      | ${57} | ${2700}    | ${1485}
      ${2}           | ${6}      | ${57} | ${2700}    | ${2673}
    `(
      "Avec une ancienneté $seniority ans, age: $age, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({
        age,
        salaireRef,
        expectedCompensation,
        seniority,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1702'",
            "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique": `'Non'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement en cas de licenciement économique", () => {
    test.each`
      seniorityRight | seniority | age   | salaireRef | expectedCompensation
      ${1.99}        | ${3}      | ${54} | ${2700}    | ${0}
      ${2}           | ${3}      | ${54} | ${2700}    | ${1377}
      ${2}           | ${5}      | ${54} | ${2700}    | ${2295}
      ${2}           | ${6}      | ${54} | ${2700}    | ${3375}
      ${2}           | ${27}     | ${54} | ${2700}    | ${13500}
      ${2}           | ${3}      | ${56} | ${2700}    | ${1458}
      ${2}           | ${5}      | ${56} | ${2700}    | ${2430}
      ${2}           | ${6}      | ${56} | ${2700}    | ${3618}
      ${2}           | ${27}     | ${56} | ${2700}    | ${14755.5}
    `(
      "Avec une ancienneté $seniority ans, age: $age, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({
        age,
        salaireRef,
        expectedCompensation,
        seniority,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1702'",
            "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique": `'Oui'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );

    test("Si l'inaptitude suite à un accident ou maladie professionnelle alors pas de question pour motif eco", () => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1702'",
          "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
            "30",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "3",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "3",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2700",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "oui",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(missingArgs).toEqual([]);
      expect(result.value).toEqual(810);
    });
  });
});
