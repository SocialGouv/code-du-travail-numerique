import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "650"
);

const defaultSituation = {
  "contrat salarié . convention collective": "'IDCC0650'",
};

describe("Ordre des questions pour la CC 650", () => {
  describe("Affiche les questions", () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let result: PublicodesData<PublicodesIndemniteLicenciementResult>;

    beforeEach(() => {
      result = engine.setSituation(
        {
          ...defaultSituation,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    });

    it("doit demander en premier si la date de notification est avant le 1er janvier 2024", () => {
      expect(result?.missingArgs).toHaveNextMissingRule(
        "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024"
      );
    });

    describe("notifier avant le 1er janvier", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            ...defaultSituation,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander son age", () => {
        expect(result?.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age"
        );
      });
    });

    describe("notifier après le 1er janvier", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            ...defaultSituation,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Non'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander sa catégorie pro", () => {
        expect(result?.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle"
        );
      });

      describe("pour la catégorie pro F, G, H ou I", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              ...defaultSituation,
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                "'F, G, H ou I'",
              "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
                "'Non'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander son age", () => {
          expect(result?.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . age"
          );
        });
      });

      describe("pour la catégorie pro A, B, C, D ou E", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              ...defaultSituation,
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                "'A, B, C, D ou E'",
              "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
                "'Non'",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("doit demander si forfait jour", () => {
          expect(result?.missingArgs).toHaveNextMissingRule(
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour"
          );
        });
      });
    });
  });
});
