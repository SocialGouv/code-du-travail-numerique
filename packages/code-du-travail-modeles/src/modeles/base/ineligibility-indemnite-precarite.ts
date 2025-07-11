import type { IIndemnitePrecariteIneligibility } from "../common/types/ineligibility";

export class IneligibilityLegalIndemnitePrecarite
  implements IIndemnitePrecariteIneligibility
{
  getCDDIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (args["contrat salarié . finContratPeriodeDessai"] === "oui") {
      return "Lorsque le CDD a été rompu pendant la période d’essai, le salarié en CDD n’a pas le droit à une prime de précarité.";
    } else if (args["contrat salarié . propositionCDIFindeContrat"] === "oui") {
      return "Le salarié en CDD qui est immédiatement embauché dans l’entreprise en CDI, sans interruption, sur un même poste ou sur un poste différent, n’a pas le droit à une prime de précarité.";
    } else if (args["contrat salarié . refusCDIFindeContrat"] === "oui") {
      return "Le salarié en CDD qui refuse un CDI pour occuper le même emploi ou un emploi similaire dans l’entreprise avec une rémunération au moins équivalente, n’a pas le droit à une prime de précarité.";
    } else if (args["contrat salarié . interruptionFauteGrave"] === "oui") {
      return "Lorsque le CDD est rompu de manière anticipée à l’initiative du salarié, pour faute grave, pour faute lourde ou en cas de force majeure, le salarié en CDD n’a pas le droit à une prime de précarité.";
    } else if (args["contrat salarié . refusRenouvellementAuto"] === "oui") {
      return "Le salarié en CDD qui refuse le renouvellement de son CDD alors que son contrat prévoyait dès l’origine son renouvellement et ses modalités de renouvellement n’a pas le droit à une prime de précarité.";
    }
  }

  getCTTIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    if (args["contrat salarié . cttFormation"] === "oui") {
      return "Ce type de contrat ne permet pas au salarié d’avoir droit à une prime de précarité.";
    } else if (args["contrat salarié . ruptureContratFauteGrave"] === "oui") {
      return "Lorsque le contrat de travail temporaire (contrat d'intérim) est rompu de manière anticipée à l’initiative du salarié, pour faute grave du salarié ou en cas de force majeure, le salarié n’a pas le droit à une prime de précarité.";
    } else if (args["contrat salarié . propositionCDIFinContrat"] === "oui") {
      return "Le salarié en contrat de travail temporaire (contrat d’intérim) qui est immédiatement embauché en CDI au sein de l’entreprise dans laquelle il effectuait sa mission n’a pas le droit à une prime de précarité.";
    } else if (args["contrat salarié . refusSouplesse"] === "oui") {
      return "Le salarié en contrat d’intérim qui refuse la mise en œuvre de la souplesse prévue dans son contrat n’a pas le droit à une prime de précarité.";
    }
  }

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
    } else {
      return "Ce type de contrat ne permet pas au salarié d’avoir droit à une prime de précarité.";
    }
  }
}
