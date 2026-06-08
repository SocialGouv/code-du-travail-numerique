import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3239"
);

describe("CC 3239", () => {
  describe("Affiche les questions", () => {
    let result: PublicodesData<PublicodesIndemniteLicenciementResult>;

    beforeEach(() => {
      result = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC3239'",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    });

    it("doit demander en premier la catégorie", () => {
      expect(result.missingArgs).toHaveNextMissingRule(
        "contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-indemnite-de-licenciement-categorie-professionnelle"
      );
    });

    describe("pour un assistant maternel et cadre", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC3239'",
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
              "'Assistant maternel'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander si c'est un licenciement à cause d'une suspension, modification ou retrait de l'agrément de l'assistant maternel", () => {
        expect(result.missingArgs).toHaveNextMissingRule(
          "contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-indemnite-de-licenciement-categorie-professionnelle-assistante-maternelle-type-de-licenciement"
        );
      });

      describe("pour un licenciement à cause d'une suspension, modification ou retrait de l'agrément de l'assistant maternel", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC3239'",
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
                "'Assistant maternel'",
              "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
                "non",
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement":
                "'Oui'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("ne doit plus poser de questions", () => {
          expect(result.missingArgs).toHaveNextMissingRule(null);
        });
      });

      describe("pour un cas classique", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC3239'",
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
                "'Assistant maternel'",
              "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
                "non",
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement":
                "'Non'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander le total des salaires", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-indemnite-de-licenciement-categorie-professionnelle-assistante-maternelle-type-de-licenciement-autres-total-salaires"
          );
        });

        describe("on renseigne le total des salaires", () => {
          beforeEach(() => {
            result = engine.setSituation(
              {
                "contrat salarié . convention collective": "'IDCC3239'",
                "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
                  "'Assistant maternel'",
                "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
                  "non",
                "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement":
                  "'Non'",
                "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires":
                  "3000",
              },
              "contrat salarié . indemnité de licenciement . résultat conventionnel"
            );
          });

          it("doit demander le total des salaires", () => {
            expect(result.missingArgs).toHaveNextMissingRule(null);
          });
        });
      });

      describe("pour un licenciement pour inaptitude", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC3239'",
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
                "'Assistant maternel'",
              "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
                "oui",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander le total des salaires", () => {
          expect(result.missingArgs).toHaveNextMissingRule(
            "contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-indemnite-de-licenciement-categorie-professionnelle-assistante-maternelle-type-de-licenciement-autres-total-salaires"
          );
        });
      });
    });
  });
});
