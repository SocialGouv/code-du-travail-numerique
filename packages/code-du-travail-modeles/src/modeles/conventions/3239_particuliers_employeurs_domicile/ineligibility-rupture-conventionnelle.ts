import { IneligibilityRuptureConventionnelle } from "../../base";
import { CatPro3239 } from "./salary";

export class IneligibilityRuptureConventionnelle3239 extends IneligibilityRuptureConventionnelle {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const contractIneligibility = this.getContractIneligibility(args);
    if (contractIneligibility) {
      return contractIneligibility;
    }
    if (
      args[
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
      ] === CatPro3239.assistantMaternel
    ) {
      return "<p>La rupture conventionnelle n’est pas possible pour les assistants maternels.</p>";
    }
  }
}
