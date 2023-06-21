import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { QuestionOuiNon } from "../../../../common";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2120"
);

const refLicenciementDisciplinaire = [
  {
    article: "Article 26",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005779933?idConteneur=KALICONT000005635780",
  },
  {
    article: "Article 29.2.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005783374?idConteneur=KALICONT000005635780&origin=list#KALIARTI000005783374",
  },
  {
    article: "Article 59.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000036551975?idConteneur=KALICONT000005635780&origin=list#KALIARTI000036551975",
  },
];

const refLicenciementEco = [
  {
    article: "Article 29",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005783374?idConteneur=KALICONT000005635780",
  },
  {
    article: "Article 29.2.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005783374?idConteneur=KALICONT000005635780&origin=list#KALIARTI000005783374",
  },
  {
    article: "Article 59.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000036551975?idConteneur=KALICONT000005635780&origin=list#KALIARTI000036551975",
  },
];

const fallbackRef = [
  {
    article: "Article 27",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005781062?idConteneur=KALICONT000005635780",
  },
  {
    article: "Article 28",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005782174?idConteneur=KALICONT000005635780",
  },
  {
    article: "Article 29.2.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005783374?idConteneur=KALICONT000005635780&origin=list#KALIARTI000005783374",
  },
  {
    article: "Article 59.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000036551975?idConteneur=KALICONT000005635780&origin=list#KALIARTI000036551975",
  },
];

describe("Vérification des références juridiques pour la CC 2120", () => {
  test.each`
    entryDate       | categoriePro    | semestresAvant2002 | semestresApres2002 | licenciementEco       | licenciementDisciplinaire | seniorityRight | seniority | salary  | expectedRef
    ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.67}        | ${0.67}   | ${2000} | ${fallbackRef}
    ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.67}        | ${15}     | ${2000} | ${fallbackRef}
    ${"01/01/1999"} | ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${1}      | ${1991} | ${refLicenciementEco}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${1991} | ${refLicenciementEco}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${25}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${1991} | ${refLicenciementEco}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${19}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${1991} | ${refLicenciementEco}
    ${"01/01/1999"} | ${"Cadres"}     | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${1}      | ${3064} | ${refLicenciementEco}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${3064} | ${refLicenciementEco}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${25}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${3064} | ${refLicenciementEco}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${19}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${3064} | ${refLicenciementEco}
    ${"01/01/2000"} | ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${1}      | ${1991} | ${refLicenciementEco}
    ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${36}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${1991} | ${refLicenciementEco}
    ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${27}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${1991} | ${refLicenciementEco}
    ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${21}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${1991} | ${refLicenciementEco}
    ${"01/01/1999"} | ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${1}      | ${2772} | ${refLicenciementDisciplinaire}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${2772} | ${refLicenciementDisciplinaire}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${25}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${15.67}  | ${2772} | ${refLicenciementDisciplinaire}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${19}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${12.5}   | ${2772} | ${refLicenciementDisciplinaire}
    ${"01/01/1999"} | ${"Cadres"}     | ${2}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${1}      | ${2772} | ${refLicenciementDisciplinaire}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${2772} | ${refLicenciementDisciplinaire}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${25}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${15.67}  | ${2772} | ${refLicenciementDisciplinaire}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${19}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${12.5}   | ${2772} | ${refLicenciementDisciplinaire}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772} | ${refLicenciementDisciplinaire}
  `(
    "$#) Catégorie pro $categoriePro, entryDate $entryDate, seniorityRight: $seniorityRight an, semestresAvant2002 $semestresAvant2002, semestresApres2002 $semestresApres2002, licenciementDisciplinaire $licenciementDisciplinaire, licenciementEco $licenciementEco, salaire de référence: $salary => $expectedRef",
    ({
      categoriePro,
      licenciementEco,
      licenciementDisciplinaire,
      semestresAvant2002,
      semestresApres2002,
      seniorityRight,
      salary,
      expectedRef,
      seniority,
      entryDate,
    }) => {
      engine.setSituation(
        Object.assign(
          {
            "contrat salarié . convention collective": "'IDCC2120'",
            "contrat salarié . convention collective . banque . catégorie professionnelle": `'${categoriePro}'`,

            "contrat salarié . convention collective . banque . licenciement économique": `'${licenciementEco}'`,
            "contrat salarié . convention collective . banque . semestres complets après 2002":
              semestresApres2002,
            "contrat salarié . convention collective . banque . semestres complets avant 2002":
              semestresAvant2002,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . date d'entrée":
              entryDate,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          licenciementDisciplinaire
            ? {
                "contrat salarié . convention collective . banque . licenciement disciplinaire": `'${licenciementDisciplinaire}'`,
              }
            : {}
        ),
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );

      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(expectedRef.length);
      expect(result).toEqual(expectedRef);
    }
  );
});
