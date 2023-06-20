import { ca } from "date-fns/locale";

import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2120"
);

describe("Indemnité conventionnel de licenciement pour la CC 2120", () => {
  test.each`
    categoriePro    | semestresAvant2002 | semestresApres2002 | licenciementEco | licenciementDisciplinaire | seniorityRight | salary  | expectedCompensation
    ${"Non-cadres"} | ${0}               | ${0}               | ${"Non"}        | ${"Non"}                  | ${0}           | ${2000} | ${0}
  `(
    "$#) Catégorie pro : $categoriePro, ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation",
    ({
      categoriePro,
      licenciementEco,
      licenciementDisciplinaire,
      semestresAvant2002,
      semestresApres2002,
      seniorityRight,
      salary,
      expectedCompensation,
    }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC2120'",
          "contrat salarié . convention collective . banque . catégorie professionnelle": `'${categoriePro}'`,
          "contrat salarié . convention collective . banque . licenciement disciplinaire": `'${licenciementDisciplinaire}'`,
          "contrat salarié . convention collective . banque . licenciement économique": `'${licenciementEco}'`,
          "contrat salarié . convention collective . banque . semestres complets après 2002":
            semestresAvant2002,
          "contrat salarié . convention collective . banque . semestres complets avant 2002":
            semestresApres2002,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );

      expect(missingArgs).toEqual([]);
      expect(result.value).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
    }
  );
});
