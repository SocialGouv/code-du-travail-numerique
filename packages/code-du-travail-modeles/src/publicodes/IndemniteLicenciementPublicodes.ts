import type { EvaluatedNode } from "publicodes";

import type {
  RequiredSeniorityResult,
  SeniorityResult,
} from "../modeles/common";
import {
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../modeles/common";
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
    let newArgs = args;
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
      const { value, extraInfos }: SeniorityResult = s.computeSeniority(
        s.mapSituation(args)
      );
      newArgs = {
        ...newArgs,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          value.toString(),
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          value.toString(),
        ...extraInfos,
      };
    }
    if (
      !args[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ]
    ) {
      const s = new SeniorityFactory().create(this.idcc);
      const { value }: RequiredSeniorityResult = s.computeRequiredSeniority(
        s.mapRequiredSituation(args)
      );
      newArgs = {
        ...newArgs,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          value.toString(),
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          value.toString(),
      };
    }
    delete newArgs.absencePeriods;
    if (
      !args[
        "contrat salarié . indemnité de licenciement . salaire de référence"
      ]
    ) {
      const s = new ReferenceSalaryFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const value = s.computeReferenceSalary({
        salaires: args.salaryPeriods ? JSON.parse(args.salaryPeriods) : [],
      });
      if (value) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . salaire de référence":
            value.toString(),
        };
      }
    }
    if (
      !args[
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel"
      ]
    ) {
      const s = new ReferenceSalaryFactory().create(this.idcc);
      const value = s.computeReferenceSalary(
        s.mapSituation
          ? s.mapSituation(args)
          : {
              salaires: args.salaryPeriods
                ? JSON.parse(args.salaryPeriods)
                : [],
            }
      );
      if (value) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            value.toString(),
        };
      }
    }
    console.log("newArgs", newArgs);
    delete newArgs.salaryPeriods;
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
