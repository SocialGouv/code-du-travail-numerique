import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { QuestionOuiNon } from "../../../../common";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2120"
);

describe("Indemnité conventionnel de licenciement pour la CC 2120", () => {
  test.each`
    categoriePro    | semestresAvant2002 | semestresApres2002 | licenciementEco       | licenciementDisciplinaire | seniorityRight | seniority | salary  | expectedCompensation
    ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${0}           | ${0}      | ${2000} | ${0}
    ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.5}         | ${0.5}    | ${2000} | ${0}
    ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.67}        | ${0.67}   | ${2000} | ${335}
    ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.67}        | ${15}     | ${2000} | ${8333.33}
    ${"Non-cadres"} | ${1}               | ${0}               | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${0.91}        | ${0.91}   | ${1991} | ${0}
    ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${1}      | ${1991} | ${1991}
    ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${1991} | ${22896.5}
    ${"Non-cadres"} | ${6}               | ${25}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${15.67}  | ${1991} | ${18416.75}
    ${"Non-cadres"} | ${6}               | ${19}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${12.5}   | ${1991} | ${15430.25}
    ${"Cadres"}     | ${1}               | ${0}               | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${0.91}        | ${0.91}   | ${3064} | ${0}
    ${"Cadres"}     | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${1}      | ${3064} | ${3064}
    ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${3064} | ${35236}
    ${"Cadres"}     | ${6}               | ${25}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${15.67}  | ${3064} | ${28342}
    ${"Cadres"}     | ${6}               | ${19}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${12.5}   | ${3064} | ${23746}
    ${"Non-cadres"} | ${0}               | ${1}               | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${0.91}        | ${0.91}   | ${1991} | ${0}
    ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${1}      | ${1991} | ${1991}
    ${"Non-cadres"} | ${4}               | ${36}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${1991} | ${21901}
    ${"Non-cadres"} | ${4}               | ${27}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${15.67}  | ${1991} | ${17421.25}
    ${"Non-cadres"} | ${4}               | ${21}              | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${12.5}   | ${1991} | ${14434.75}
    ${"Non-cadres"} | ${0}               | ${1}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.91}        | ${0.91}   | ${2772} | ${0}
    ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${1}      | ${2772} | ${2485.24}
    ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${20}     | ${2772} | ${26305.32}
    ${"Non-cadres"} | ${6}               | ${25}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${15.67}  | ${2772} | ${21315.72}
    ${"Non-cadres"} | ${6}               | ${19}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${12.5}   | ${2772} | ${17989.32}
    ${"Cadres"}     | ${0}               | ${1}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.91}        | ${0.91}   | ${2772} | ${0}
    ${"Cadres"}     | ${2}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${1}      | ${2772} | ${2485.24}
    ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${20}     | ${2772} | ${26305.32}
    ${"Cadres"}     | ${6}               | ${25}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${15.67}  | ${2772} | ${21315.72}
    ${"Cadres"}     | ${6}               | ${19}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${12.5}   | ${2772} | ${17989.32}
    ${"Non-cadres"} | ${1}               | ${0}               | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${0.91}        | ${0.91}   | ${2772} | ${0}
  `(
    "$#) Catégorie pro $categoriePro, seniorityRight: $seniorityRight an, semestresAvant2002 $semestresAvant2002, semestresApres2002 $semestresApres2002, licenciementDisciplinaire $licenciementDisciplinaire, licenciementEco $licenciementEco, salaire de référence: $salary => $expectedCompensation",
    ({
      categoriePro,
      licenciementEco,
      licenciementDisciplinaire,
      semestresAvant2002,
      semestresApres2002,
      seniorityRight,
      salary,
      expectedCompensation,
      seniority,
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
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
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
