import { IneligibilityLegalIndemniteLicenciement } from "../../base";

export class Ineligibility1404 extends IneligibilityLegalIndemniteLicenciement {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const contractIneligibility = this.getContractIneligibility(args);
    if (contractIneligibility) {
      return contractIneligibility;
    }
    console.log("args", args);
    if (
      args[
        "contrat salarié . convention collective . sedima . question cdi opération"
      ] &&
      args[
        "contrat salarié . convention collective . sedima . question cdi opération"
      ] === "non" &&
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
      return "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.";
    }
  }
}
