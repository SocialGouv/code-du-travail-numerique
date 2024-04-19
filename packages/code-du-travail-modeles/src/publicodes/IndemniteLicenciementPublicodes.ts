import {
  IneligibilityIndemniteLicenciementFactory,
  SupportedCc,
} from "../modeles";
import { Agreement, Legal } from "./IndemniteDepart";
import { IndemniteDepartPublicodes } from "./IndemniteDepart/IndemniteDepartPublicodes";

class IndemniteLicenciementPublicodes extends IndemniteDepartPublicodes {
  constructor(models: any, idcc?: string) {
    const rules = {
      ...models.base,
      ...(idcc ? models[idcc] : {}),
    };
    let agreementInstance = undefined;
    if (idcc && idcc !== SupportedCc.default) {
      agreementInstance = new Agreement(
        idcc as SupportedCc,
        new IneligibilityIndemniteLicenciementFactory().create(
          idcc as SupportedCc
        )
      );
    }
    super(
      rules,
      new Legal(
        new IneligibilityIndemniteLicenciementFactory().create(
          SupportedCc.default
        )
      ),
      agreementInstance
    );
  }
}

export default IndemniteLicenciementPublicodes;
