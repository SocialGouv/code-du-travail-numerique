import { IneligibilityLegal } from "../../base";

export class Ineligibility2596 extends IneligibilityLegal {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (
      args[
        "contrat salarié . indemnité de licenciement . type du contrat de travail"
      ] &&
      args[
        "contrat salarié . indemnité de licenciement . type du contrat de travail"
      ] === "'cdd'"
    ) {
      return "L’indemnité de licenciement n’est pas due pour les CDD et contrats de travail temporaires. Sous certaines conditions, le salarié peut avoir le droit à une indemnité de précarité.";
    } else if (
      args[
        "contrat salarié . indemnité de licenciement . licenciement pour faute grave"
      ] &&
      args[
        "contrat salarié . indemnité de licenciement . licenciement pour faute grave"
      ] === "oui"
    ) {
      return "L’indemnité de licenciement n’est pas due en cas de faute grave (ou lourde). Lorsqu’il est invoqué, le motif de faute grave doit apparaître précisément dans le courrier. Reportez-vous à la lettre de notification de licenciement.";
    } else if (
      args[
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle"
      ] &&
      !["'Cadres'", "'Agents de maîtrise'"].includes(
        args[
          "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle"
        ]
      ) &&
      args[
        "contrat salarié . indemnité de licenciement . ancienneté en année"
      ] &&
      parseFloat(
        args[
          "contrat salarié . indemnité de licenciement . ancienneté en année"
        ]
      ) < 8
    ) {
      return "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.";
    }
  }
}
