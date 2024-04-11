import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1486"
);

describe("Validation de l'ordre des questions : CC 1486", () => {
  describe("Affiche les questions", () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let result: PublicodesData<PublicodesIndemniteLicenciementResult>;

    beforeEach(() => {
      result = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC1486'",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
    });

    it("doit demander en premier le type de licenciement catégorie", () => {
      expect(result?.missingArgs).toHaveNextMissingRule(
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle"
      );
    });

    describe("avec une catégorie professionnelle", () => {
      beforeEach(() => {
        result = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1486'",
            "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle":
              "'ETAM'",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      });

      it("doit demander la catégorie professionnelle", () => {
        expect(result?.missingArgs).toHaveNextMissingRule(
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement"
        );
      });

      describe("pour un autre type", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1486'",
              "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle":
                "'ETAM'",
              "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement":
                "non",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("ne doit pas demander d'autres questions", () => {
          expect(result?.missingArgs).toHaveNextMissingRule(null);
        });
      });

      describe("pour un refus", () => {
        beforeEach(() => {
          result = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1486'",
              "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle":
                "'ETAM'",
              "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . type de licenciement":
                "oui",
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        });

        it("ne doit pas demander d'autres questions", () => {
          expect(result?.missingArgs).toHaveNextMissingRule(null);
        });
      });
    });
  });
});
