import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import type {
  MissingArgs,
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const publicodes = new IndemniteLicenciementPublicodes(
  mergeIndemniteLicenciementModels()
);

describe("CC 16", () => {
  describe("Affiche les questions", () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let result: PublicodesData<PublicodesIndemniteLicenciementResult>;

    beforeEach(() => {
      result = publicodes.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0016'",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    });

    it("doit demander en premier la catégorie", () => {
      expect(getFirstMissing(result.missingArgs)).toEqual(
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle"
      );
    });

    describe("pour un ingénieur et cadre", () => {
      beforeEach(() => {
        result = publicodes.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ingénieurs et cadres'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander si il a été TAM ou employés avant", () => {
        expect(getFirstMissing(result.missingArgs)).toEqual(
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien"
        );
      });

      describe("si il n'a pas toujours été cadre", () => {
        beforeEach(() => {
          result = publicodes.setSituation(
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
          expect(getFirstMissing(result.missingArgs)).toEqual(
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . date du statut cadre"
          );
        });

        describe("une fois la date du changement de status remplie", () => {
          beforeEach(() => {
            result = publicodes.setSituation(
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
            expect(getFirstMissing(result.missingArgs)).toEqual(
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age"
            );
          });
        });

        describe("si il a plus de 60 ans", () => {
          beforeEach(() => {
            result = publicodes.setSituation(
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
            expect(getFirstMissing(result.missingArgs)).toEqual(
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . droit à la retraite au titre du régime en vigueur dans l'entreprise"
            );
          });
        });

        describe("si il a 60 ans ou moins", () => {
          beforeEach(() => {
            result = publicodes.setSituation(
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
            expect(getFirstMissing(result.missingArgs)).toBeNull();
          });
        });
      });

      describe("si il a toujours été cadre", () => {
        beforeEach(() => {
          result = publicodes.setSituation(
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
          expect(getFirstMissing(result.missingArgs)).toEqual(
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . age"
          );
        });

        describe("si il a plus de 60 ans", () => {
          beforeEach(() => {
            result = publicodes.setSituation(
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
            expect(getFirstMissing(result.missingArgs)).toEqual(
              "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . droit à la retraite au titre du régime en vigueur dans l'entreprise"
            );
          });
        });

        describe("si il a 60 ans ou moins", () => {
          beforeEach(() => {
            result = publicodes.setSituation(
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
            expect(getFirstMissing(result.missingArgs)).toBeNull();
          });
        });
      });
    });
  });
});

const getFirstMissing = (missingVariables: MissingArgs[]): string | null => {
  const missingVars = missingVariables
    .filter((arg) => arg.rawNode.cdtn !== undefined)
    .sort((a, b) => b.indice - a.indice);
  if (missingVars.length === 0) {
    return null;
  }
  return replaceAll(missingVars[0].name, " - ", " . ");
};

const replaceAll = (string: string, search: string, replace: string) => {
  return string.split(search).join(replace);
};
