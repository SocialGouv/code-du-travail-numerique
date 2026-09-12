import type { IIndemniteDepartIneligibility } from "../common/types/ineligibility";

export const MISE_RETRAITE_ANCIENNETE_MINIMALE_EN_ANNEE = 8 / 12;
export const DEPART_RETRAITE_ANCIENNETE_MINIMALE_EN_ANNEE = 10;

const ANCIENNETE =
  "contrat salarié . indemnité de licenciement . ancienneté en année";
const ANCIENNETE_REQUISE =
  "contrat salarié . indemnité de licenciement . ancienneté requise en année";
const MISE_A_LA_RETRAITE =
  "contrat salarié . indemnité de retraite . mise à la retraite";

/**
 * Deux seuils d'ancienneté distincts selon l'origine de la rupture, appréciés
 * sur deux variables différentes :
 *
 * - mise à la retraite : l'indemnité est au moins égale à l'indemnité de
 *   licenciement (art. L1237-7), qui suppose 8 mois d'ancienneté appréciés à la
 *   date de notification (art. L1234-9) — d'où `ancienneté requise en année`,
 *   exactement comme `IneligibilityLegalIndemniteLicenciement` ;
 * - départ volontaire : le barème de l'art. D1237-1 ne commence qu'à 10 ans.
 *   On s'appuie ici sur `ancienneté en année`, la variable qui alimente ce même
 *   barème dans `indemnite-retraite.yaml` : en utiliser une autre produirait
 *   des situations « éligible mais 0 € ».
 */
export class IneligibilityIndemniteRetraite implements IIndemniteDepartIneligibility {
  getContractIneligibility(): string | undefined {
    // Le parcours ne pose ni la question du type de contrat ni celle de la
    // faute grave : aucune inéligibilité liée au contrat en V1.
    return undefined;
  }

  /**
   * La mise à la retraite reprend le seuil de 8 mois du licenciement (L1237-7
   * renvoie à L1234-9), mais **pas** ses aménagements liés à l'inaptitude
   * professionnelle : la version licenciement lève le seuil dans ce cas et
   * double l'indemnité (L1226-14). Le parcours retraite ne pose pas la question
   * de l'inaptitude, donc le drapeau n'atteint jamais le moteur et la valeur par
   * défaut « non » s'applique. Introduire cette question, ou une étape
   * convention collective, imposerait de reprendre les deux règles ici et dans
   * `indemnite-retraite.yaml`.
   */
  getSeniorityIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    const isMiseALaRetraite = args[MISE_A_LA_RETRAITE] === "oui";
    const anciennete = parseFloat(
      args[isMiseALaRetraite ? ANCIENNETE_REQUISE : ANCIENNETE] ?? ""
    );
    if (isNaN(anciennete)) {
      return undefined;
    }

    if (isMiseALaRetraite) {
      if (anciennete < MISE_RETRAITE_ANCIENNETE_MINIMALE_EN_ANNEE) {
        return "<p>Aucune indemnité n’est due&nbsp;: l’indemnité de mise à la retraite n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.</p>";
      }
      return undefined;
    }

    if (anciennete < DEPART_RETRAITE_ANCIENNETE_MINIMALE_EN_ANNEE) {
      return "<p>Aucune indemnité n’est due&nbsp;: l’indemnité de départ volontaire à la retraite n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 10 ans.</p>";
    }
  }

  getIneligibility(
    args: Record<string, string | undefined>
  ): string | undefined {
    return (
      this.getContractIneligibility() ?? this.getSeniorityIneligibility(args)
    );
  }
}
