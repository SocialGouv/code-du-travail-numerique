import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1404"
);

describe("Calcul de l'indemnité de licenciement pour CC 1404", () => {
  describe("CDI classique", () => {
    test.each`
      seniorityRight | seniority | salaireRef | expectedCompensation
      ${8 / 12}      | ${8 / 12} | ${2400}    | ${400}
      ${20.58}       | ${20.58}  | ${1896}    | ${11426.56}
    `(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ seniorityRight, salaireRef, expectedCompensation, seniority }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1404'",
            "contrat salarié . convention collective . sedima . question cdi opération":
              "'Non'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
  describe("CDI opération", () => {
    describe("moins de 6 mois", () => {
      test.each`
        seniorityRight | seniority | salaireRef | expectedCompensation | beforeTrial
        ${0}           | ${0}      | ${20136}   | ${0}                 | ${"'Oui'"}
        ${5 / 12}      | ${5 / 12} | ${20136}   | ${2013.6}            | ${"'Non'"}
      `(
        "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
        ({
          seniorityRight,
          salaireRef,
          expectedCompensation,
          seniority,
          beforeTrial,
        }) => {
          const { missingArgs, result } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1404'",
              "contrat salarié . convention collective . sedima . cdi opération . durée":
                (seniorityRight * 12).toString(),
              "contrat salarié . convention collective . sedima . cdi opération . moins de 6 mois . question période essai":
                beforeTrial,
              "contrat salarié . convention collective . sedima . cdi opération . moins de 6 mois . salaires total":
                salaireRef,
              "contrat salarié . convention collective . sedima . question cdi opération":
                "'Oui'",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

          expect(missingArgs).toEqual([]);
          expect(result.value).toEqual(expectedCompensation);
          expect(result.unit?.numerators).toEqual(["€"]);
        }
      );
    });

    describe("plus de 6 mois", () => {
      test.each`
        seniorityRight | seniority | salaire1 | salaire2     | salaire3     | expectedCompensation
        ${0.5}         | ${0.5}    | ${20296} | ${undefined} | ${undefined} | ${1623.68}
        ${2.5}         | ${2.5}    | ${29899} | ${29834}     | ${15297}     | ${4793.84}
      `(
        "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
        ({
          seniorityRight,
          salaire1,
          salaire2,
          salaire3,
          expectedCompensation,
          seniority,
        }) => {
          const salarySituation: Record<string, number> = {
            "contrat salarié . convention collective . sedima . cdi opération . plus de 6 mois . salaires 1e année":
              salaire1,
          };
          if (salaire2) {
            salarySituation[
              "contrat salarié . convention collective . sedima . cdi opération . plus de 6 mois . salaires 2e année"
            ] = salaire2;
          }
          if (salaire3) {
            salarySituation[
              "contrat salarié . convention collective . sedima . cdi opération . plus de 6 mois . salaires 3e année et plus"
            ] = salaire3;
          }
          const { missingArgs, result } = engine.setSituation(
            {
              ...salarySituation,
              "contrat salarié . convention collective": "'IDCC1404'",
              "contrat salarié . convention collective . sedima . cdi opération . durée":
                (seniorityRight * 12).toString(),
              "contrat salarié . convention collective . sedima . question cdi opération":
                "'Oui'",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

          expect(missingArgs).toEqual([]);
          expect(result.value).toEqual(expectedCompensation);
          expect(result.unit?.numerators).toEqual(["€"]);
        }
      );
    });
  });
});
