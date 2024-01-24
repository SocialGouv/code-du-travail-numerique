import type { EvaluatedNode } from "publicodes";

import type {
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../modeles/common";
import { ReferenceSalaryFactory, SeniorityFactory } from "../modeles/common";
import type { Publicodes } from "./Publicodes";
import { PublicodesBase } from "./PublicodesBase";
import type {
  PublicodesData,
  PublicodesIndemniteRuptureConventionnelleResult,
  PublicodesSituations,
} from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";

// type SalaryGridItem = {};

class IndemniteRuptureConventionnellePublicodes
  extends PublicodesBase<PublicodesIndemniteRuptureConventionnelleResult>
  implements Publicodes<PublicodesIndemniteRuptureConventionnelleResult>
{
  constructor(models: any, idcc?: string) {
    const rules = {
      ...models.base,
      ...(idcc ? models[idcc] : {}),
    };
    super(
      rules,
      PublicodesDefaultRules[
        PublicodesSimulator.INDEMNITE_RUPTURE_CONVENTIONNELLE
      ]
    );
  }

  calculate(
    args: PublicodesSituations,
    targetRule?: string
  ): PublicodesData<PublicodesIndemniteRuptureConventionnelleResult> {
    const newArgs = args;
    if (
      !args["ancienneté en année"] &&
      args["convention collective"] &&
      args["date de début de contrat"] &&
      args["date de fin de contrat"]
    ) {
      const s = new SeniorityFactory().create(
        args["convention collective"] as SupportedCcIndemniteLicenciement
      );
      const seniority = s.computeSeniority({
        absencePeriods: [],
        dateEntree: args["date de début de contrat"],
        dateSortie: args["date de fin de contrat"],
      });
      newArgs["ancienneté en année"] = seniority.value.toString();
      return this.calculate(newArgs, targetRule);
    }
    if (
      !args["salaire de référence"] &&
      args["convention collective"] &&
      args["grille de salaire & primes"]
    ) {
      const { computeReferenceSalary } = new ReferenceSalaryFactory().create(
        args["convention collective"] as SupportedCcIndemniteLicenciement
      );
      newArgs["salaire de référence"] = computeReferenceSalary({
        salaires: args["grille de salaire & primes"],
      }).toString();
      delete newArgs["grille de salaire & primes"];
      return this.calculate(newArgs, targetRule);
    }
    return this.setSituation(newArgs, targetRule);
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode
  ): PublicodesIndemniteRuptureConventionnelleResult {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }
}

export default IndemniteRuptureConventionnellePublicodes;
