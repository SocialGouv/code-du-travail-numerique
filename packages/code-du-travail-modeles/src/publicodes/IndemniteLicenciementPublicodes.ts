import type { EvaluatedNode } from "publicodes";

import {
  IneligibilityIndemniteLicenciementFactory,
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../modeles/common";
import type { IInegibility } from "../modeles/common/types/ineligibility";
import { PublicodesBase } from "./PublicodesBase";
import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";

class IndemniteLicenciementPublicodes extends PublicodesBase<PublicodesIndemniteLicenciementResult> {
  ineligibilityInstance: IInegibility;

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

    this.ineligibilityInstance =
      new IneligibilityIndemniteLicenciementFactory().create(
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

  mapIneligibility(
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
    const ineligibility = this.ineligibilityInstance.getIneligibility(args);
    if (ineligibility) {
      return this.mapIneligibility(ineligibility);
    }

    const newArgs = this.mapSeniorityArgs(args);

    const ineligibilityWithSeniority =
      this.ineligibilityInstance.getIneligibility(newArgs);
    if (ineligibilityWithSeniority) {
      return this.mapIneligibility(ineligibilityWithSeniority);
    }

    const situation = this.mapSalaryArgs(newArgs);

    return super.setSituation(situation, targetRule);
  }

  calculateResult(
    args: Record<string, string | undefined>
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    const ineligibility = this.ineligibilityInstance.getIneligibility(args);
    if (ineligibility) {
      return this.mapIneligibility(ineligibility);
    }

    const newArgs = this.mapSeniorityArgs(args);

    const ineligibilityWithSeniority =
      this.ineligibilityInstance.getIneligibility(newArgs);
    if (ineligibilityWithSeniority) {
      return this.mapIneligibility(ineligibilityWithSeniority);
    }

    const situation = this.mapSalaryArgs(newArgs);

    const legalResult = super.setSituation(
      situation,
      "contrat salarié . indemnité de licenciement . résultat légal"
    );

    const result: PublicodesData<PublicodesIndemniteLicenciementResult> = {
      detail: {
        legalResult: legalResult.result,
      },
      missingArgs: legalResult.missingArgs,
      result: legalResult.result,
      situation: this.data.situation,
    };

    if (this.idcc === SupportedCcIndemniteLicenciement.default) {
      return result;
    }
    const agreementResult = super.setSituation(
      situation,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );

    // impossible à ce stade ?
    result.missingArgs = result.missingArgs.concat(agreementResult.missingArgs);

    result.detail.agreementResult = agreementResult.result;

    return super.compareAndSetResult(legalResult, agreementResult, result);
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode
  ): PublicodesIndemniteLicenciementResult {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }

  private mapSeniorityArgs(
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    let newArgs = args;

    const missingArgSeniority = this.getMissingArg(args, [
      "contrat salarié . indemnité de licenciement . date d'entrée",
      "contrat salarié . indemnité de licenciement . date de sortie",
    ]);
    if (!missingArgSeniority) {
      const agreement = new SeniorityFactory().create(this.idcc);
      const agreementSeniority = agreement.computeSeniority(
        agreement.mapSituation(args)
      );
      const legal = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalSeniority = legal.computeSeniority(legal.mapSituation(args));
      if (legalSeniority.value !== undefined) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            legalSeniority.value.toString(),
          ...legalSeniority.extraInfos,
        };
      }
      if (agreementSeniority.value !== undefined) {
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
      const legal = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalRequiredSeniority = legal.computeRequiredSeniority(
        legal.mapRequiredSituation(args)
      );
      if (legalRequiredSeniority.value !== undefined) {
        newArgs[
          "contrat salarié . indemnité de licenciement . ancienneté requise en année"
        ] = legalRequiredSeniority.value.toString();
      }
      if (agreementRequiredSeniority.value !== undefined) {
        newArgs[
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
        ] = agreementRequiredSeniority.value.toString();
      }
    }

    return newArgs;
  }

  private mapSalaryArgs(
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    let newArgs = args;

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
      args.salaryPeriods &&
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
    return this.removeNonPublicodeFields(newArgs);
  }
}

export default IndemniteLicenciementPublicodes;
