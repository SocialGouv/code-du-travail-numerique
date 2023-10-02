import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { QuestionOuiNon } from "../../../../common";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2120"
);

describe("Formule indemnité licenciement pour la CC 2120", () => {
  test.each`
    entryDate       | categoriePro    | semestresAvant2002 | semestresApres2002 | licenciementEco       | licenciementDisciplinaire | seniorityRight | seniority | salary   | expectedFormula                                      | expectedExplanations
    ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${undefined}              | ${0}           | ${0}      | ${2000}  | ${""}                                                | ${[]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.5}         | ${0.5}    | ${2000}  | ${""}                                                | ${[]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.67}        | ${0.67}   | ${2000}  | ${"1/4 * Sref * A"}                                  | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (2000 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.67}        | ${15}     | ${2000}  | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"}           | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (5 ans)", "Sref : Salaire de référence (2000 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${1}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${0.91}        | ${0.91}   | ${1991}  | ${""}                                                | ${[]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${1}      | ${1991}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (2 semestres)", "Sref : Salaire de référence (1991 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${1991}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (34 semestres)", "Sref : Salaire de référence (1991 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${25}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${1991}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (25 semestres)", "Sref : Salaire de référence (1991 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${19}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${1991}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (19 semestres)", "Sref : Salaire de référence (1991 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${1}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${0.91}        | ${0.91}   | ${3064}  | ${""}                                                | ${[]}
    ${"01/01/1999"} | ${"Cadres"}     | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${1}      | ${3064}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (2 semestres)", "Sref : Salaire de référence (3064 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${3064}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (34 semestres)", "Sref : Salaire de référence (3064 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${25}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${3064}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (25 semestres)", "Sref : Salaire de référence (3064 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${19}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${3064}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (19 semestres)", "Sref : Salaire de référence (3064 €)"]}
    ${"01/01/2000"} | ${"Non-cadres"} | ${0}               | ${1}               | ${QuestionOuiNon.oui} | ${undefined}              | ${0.91}        | ${0.91}   | ${1991}  | ${""}                                                | ${[]}
    ${"01/01/2000"} | ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${1}      | ${1991}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (2 semestres)", "Sref : Salaire de référence (1991 €)"]}
    ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${36}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${1991}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (4 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (36 semestres)", "Sref : Salaire de référence (1991 €)"]}
    ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${27}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${1991}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (4 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (27 semestres)", "Sref : Salaire de référence (1991 €)"]}
    ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${21}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${1991}  | ${"(1/2 * Sref * A1) + (1/4 * Sref * A2)"}           | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (4 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (21 semestres)", "Sref : Salaire de référence (1991 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${1}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${0.91}        | ${0.91}   | ${2772}  | ${""}                                                | ${[]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${2}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${1}      | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (2 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (34 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${25}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${15.67}  | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (25 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${19}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${12.5}   | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (19 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${0}               | ${1}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${0.91}        | ${0.91}   | ${2772}  | ${""}                                                | ${[]}
    ${"01/01/1999"} | ${"Cadres"}     | ${2}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${1}      | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (2 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (34 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${25}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${15.67}  | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (25 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${19}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${12.5}   | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (19 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${1}               | ${0}               | ${QuestionOuiNon.oui} | ${undefined}              | ${0.91}        | ${0.91}   | ${2772}  | ${""}                                                | ${[]}
    ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772}  | ${"(1/2 * 13/14,5 * Sref * A1) + (1/5 * Sref * A2)"} | ${["A1 : Semestres complets d'ancienneté acquis dans l'entreprise antérieurement au 1er janvier 2002 (6 semestres)", "A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (42 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${0}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772}  | ${"(1/5 * Sref * A2)"}                               | ${["A2 : Semestres complets d'ancienneté dans l'entreprise acquis à partir du 1er janvier 2002 (42 semestres)", "Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${1000}            | ${1000}            | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772}  | ${"24 * Sref"}                                       | ${["Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${1000}            | ${1000}            | ${QuestionOuiNon.oui} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772}  | ${"18 * Sref"}                                       | ${["Sref : Salaire de référence (2772 €)"]}
    ${"01/01/1999"} | ${"Non-cadres"} | ${1200}            | ${1200}            | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1200}        | ${1200}   | ${27720} | ${"18 * 13 / 14.5 * Sref"}                           | ${["Sref : Salaire de référence (27720 €)"]}
    ${"01/01/1999"} | ${"Cadres"}     | ${1200}            | ${1200}            | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1200}        | ${1200}   | ${27720} | ${"24 * 13 / 14.5 * Sref"}                           | ${["Sref : Salaire de référence (27720 €)"]}
  `(
    "$#) Catégorie pro $categoriePro, entryDate $entryDate, seniorityRight: $seniorityRight an, semestresAvant2002 $semestresAvant2002, semestresApres2002 $semestresApres2002, licenciementDisciplinaire $licenciementDisciplinaire, licenciementEco $licenciementEco, salaire de référence: $salary => $expectedCompensation",
    ({
      categoriePro,
      licenciementEco,
      licenciementDisciplinaire,
      semestresAvant2002,
      semestresApres2002,
      seniorityRight,
      salary,
      expectedFormula,
      expectedExplanations,
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
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
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

      const formule = engine.getFormule();

      expect(formule.explanations).toEqual(expectedExplanations);
      expect(formule.formula).toEqual(expectedFormula);
    }
  );
});
