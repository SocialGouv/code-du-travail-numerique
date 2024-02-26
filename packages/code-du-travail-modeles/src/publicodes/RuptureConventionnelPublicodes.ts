import type { EvaluatedNode } from "publicodes";

import type { SeniorityResult } from "../modeles/common";
import {
  // IneligibilityFactory,
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

class RuptureConventionnelPublicodes
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
        return true;
      }
      return false;
    });
    return missingArg;
  }

  mapMissingArg(
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

  mapIneligibility(
    text: string
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    return {
      ineligibility: text,
      missingArgs: [],
      result: { value: 0 },
      situation: [],
    };
  }

  removeNonPublicodeFields(
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    return Object.keys(args).reduce((filteredObj, key) => {
      if (key.startsWith("contrat salarié . ") && args[key]) {
        return {
          ...filteredObj,
          [key]: args[key],
        };
      }
      return filteredObj;
    }, {});
  }

  calculate(
    args: Record<string, string | undefined>,
    targetRule?: string
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    let newArgs = args;
    // const ineligibilityInstance = new IneligibilityFactory().create(this.idcc);
    // const ineligibility = ineligibilityInstance.getIneligibility(newArgs);
    // if (ineligibility) {
    //   return this.mapIneligibility(ineligibility);
    // }
    if (
      !args[
        "contrat salarié . rupture conventionnelle . ancienneté en année"
      ] ||
      !args[
        "contrat salarié . rupture conventionnelle . ancienneté conventionnelle en année"
      ]
    ) {
      const missingArg = this.getMissingArg(args, [
        "contrat salarié . rupture conventionnelle . date d'entrée",
        "contrat salarié . rupture conventionnelle . date de sortie",
      ]);
      if (missingArg) {
        return this.mapMissingArg(missingArg);
      }
      const agreement = new SeniorityFactory().create(
        this.idcc,
        "rupture-conventionnelle"
      );
      const agreementSeniority: SeniorityResult = agreement.computeSeniority(
        agreement.mapSituation(args)
      );
      const legal = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default,
        "rupture-conventionnelle"
      );
      const legalSeniority: SeniorityResult = legal.computeSeniority(
        legal.mapSituation(args)
      );
      if (legalSeniority.value) {
        newArgs = {
          ...newArgs,
          "contrat salarié . rupture conventionnelle . ancienneté en année":
            legalSeniority.value.toString(),
          ...legalSeniority.extraInfos,
        };
      }
      if (agreementSeniority.value) {
        newArgs = {
          ...newArgs,
          "contrat salarié . rupture conventionnelle . ancienneté conventionnelle en année":
            agreementSeniority.value.toString(),
          ...agreementSeniority.extraInfos,
        };
      }
    }
    const missingArg = this.getMissingArg(args, [
      "contrat salarié . rupture conventionnelle . date d'entrée",
      "contrat salarié . rupture conventionnelle . date de sortie",
      "contrat salarié . rupture conventionnelle . date de notification",
    ]);
    if (missingArg) {
      return this.mapMissingArg(missingArg);
    }
    // const ineligibilityWithSeniority =
    //   ineligibilityInstance.getIneligibility(newArgs);
    // if (ineligibilityWithSeniority) {
    //   return this.mapIneligibility(ineligibilityWithSeniority);
    // }
    if (
      !args["contrat salarié . rupture conventionnelle . salaire de référence"]
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
          "contrat salarié . rupture conventionnelle . salaire de référence":
            value.toString(),
        };
      }
    }
    if (
      !args[
        "contrat salarié . rupture conventionnelle . salaire de référence conventionnel"
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
          "contrat salarié . rupture conventionnelle . salaire de référence conventionnel":
            value.toString(),
        };
      }
    }
    const situation = this.removeNonPublicodeFields(newArgs);
    return super.setSituation(situation, targetRule);
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

export default RuptureConventionnelPublicodes;
