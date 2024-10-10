import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "16"
);

describe("CC 16", () => {
  describe("Affiche les questions", () => {
    let result: PublicodesData<PublicodesIndemniteLicenciementResult>;

    beforeEach(() => {
      result = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0016'",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    });

    it("doit demander en premier la catégorie", () => {
      expect(result.missingArgs).toHaveNextMissingRule(
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle"
      );
    });

    describe("pour un ingénieur et cadre", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ingénieurs et cadres'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander si il a été TAM ou employés avant", () => {
        expect(result.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien"
        );
      });

      describe("si il n'a pas toujours été cadre", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC0016'",
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
                "'Ingénieurs et cadres'",
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
                "'Oui'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander la date du changement de status", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . date du statut cadre"
          );
        });

        describe("une fois la date du changement de status remplie", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC0016'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
                  "'Ingénieurs et cadres'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
                  "'Oui'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . date du statut cadre":
                  "01/01/2000",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("doit demander son age", () => {
            expect(result.missingArgs).toHaveNextMissingRule(
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age"
            );
            expect(result.missingArgs).toHaveNextMissingQuestion(
              "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
            );
          });
        });

        describe("si il a plus de 60 ans", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC0016'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
                  "'Ingénieurs et cadres'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age":
                  "61",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
                  "'Oui'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . date du statut cadre":
                  "01/01/2000",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("doit demander si il a le droit à la retraite", () => {
            expect(result.missingArgs).toHaveNextMissingRule(
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . droit à la retraite au titre du régime en vigueur dans l'entreprise"
            );
          });
        });

        describe("si il a 60 ans ou moins", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC0016'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
                  "'Ingénieurs et cadres'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age":
                  "60",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
                  "'Oui'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . date du statut cadre":
                  "01/01/2000",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("ne doit pas demander d'autres questions", () => {
            expect(result.missingArgs).toHaveNextMissingRule(null);
          });
        });
      });

      describe("si il a toujours été cadre", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC0016'",
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
                "'Ingénieurs et cadres'",
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
                "'Non'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander son age", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age"
          );
          expect(result.missingArgs).toHaveNextMissingQuestion(
            "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
          );
        });

        describe("si il a plus de 60 ans", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC0016'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
                  "'Ingénieurs et cadres'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age":
                  "61",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
                  "'Non'",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("doit demander si il a le droit à la retraite", () => {
            expect(result.missingArgs).toHaveNextMissingRule(
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . droit à la retraite au titre du régime en vigueur dans l'entreprise"
            );
          });
        });

        describe("si il a 60 ans ou moins", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC0016'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
                  "'Ingénieurs et cadres'",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age":
                  "60",
                "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
                  "'Non'",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("ne doit pas demander d'autres questions", () => {
            expect(result.missingArgs).toHaveNextMissingRule(null);
          });
        });
      });
    });

    describe("Pour un ouvrier", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Non'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander son age", () => {
        expect(result.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . autres licenciement . age"
        );
        expect(result.missingArgs).toHaveNextMissingQuestion(
          "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
        );
      });
    });

    describe("Pour un employé ou TAM", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Employés'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander son age", () => {
        expect(result.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age"
        );
        expect(result.missingArgs).toHaveNextMissingQuestion(
          "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
        );
      });
    });
  });
});
