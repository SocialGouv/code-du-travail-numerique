import type {
  PublicodesData,
  PublicodesPreavisDemissionResult,
} from "../../../../../publicodes";
import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1486");

describe("Validation de l'ordre des questions : CC 1486", () => {
  describe("Affiche les questions", () => {
    let result: PublicodesData<PublicodesPreavisDemissionResult>;

    beforeEach(() => {
      result = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1486'",
        },
        "contrat salarié . résultat conventionnel"
      );
    });

    it("doit demander en premier la catégorie professionnelle", () => {
      expect(result.missingArgs).toHaveNextMissingRule(
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle"
      );
    });

    describe("avec une catégorie professionnelle", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1486'",
            "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
              "'Employés, Techniciens ou Agents de maîtrise ETAM'",
          },
          "contrat salarié . résultat conventionnel"
        );
      });

      it("doit demander le coefficient hiérarchique", () => {
        expect(result.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient"
        );
      });

      describe("pour le coefficient de 240 à 355", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1486'",
              "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
                "'Employés, Techniciens ou Agents de maîtrise ETAM'",
              "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
                "'de 240 à 355'",
            },
            "contrat salarié . résultat conventionnel"
          );
        });

        it("doit demander l'ancienneté", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient de 240 à 355 . ancienneté"
          );
        });

        describe("pour l'ancienneté 2 ans ou moins", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC1486'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
                  "'Employés, Techniciens ou Agents de maîtrise ETAM'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
                  "'de 240 à 355'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient de 240 à 355 . ancienneté":
                  "'2 ans ou moins'",
              },
              "contrat salarié . résultat conventionnel"
            );
          });

          it("ne doit pas demander d'autres questions", () => {
            expect(result.missingArgs).toHaveNextMissingRule(null);
          });
        });

        describe("pour l'ancienneté Plus de 2 ans", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC1486'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
                  "'Employés, Techniciens ou Agents de maîtrise ETAM'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
                  "'de 240 à 355'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient de 240 à 355 . ancienneté":
                  "'Plus de 2 ans'",
              },
              "contrat salarié . résultat conventionnel"
            );
          });

          it("ne doit pas demander d'autres questions", () => {
            expect(result.missingArgs).toHaveNextMissingRule(null);
          });
        });
      });

      describe("pour le coefficient De 400 à 500", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1486'",
              "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
                "'Employés, Techniciens ou Agents de maîtrise ETAM'",
              "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
                "'De 400 à 500'",
            },
            "contrat salarié . résultat conventionnel"
          );
        });

        it("doit demander l'ancienneté", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient De 400 à 500 . ancienneté"
          );
        });

        describe("pour l'ancienneté 2 ans ou moins", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC1486'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
                  "'Employés, Techniciens ou Agents de maîtrise ETAM'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
                  "'De 400 à 500'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient De 400 à 500 . ancienneté":
                  "'2 ans ou moins'",
              },
              "contrat salarié . résultat conventionnel"
            );
          });

          it("ne doit pas demander d'autres questions", () => {
            expect(result.missingArgs).toHaveNextMissingRule(null);
          });
        });

        describe("pour l'ancienneté Plus de 2 ans", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC1486'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
                  "'Employés, Techniciens ou Agents de maîtrise ETAM'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
                  "'De 400 à 500'",
                "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle . Employés, Techniciens ou Agents de maîtrise ETAM . coefficient De 400 à 500 . ancienneté":
                  "'Plus de 2 ans'",
              },
              "contrat salarié . résultat conventionnel"
            );
          });

          it("ne doit pas demander d'autres questions", () => {
            expect(result.missingArgs).toHaveNextMissingRule(null);
          });
        });
      });
    });

    describe("pour la catégorie Chargés d'enquête intermittents", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1486'",
            "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
              "'Chargés d'enquête intermittents'",
          },
          "contrat salarié . résultat conventionnel"
        );
      });

      it("ne doit pas demander d'autres questions", () => {
        expect(result.missingArgs).toHaveNextMissingRule(null);
      });
    });

    describe("pour la catégorie Ingénieurs, Cadres", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1486'",
            "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
              "'Ingénieurs, Cadres'",
          },
          "contrat salarié . résultat conventionnel"
        );
      });

      it("ne doit pas demander d'autres questions", () => {
        expect(result.missingArgs).toHaveNextMissingRule(null);
      });
    });
  });
});
