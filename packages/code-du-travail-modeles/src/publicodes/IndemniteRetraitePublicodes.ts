import { IneligibilityIndemniteRetraite } from "../modeles/base";
import { Legal } from "./IndemniteDepart";
import { IndemniteDepartPublicodes } from "./IndemniteDepart/IndemniteDepartPublicodes";
import { ExplanationBuilder } from "./common/ExplanationBuilder";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";

/**
 * Indemnité de départ ou de mise à la retraite.
 *
 * En V1 le calcul ne s'appuie que sur le Code du travail : pas d'étape
 * convention collective dans le parcours, donc pas d'`agreementInstance`. Cela
 * laisse `disableIneligibilityWithSeniority` à `false` dans `Legal.calculate`,
 * ce qui est nécessaire pour que le seuil d'ancienneté déclenche bien l'écran
 * « Aucune indemnité n'est due ».
 */
class IndemniteRetraitePublicodes extends IndemniteDepartPublicodes {
  constructor(models: any) {
    const targetRule =
      PublicodesDefaultRules[PublicodesSimulator.INDEMNITE_RETRAITE];
    super(
      { ...models.base },
      new Legal(new IneligibilityIndemniteRetraite(), targetRule),
      new ExplanationBuilder(),
      undefined,
      targetRule
    );
  }
}

export default IndemniteRetraitePublicodes;
