import type { References } from "../modeles";
import {
  IneligibilityRuptureConventionnelleFactory,
  SupportedCc,
} from "../modeles";
import { Legal } from "./IndemniteDepart";
import { AgreementRuptureCo } from "./IndemniteDepart/AgreementRuptureCo";
import { ExplanationBuilderRuptureCo } from "./IndemniteDepart/ExplanationBuilderRuptureCo";
import { IndemniteDepartPublicodes } from "./IndemniteDepart/IndemniteDepartPublicodes";

class RuptureConventionnellePublicodes extends IndemniteDepartPublicodes {
  constructor(models: any, idcc?: string) {
    const rules = {
      ...models.base,
      ...(idcc ? models[idcc] : {}),
    };
    let agreementInstance = undefined;
    if (idcc && idcc !== SupportedCc.default) {
      agreementInstance = new AgreementRuptureCo(idcc as SupportedCc);
    }
    super(
      rules,
      new Legal(
        new IneligibilityRuptureConventionnelleFactory().create(
          SupportedCc.default
        )
      ),
      new ExplanationBuilderRuptureCo(idcc),
      agreementInstance
    );
  }

  getReferences(): References[] {
    return super.getReferences("rupture conventionnelle");
  }
}

export default RuptureConventionnellePublicodes;
