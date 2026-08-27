import type { IIneligibility } from "../common/types/ineligibility";
import type { References } from "../common/utils/references";

export const INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE =
  "Il n'y a pas d'indemnité de précarité dans cette situation";

/**
 * Pour un salarié intérimaire, il ne s'agit pas d'une indemnité de précarité
 * mais d'une indemnité de fin de mission (article L1251-32).
 */
export const INDEMNITE_FIN_MISSION_INELIGIBILITY_MESSAGE =
  "Il n'y a pas d'indemnité de fin de mission dans cette situation";

const TYPE_CONTRAT_CTT = "'CTT'";

/**
 * Issues du contrat qui privent le salarié de l'indemnité lorsque le contrat est
 * allé à son terme. Les critères sont identiques quel que soit le type de
 * contrat et la convention collective (cf. issues #7142 et #7436).
 */
const ISSUES_INELIGIBLES_A_TERME = [
  "'embauche cdi'",
  "'refus cdi équivalent'",
  "'refus souplesse'",
];

/**
 * Issues du contrat qui privent le salarié de l'indemnité en cas de rupture
 * anticipée. `'autre'` n'y figure pas : une rupture anticipée à l'initiative de
 * l'employeur, hors faute grave et force majeure, ouvre droit à l'indemnité.
 */
const ISSUES_INELIGIBLES_RUPTURE_ANTICIPEE = [
  "'période d'essai'",
  "'force majeure'",
  "'faute grave'",
  "'embauche cdi autre entreprise'",
  "'inaptitude'",
  "'commun accord'",
];

const REFERENCE_CDD: References = {
  article: "Article L1243-10 du code du travail",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901221",
};

const REFERENCE_CTT: References = {
  article: "Article L1251-33 du code du travail",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019869550",
};

const isCtt = (args: Record<string, string | undefined>): boolean =>
  args["contrat salarié . type de contrat"] === TYPE_CONTRAT_CTT;

/**
 * Références juridiques à afficher sur l'écran de résultat lorsque la situation
 * n'ouvre pas droit à l'indemnité. Le modèle reste la source de vérité des
 * articles, y compris quand le calcul publicodes n'est jamais exécuté.
 */
export const getIndemnitePrecariteIneligibilityReferences = (
  args: Record<string, string | undefined>
): References[] => [isCtt(args) ? REFERENCE_CTT : REFERENCE_CDD];

export class IneligibilityLegalIndemnitePrecarite implements IIneligibility {
  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const typeContrat = args["contrat salarié . type de contrat"];
    const finALaDatePrevue = args["contrat salarié . fin à la date prévue"];
    const issue = args["contrat salarié . issue du contrat"];

    const message = isCtt(args)
      ? INDEMNITE_FIN_MISSION_INELIGIBILITY_MESSAGE
      : INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE;

    if (typeContrat === "'Exclu'") {
      return message;
    }

    if (
      finALaDatePrevue === "'oui'" &&
      issue &&
      ISSUES_INELIGIBLES_A_TERME.includes(issue)
    ) {
      return message;
    }

    if (
      finALaDatePrevue === "'non'" &&
      issue &&
      ISSUES_INELIGIBLES_RUPTURE_ANTICIPEE.includes(issue)
    ) {
      return message;
    }

    return undefined;
  }
}
