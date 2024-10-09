import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1672"
);

describe("Validation de l'ordre des questions : CC 1672", () => {
  describe("Affiche les questions", () => {
    let result: PublicodesData<PublicodesIndemniteLicenciementResult>;

    beforeEach(() => {
      result = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1672'",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    });

    it("doit demander en premier la catégorie", () => {
      expect(result.missingArgs).toHaveNextMissingRule(
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle"
      );
    });

    describe("pour un cadre", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1672'",
            "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
              "'Cadres (Classes 5 à 7)'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander si il a été non cadres avant", () => {
        expect(result.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres"
        );
      });

      describe("si il n'a pas toujours été cadre", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1672'",
              "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
                "'Cadres (Classes 5 à 7)'",
              "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres":
                "'Oui'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander la date du changement de status", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . date du statut cadre"
          );
        });

        describe("une fois la date du changement de status remplie", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC1672'",
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
                  "'Cadres (Classes 5 à 7)'",
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres":
                  "'Oui'",
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . date du statut cadre":
                  "01/01/2000",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("doit demander son age", () => {
            expect(result.missingArgs).toHaveNextMissingRule(
              "contrat salarié . convention collective . sociétés d'assurances . age"
            );
            expect(result.missingArgs).toHaveNextMissingQuestion(
              "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
            );
          });
        });

        describe("une fois l'age saisi", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC1672'",
                "contrat salarié . convention collective . sociétés d'assurances . age":
                  "49",
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
                  "'Cadres (Classes 5 à 7)'",
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres":
                  "'Oui'",
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . date du statut cadre":
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
              "contrat salarié . convention collective": "'IDCC1672'",
              "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
                "'Cadres (Classes 5 à 7)'",
              "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres":
                "'Non'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander son age", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . sociétés d'assurances . age"
          );
          expect(result.missingArgs).toHaveNextMissingQuestion(
            "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
          );
        });

        describe("une fois l'age saisi", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC1672'",
                "contrat salarié . convention collective . sociétés d'assurances . age":
                  "49",
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
                  "'Cadres (Classes 5 à 7)'",
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres":
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
  });
});
