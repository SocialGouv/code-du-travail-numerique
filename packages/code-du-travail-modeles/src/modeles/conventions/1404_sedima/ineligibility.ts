import { IneligibilityLegal } from "../../base";

export class Ineligibility1404 extends IneligibilityLegal {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (args.typeContratTravail && args.typeContratTravail === "'cdd'") {
      return "L’indemnité de licenciement n’est pas due pour les CDD et contrats de travail temporaires. Sous certaines conditions, le salarié peut avoir le droit à une indemnité de précarité.";
    } else if (
      args.licenciementFauteGrave &&
      args.licenciementFauteGrave === "oui"
    ) {
      return "L’indemnité de licenciement n’est pas due en cas de faute grave (ou lourde). Lorsqu’il est invoqué, le motif de faute grave doit apparaître précisément dans le courrier. Reportez-vous à la lettre de notification de licenciement.";
    } else if (
      args[
        "contrat salarié . convention collective . sedima . question cdi opération"
      ] &&
      args[
        "contrat salarié . convention collective . sedima . question cdi opération"
      ] === "non" &&
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
