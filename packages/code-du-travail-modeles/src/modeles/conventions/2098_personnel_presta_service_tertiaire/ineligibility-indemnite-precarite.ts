import { IneligibilityLegalIndemnitePrecarite } from "../../base";

export class IneligibilityIndemnitePrecarite2098 extends IneligibilityLegalIndemnitePrecarite {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (
      args["contrat salarié . contractType"] === "'CDD'" &&
      args["contrat salarié . type de cdd"] === "'Autres'"
    ) {
      return this.getCDDIneligibility(args);
    } else if (args["contrat salarié . contractType"] === "'CTT'") {
      return this.getCTTIneligibility(args);
    } else if (
      !(
        args["contrat salarié . contractType"] === "'CDD'" &&
        (args["contrat salarié . type de cdd"] ===
          "'CDD d'optimisation linéaire'" ||
          args["contrat salarié . type de cdd"] ===
            "'CDD d'animation commerciale'" ||
          args["contrat salarié . type de cdd"] ===
            "'Contrat d'intervention dans le secteur de l'accueil événementiel'")
      )
    ) {
      return "Ce type de contrat ne permet pas au salarié d’avoir droit à une prime de précarité.";
    }
  }
}
