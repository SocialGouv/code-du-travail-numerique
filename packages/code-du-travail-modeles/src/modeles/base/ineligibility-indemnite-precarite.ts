import type { IIneligibility } from "../common/types/ineligibility";

export const INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE =
  "Il n'y a pas d'indemnité de précarité dans cette situation";

/**
 * Issues du contrat qui privent le salarié de l'indemnité de précarité.
 * Les critères sont identiques quel que soit le type de contrat et la
 * convention collective (cf. issues #7142 et #7436).
 */
const ISSUES_INELIGIBLES_A_TERME = [
  "'embauche cdi'",
  "'refus cdi équivalent'",
  "'refus souplesse'",
];

const ISSUES_INELIGIBLES_RUPTURE_ANTICIPEE = [
  "'force majeure'",
  "'faute grave'",
  "'initiative salarié'",
];

export class IneligibilityLegalIndemnitePrecarite implements IIneligibility {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const typeContrat = args["contrat salarié . type de contrat"];
    const finALaDatePrevue = args["contrat salarié . fin à la date prévue"];
    const issue = args["contrat salarié . issue du contrat"];

    if (typeContrat === "'Exclu'") {
      return INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE;
    }

    if (
      finALaDatePrevue === "'oui'" &&
      issue &&
      ISSUES_INELIGIBLES_A_TERME.includes(issue)
    ) {
      return INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE;
    }

    if (
      finALaDatePrevue === "'non'" &&
      issue &&
      ISSUES_INELIGIBLES_RUPTURE_ANTICIPEE.includes(issue)
    ) {
      return INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE;
    }

    return undefined;
  }
}
