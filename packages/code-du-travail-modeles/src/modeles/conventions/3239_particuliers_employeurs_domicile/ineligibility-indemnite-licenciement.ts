import { IneligibilityLegalIndemniteLicenciement } from "../../base";
import { CatPro3239 } from "./salary";

export class IneligibilityLegalIndemniteLicenciement3239 extends IneligibilityLegalIndemniteLicenciement {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const contractIneligibility = this.getContractIneligibility(args);
    if (contractIneligibility) {
      return contractIneligibility;
    }
    if (
      args[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ] &&
      args[
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
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
          ]
        )
      ) <
        9 / 12 &&
      args[
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
      ] === CatPro3239.assistantMaternel
    ) {
      return "<p>L’indemnité de licenciement n’est pas due lorsque l’ancienneté de l'assistant maternel est inférieure à 9 mois.</p>";
    }
    const seniorityIneligibility = this.getSeniorityIneligibility(args);
    if (seniorityIneligibility) {
      return seniorityIneligibility;
    }
  }
}
