import { IneligibilityLegalIndemniteLicenciement } from "../../base";

export class IneligibilityLegalIndemniteLicenciement2596 extends IneligibilityLegalIndemniteLicenciement {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const contractIneligibility = this.getContractIneligibility(args);
    if (contractIneligibility) {
      return contractIneligibility;
    }
    if (
      args[
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle"
      ] &&
      !["'Cadres'", "'Agents de maîtrise'"].includes(
        args[
          "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle"
        ]
      ) &&
      args[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ] &&
      Math.max(
        parseFloat(
          args[
            "contrat salarié . indemnité de licenciement . ancienneté requise en année"
          ]
        ),
        parseFloat(
          args[
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
          ] ?? "0"
        )
      ) < 8
    ) {
      return "<p>L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.</p>";
    }
  }
}
