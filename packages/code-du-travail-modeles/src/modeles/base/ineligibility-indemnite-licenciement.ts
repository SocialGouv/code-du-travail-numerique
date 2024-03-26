import type { IInegibility } from "../common/types/ineligibility";

export class IneligibilityLegalIndemniteLicenciement implements IInegibility {
  getContractIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (args.typeContratTravail && args.typeContratTravail === "cdd") {
      return "L’indemnité de licenciement n’est pas due pour les CDD et contrats de travail temporaires. Sous certaines conditions, le salarié peut avoir le droit à une indemnité de précarité.";
    } else if (
      args.licenciementFauteGrave &&
      args.licenciementFauteGrave === "oui"
    ) {
      return "L’indemnité de licenciement n’est pas due en cas de faute grave (ou lourde). Lorsqu’il est invoqué, le motif de faute grave doit apparaître précisément dans le courrier. Reportez-vous à la lettre de notification de licenciement.";
    }
  }

  getSeniorityIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (
      args[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ] &&
      args[
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
      ] &&
      args[
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle"
      ] === "non" &&
      Math.max(
        parseFloat(
          args[
            "contrat salarié . indemnité de licenciement . ancienneté requise en année"
          ]
        ),
        parseFloat(
          args[
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
          ]
        )
      ) <
        8 / 12
    ) {
      return "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.";
    }
  }

  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const contractIneligility = this.getContractIneligibility(args);
    if (contractIneligility) {
      return contractIneligility;
    }
    const seniorityIneligibility = this.getSeniorityIneligibility(args);
    if (seniorityIneligibility) {
      return seniorityIneligibility;
    }
  }
}
