import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "16"
);

describe("Wording question sur la rupture conventionnelle", () => {
  describe("Ouvrier", () => {
    test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
          "'Non'",
      };

      const { missingArgs } = engine.calculate(input);
      expect(missingArgs).toHaveNextMissingQuestion(
        "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
      );
    });
  });
  describe("Cadre", () => {
    test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
          "'Ingénieurs et cadres'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien":
          "'Oui'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . date du statut cadre":
          "01/01/2000",
      };

      const { missingArgs } = engine.calculate(input);
      expect(missingArgs).toHaveNextMissingQuestion(
        "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
      );
    });
  });
  describe("Employé ou TAM", () => {
    test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
          "'Employés'",
      };

      const { missingArgs } = engine.calculate(input);
      expect(missingArgs).toHaveNextMissingQuestion(
        "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
      );
    });
  });
});
