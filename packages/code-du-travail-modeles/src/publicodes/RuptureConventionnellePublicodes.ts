import type { EvaluatedNode } from "publicodes";

import type { References, SeniorityResult } from "../modeles/common";
import {
  DismissalReasonFactory,
  IneligibilityRuptureConventionnelleFactory,
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCc,
} from "../modeles/common";
import { PublicodesBase } from "./PublicodesBase";
import type {
  PublicodesData,
  PublicodesDataWithFormula,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";
import { mergeMissingArgs } from "./utils";

class RuptureConventionnellePublicodes extends PublicodesBase<PublicodesIndemniteLicenciementResult> {
  constructor(models: any, idcc?: string) {
    const rules = {
      ...models.base,
      ...(idcc ? models[idcc] : {}),
    };
    super(
      rules,
      PublicodesDefaultRules[PublicodesSimulator.RUPTURE_CONVENTIONNELLE],
      idcc as SupportedCc
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

  getReferences(): References[] {
    return super.getReferences("rupture conventionnelle");
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
    const dismissalReason = new DismissalReasonFactory().create(this.idcc);
    const reasons = dismissalReason.dismissalTypes();
    if (reasons.length === 0) {
      return this.calculateSituation(args, targetRule);
    } else {
      const situations = reasons.map(({ rules }) => {
        const newArgs = args;
        rules.forEach(({ rule, value }) => {
          newArgs[rule] = value;
        });
        return this.calculateSituation(newArgs, targetRule);
      });
      const missingArgsFinal = mergeMissingArgs(
        situations.map((item) => item.missingArgs)
      );

      const lowerSituations = situations.reduce((previous, current) => {
        return previous.result.value
          ? previous.result.value < (current.result.value ?? 0)
            ? previous
            : current
          : current;
      }, situations[0]);

      return {
        detail: {
          legalResult: lowerSituations.result,
        },
        ineligibility: situations.find(
          ({ ineligibility }) => ineligibility !== undefined
        )?.ineligibility,
        missingArgs: missingArgsFinal,
        result: lowerSituations.result,
        situation: lowerSituations.situation,
      };
    }
  }

  calculateResult(
    args: Record<string, string | undefined>
  ): PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult> {
    const legalResult = this.calculateSituation(
      args,
      "contrat salarié . indemnité de licenciement . résultat légal"
    );
    const result: PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult> =
      {
        detail: {
          chosenResult: "LEGAL",
          legalResult: legalResult.result,
        },
        formula: this.getFormule(),
        missingArgs: legalResult.missingArgs,
        result: legalResult.result,
        situation: this.data.situation,
      };

    if (this.idcc === SupportedCc.default) {
      return result;
    }

    const agreementResult = this.calculate(
      args,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );

    return super.compareAndSetResult(
      legalResult,
      agreementResult,
      this.getFormule(),
      result
    );
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode
  ): PublicodesIndemniteLicenciementResult {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }

  private mapIneligibility(
    text: string
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    return {
      detail: {
        legalResult: { value: 0 },
      },
      ineligibility: text,
      missingArgs: [],
      result: { value: 0 },
      situation: [],
    };
  }

  private calculateSituation(
    args: Record<string, string | undefined>,
    targetRule?: string
  ) {
    let newArgs = args;

    const ineligibilityInstance =
      new IneligibilityRuptureConventionnelleFactory().create(this.idcc);
    const ineligibility = ineligibilityInstance.getIneligibility(newArgs);
    if (ineligibility) {
      return this.mapIneligibility(ineligibility);
    }
    const missingArgSeniority = this.getMissingArg(args, [
      "contrat salarié . indemnité de licenciement . date d'entrée",
      "contrat salarié . indemnité de licenciement . date de sortie",
    ]);
    if (!missingArgSeniority) {
      const agreement = new SeniorityFactory().create(this.idcc);
      const agreementSeniority: SeniorityResult = agreement.computeSeniority(
        agreement.mapSituation(args)
      );
      const legal = new SeniorityFactory().create(SupportedCc.default);
      const legalSeniority: SeniorityResult = legal.computeSeniority(
        legal.mapSituation(args)
      );
      if (legalSeniority.value) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            legalSeniority.value.toString(),
          ...legalSeniority.extraInfos,
        };
      }
      if (agreementSeniority.value) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            agreementSeniority.value.toString(),
          ...agreementSeniority.extraInfos,
        };
      }
    }

    const missingArgRequiredSeniority = this.getMissingArg(args, [
      "contrat salarié . indemnité de licenciement . date d'entrée",
      "contrat salarié . indemnité de licenciement . date de sortie",
      "contrat salarié . indemnité de licenciement . date de notification",
    ]);
    if (!missingArgRequiredSeniority) {
      const agreement = new SeniorityFactory().create(this.idcc);
      const agreementRequiredSeniority = agreement.computeRequiredSeniority(
        agreement.mapRequiredSituation(args)
      );
      if (agreementRequiredSeniority.value) {
        newArgs[
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
        ] = agreementRequiredSeniority.value.toString();
      }
    }

    if (
      !args[
        "contrat salarié . indemnité de licenciement . salaire de référence"
      ]
    ) {
      const s = new ReferenceSalaryFactory().create(SupportedCc.default);
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
    const situation = this.removeNonPublicodeFields(newArgs);
    return super.setSituation(situation, targetRule);
  }
}

export default RuptureConventionnellePublicodes;
