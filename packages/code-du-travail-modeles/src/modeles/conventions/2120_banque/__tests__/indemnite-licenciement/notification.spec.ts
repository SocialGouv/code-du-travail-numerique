import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { QuestionOuiNon } from "../../../../common";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2120"
);

const notification = [
  {
    description: `Si lors de l’absence pour maladie non professionnelle le salarié a bénéficié d’une indemnisation complémentaire versée par l'employeur (maintien de salaire), en plus des indemnités journalières de la sécurité sociale, le montant de l’indemnité de licenciement pourrait être plus élevé. En effet, dans ce cas, la période d’absence est intégrée dans l’ancienneté du salarié.
Par soucis de simplification, ce simulateur déduit toutes les absences pour maladie non professionnelle sans distinguer, pour calculer l’ancienneté du salarié, selon qu’elles ont été indemnisées ou pas.
`,
  },
];

const notification2 = [
  {
    description: `Si lors de l’absence pour accident de trajet le salarié a bénéficié d’une indemnisation complémentaire versée par l'employeur (maintien de salaire), en plus des indemnités journalières de la sécurité sociale, le montant de l’indemnité de licenciement pourrait être plus élevé. En effet, dans ce cas, la période d’absence est intégrée dans l’ancienneté du salarié.
Par soucis de simplification, ce simulateur déduit toutes les absences pour accident de trajet sans distinguer, pour calculer l’ancienneté du salarié, selon qu’elles ont été indemnisées ou pas.
`,
  },
];

describe("Notifications pour la CC 2120", () => {
  describe("Maladie non pro", () => {
    describe("Affiche une notification", () => {
      test.each`
        entryDate       | categoriePro    | semestresAvant2002 | semestresApres2002 | licenciementEco       | licenciementDisciplinaire | seniorityRight | seniority | salary  | expectedNotif
        ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${0.67}        | ${15}     | ${2000} | ${notification}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${3064} | ${notification}
        ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${27}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${1991} | ${notification}
        ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${21}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${1991} | ${notification}
        ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${2772} | ${notification}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772} | ${notification}
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
          expectedNotif,
          seniority,
          entryDate,
        }) => {
          engine.setSituation(
            Object.assign(
              {
                "contrat salarié . convention collective": "'IDCC2120'",
                "contrat salarié . convention collective . banque . catégorie professionnelle": `'${categoriePro}'`,

                "contrat salarié . convention collective . banque . licenciement économique": `'${licenciementEco}'`,
                "contrat salarié . convention collective . banque . maladie non pro":
                  "oui",
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

          const notifs = engine.getNotifications();
          expect(notifs).toHaveLength(expectedNotif.length);
          const notifsToCompare = notifs.map((notif) => {
            return {
              description: notif.description,
            };
          });
          expect(notifsToCompare).toEqual(expectedNotif);
        }
      );
    });

    describe("N'affiche pas la notification", () => {
      test.each`
        entryDate       | categoriePro    | semestresAvant2002 | semestresApres2002 | licenciementEco       | licenciementDisciplinaire | seniorityRight | seniority | salary
        ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.67}        | ${15}     | ${2000}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${3064}
        ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${27}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${1991}
        ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${21}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${1991}
        ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${2772}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${24}     | ${2772}
      `(
        "$#) Catégorie pro $categoriePro, entryDate $entryDate, seniorityRight: $seniorityRight an, semestresAvant2002 $semestresAvant2002, semestresApres2002 $semestresApres2002, licenciementDisciplinaire $licenciementDisciplinaire, licenciementEco $licenciementEco, salaire de référence: $salary",
        ({
          categoriePro,
          licenciementEco,
          licenciementDisciplinaire,
          semestresAvant2002,
          semestresApres2002,
          seniorityRight,
          salary,
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

          expect(engine.getNotifications()).toHaveLength(0);
        }
      );
    });
  });

  describe("Accident de trajet", () => {
    describe("Affiche une notification", () => {
      test.each`
        entryDate       | categoriePro    | semestresAvant2002 | semestresApres2002 | licenciementEco       | licenciementDisciplinaire | seniorityRight | seniority | salary  | expectedNotif
        ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${0.67}        | ${15}     | ${2000} | ${notification2}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${3064} | ${notification2}
        ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${27}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${1991} | ${notification2}
        ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${21}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${1991} | ${notification2}
        ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${2772} | ${notification2}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772} | ${notification2}
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
          expectedNotif,
          seniority,
          entryDate,
        }) => {
          engine.setSituation(
            Object.assign(
              {
                "contrat salarié . convention collective": "'IDCC2120'",
                "contrat salarié . convention collective . banque . accident trajet":
                  "oui",
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

          const notifs = engine.getNotifications();
          expect(notifs).toHaveLength(expectedNotif.length);
          const notifsToCompare = notifs.map((notif) => {
            return {
              description: notif.description,
            };
          });
          expect(notifsToCompare).toEqual(expectedNotif);
        }
      );
    });

    describe("N'affiche pas de notification", () => {
      test.each`
        entryDate       | categoriePro    | semestresAvant2002 | semestresApres2002 | licenciementEco       | licenciementDisciplinaire | seniorityRight | seniority | salary
        ${"01/01/1999"} | ${"Non-cadres"} | ${0}               | ${0}               | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${0.67}        | ${15}     | ${2000}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${34}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${20}     | ${3064}
        ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${27}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${15.67}  | ${1991}
        ${"01/01/2000"} | ${"Non-cadres"} | ${4}               | ${21}              | ${QuestionOuiNon.oui} | ${undefined}              | ${1}           | ${12.5}   | ${1991}
        ${"01/01/1999"} | ${"Non-cadres"} | ${6}               | ${34}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${20}     | ${2772}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.non}     | ${1}           | ${24}     | ${2772}
        ${"01/01/1999"} | ${"Cadres"}     | ${6}               | ${42}              | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui}     | ${1}           | ${24}     | ${2772}
      `(
        "$#) Catégorie pro $categoriePro, entryDate $entryDate, seniorityRight: $seniorityRight an, semestresAvant2002 $semestresAvant2002, semestresApres2002 $semestresApres2002, licenciementDisciplinaire $licenciementDisciplinaire, licenciementEco $licenciementEco, salaire de référence: $salary",
        ({
          categoriePro,
          licenciementEco,
          licenciementDisciplinaire,
          semestresAvant2002,
          semestresApres2002,
          seniorityRight,
          salary,
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

          expect(engine.getNotifications()).toHaveLength(0);
        }
      );
    });
  });
});
