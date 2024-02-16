import { IneligibilityLegal } from "../../base";
import { CatPro3239 } from "./salary";

export class Ineligibility3239 extends IneligibilityLegal {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
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
      ] === `'${CatPro3239.assistantMaternel}'`
    ) {
      return "L’indemnité de licenciement n’est pas due lorsque l’ancienneté de l'assistant maternel est inférieure à 9 mois.";
    } else {
      return super.getIneligibility(args);
    }
  }
}
