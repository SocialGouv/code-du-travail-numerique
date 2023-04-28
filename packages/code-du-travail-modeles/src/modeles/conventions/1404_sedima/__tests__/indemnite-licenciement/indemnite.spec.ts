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
    describe("Mission impossible", () => {
      test.each`
        seniorityRight | seniority | salaireRef | expectedCompensation
        ${0.25}        | ${0.25}   | ${7749}    | ${774.9}
        ${0.41}        | ${0.41}   | ${12280}   | ${1228}
        ${0.67}        | ${0.67}   | ${20136}   | ${0}
      `(
        "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
        ({ seniorityRight, salaireRef, expectedCompensation, seniority }) => {
          const { missingArgs, result } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1404'",
              "contrat salarié . convention collective . sedima . cdi opération . mission impossible . salaires total":
                salaireRef,
              "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
                "'Oui'",
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

    describe("Mission possible", () => {
      test.each`
        seniorityRight | seniority | salaire1 | salaire2     | salaire3     | expectedCompensation
        ${0.25}        | ${0.25}   | ${7542}  | ${undefined} | ${undefined} | ${0}
        ${0.41}        | ${0.41}   | ${12630} | ${undefined} | ${undefined} | ${0}
        ${0.67}        | ${0.67}   | ${20296} | ${undefined} | ${undefined} | ${1623.68}
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
            "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 1e année":
              salaire1,
          };
          if (salaire2) {
            salarySituation[
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 2e année"
            ] = salaire2;
          }
          if (salaire3) {
            salarySituation[
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 3e année et plus"
            ] = salaire3;
          }
          const { missingArgs, result } = engine.setSituation(
            {
              ...salarySituation,
              "contrat salarié . convention collective": "'IDCC1404'",
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . durée":
                (seniorityRight * 12).toString(),
              "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
                "'Non'",
              "contrat salarié . convention collective . sedima . question cdi opération":
                "'Oui'",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

          console.log(result);

          expect(missingArgs).toEqual([]);
          expect(result.value).toEqual(expectedCompensation);
          expect(result.unit?.numerators).toEqual(["€"]);
        }
      );
    });
  });
});
