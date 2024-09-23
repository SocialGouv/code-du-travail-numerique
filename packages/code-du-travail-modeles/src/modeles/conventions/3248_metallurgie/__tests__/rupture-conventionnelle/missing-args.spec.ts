import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "../../../../../publicodes";
import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "3248"
);

const defaultSituation = {
  "contrat salarié . convention collective": "'IDCC3248'",
};

describe("CC 3248 - Ordre des questions pour la rupture conventionnelle", () => {
  describe("Affiche les questions", () => {
     
    let result: PublicodesData<PublicodesIndemniteLicenciementResult>;

    beforeEach(() => {
      result = engine.setSituation(
        {
          ...defaultSituation,
          "contrat salarié . convention collective": "'IDCC3248'",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    });

    it("doit demander en premier la catégorie", () => {
      expect(result.missingArgs).toHaveNextMissingRule(
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle"
      );
    });

    describe("pour une catégorie ABCDE", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            ...defaultSituation,
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'A, B, C, D ou E'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander si il a été au forfait jour", () => {
        expect(result.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour"
        );
      });

      describe("si il a été au forfait jour", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              ...defaultSituation,
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                "'A, B, C, D ou E'",
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
                "'Oui'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander si il a toujours été au forfait jour", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour"
          );
        });

        describe("si il a répondu non", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                ...defaultSituation,
                "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                  "'A, B, C, D ou E'",
                "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
                  "'Oui'",
                "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour":
                  "'Non'",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("doit demander la date du passage au forfait jour", () => {
            expect(result.missingArgs).toHaveNextMissingRule(
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour . date"
            );
          });
          describe("si il a renseigné une date", () => {
            beforeEach(() => {
              result = engine.setSituation(
                {
                  ...defaultSituation,
                  "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                    "'A, B, C, D ou E'",
                  "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
                    "'Oui'",
                  "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour . date":
                    "01/01/2020",
                  "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour":
                    "'Non'",
                },
                "contrat salarié . indemnité de licenciement . résultat conventionnel"
              );
            });

            it("doit demander si il était cadre", () => {
              expect(result.missingArgs).toHaveNextMissingRule(
                "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre"
              );
            });

            describe("si il a répondu non", () => {
              beforeEach(() => {
                result = engine.setSituation(
                  {
                    ...defaultSituation,
                    "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                      "'A, B, C, D ou E'",
                    "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
                      "'Non'",
                    "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
                      "'Oui'",
                    "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour":
                      "'Oui'",
                  },
                  "contrat salarié . indemnité de licenciement . résultat conventionnel"
                );
              });

              it("ne doit plus poser de question", () => {
                expect(result.missingArgs).toHaveNextMissingRule(null);
              });
            });
          });
        });

        describe("si il a répondu oui", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                ...defaultSituation,
                "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                  "'A, B, C, D ou E'",
                "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
                  "'Oui'",
                "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour":
                  "'Oui'",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("doit demander si il était cadre", () => {
            expect(result.missingArgs).toHaveNextMissingRule(
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre"
            );
          });
        });
      });

      describe("si il n'est pas au forfait jour", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              ...defaultSituation,
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                "'A, B, C, D ou E'",
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
                "'Non'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander s'il a été classé cadre antérieurement", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre"
          );
        });
      });
    });

    describe("pour une catégorie FGHI", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            ...defaultSituation,
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'F, G, H ou I'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander son age", () => {
        expect(result.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . métallurgie . rupture conventionnelle . age"
        );

        expect(result.missingArgs).toHaveNextMissingQuestion(
          "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
        );
      });

      describe("s'il a plus de 60 ans", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              ...defaultSituation,
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                "'F, G, H ou I'",
              "contrat salarié . convention collective . métallurgie . rupture conventionnelle . age":
                "61",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander s'il remplit les conditions pour partir à la retraite", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . remplit conditions pour la retraite"
          );
        });
      });

      describe("s'il a 60 ans (ou moins)", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              ...defaultSituation,
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                "'F, G, H ou I'",
              "contrat salarié . convention collective . métallurgie . rupture conventionnelle . age":
                "60",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander si il a été licencié pour absences répétées ou prolongées", () => {
          expect(result.missingArgs).toHaveNextMissingRule(null);
        });
      });
    });
  });
});
