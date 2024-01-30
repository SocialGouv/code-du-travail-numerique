import type { EvaluatedNode } from "publicodes";

import type {
  Absence,
  SupportedCcIndemniteLicenciement,
} from "../modeles/common";
import { MotifKeys, SeniorityFactory } from "../modeles/common";
import type { Publicodes } from "./Publicodes";
import { PublicodesBase } from "./PublicodesBase";
import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";

class IndemniteLicenciementPublicodes
  extends PublicodesBase<PublicodesIndemniteLicenciementResult>
  implements Publicodes<PublicodesIndemniteLicenciementResult>
{
  constructor(models: any, idcc?: string) {
    const rules = {
      ...models.base,
      ...(idcc ? models[idcc] : {}),
    };
    super(
      rules,
      PublicodesDefaultRules[PublicodesSimulator.INDEMNITE_LICENCIEMENT],
      idcc as SupportedCcIndemniteLicenciement
    );
  }

  getMissingArg(
    args: Record<string, string | undefined>,
    names: string[]
  ): string | undefined {
    let missingArg: string | undefined = undefined;
    names.some((name) => {
      if (!args[name]) {
        missingArg = name;
        return false;
      }
      return true;
    });
    return missingArg;
  }

  throwMissingArg(
    name: string
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    return {
      missingArgs: [
        {
          indice: 0,
          name,
          rawNode: {
            nom: name,
          },
        },
      ],
      result: { value: 0 },
      situation: [],
    };
  }

  calculate(
    args: Record<string, string | undefined>,
    targetRule?: string
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    const newArgs = args;
    const missingArg = this.getMissingArg(args, [
      "contrat salarié . indemnité de licenciement . date d'entrée",
      "contrat salarié . indemnité de licenciement . date de sortie",
      "contrat salarié . indemnité de licenciement . date de notification",
    ]);
    if (missingArg) {
      return this.throwMissingArg(missingArg);
    }
    if (
      !args["contrat salarié . indemnité de licenciement . ancienneté en année"]
    ) {
      const s = new SeniorityFactory().create(this.idcc);
      const seniority = s.computeSeniority(s.mapSituation(args));
      newArgs[
        "contrat salarié . indemnité de licenciement . ancienneté en année"
      ] = seniority.value.toString();
      newArgs[
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année"
      ] = seniority.value.toString();
    }
    if (
      !args[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ]
    ) {
      const s = new SeniorityFactory().create(this.idcc);
      const seniority = s.computeRequiredSeniority(
        s.mapRequiredSituation(args)
      );
      newArgs[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ] = seniority.value.toString();
      newArgs[
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
      ] = seniority.value.toString();
    }
    if (newArgs.absencePeriods) {
      const absencePeriods = JSON.parse(newArgs.absencePeriods) as Absence[];
      newArgs[
        "contrat salarié . indemnité de licenciement . avec congé maladie non professionnelle"
      ] = absencePeriods.some(
        (absence) => absence.motif.key === MotifKeys.maladieNonPro
      )
        ? "oui"
        : "non";
    }
    delete newArgs.absencePeriods;

    return super.setSituation(newArgs, targetRule);
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode
  ): PublicodesIndemniteLicenciementResult {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }
}

export default IndemniteLicenciementPublicodes;
