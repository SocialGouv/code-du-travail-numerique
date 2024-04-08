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
  PublicodesDataWithFormula,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";

class IndemniteLicenciementPublicodes extends PublicodesBase<PublicodesIndemniteLicenciementResult> {
  protected legalIneligibilityInstance: IInegibility =
    new IneligibilityIndemniteLicenciementFactory().create(
      SupportedCcIndemniteLicenciement.default
    );

  protected agreementIneligibilityInstance: IInegibility;

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

    this.agreementIneligibilityInstance =
      new IneligibilityIndemniteLicenciementFactory().create(
        idcc as SupportedCcIndemniteLicenciement
      );
  }

  public calculate(
    args: Record<string, string | undefined>
  ): PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult> {
    let agreementResult:
      | PublicodesData<PublicodesIndemniteLicenciementResult>
      | undefined = undefined;
    if (this.idcc !== SupportedCcIndemniteLicenciement.default) {
      agreementResult = this.calculateAgreement(args);

      if (agreementResult.missingArgs.length || agreementResult.ineligibility) {
        return {
          ineligibility: agreementResult.ineligibility,
          missingArgs: agreementResult.missingArgs,
          situation: this.data.situation,
        };
      }
    }

    const noLegalIndemnity = this.hasNoLegalIndemnity();

    let legalResult:
      | PublicodesData<PublicodesIndemniteLicenciementResult>
      | undefined = undefined;
    if (!noLegalIndemnity) {
      legalResult = this.calculateLegal(args);
      if (
        !legalResult.result ||
        legalResult.missingArgs.length ||
        legalResult.ineligibility
      ) {
        return {
          ineligibility: legalResult.ineligibility,
          missingArgs: legalResult.missingArgs,
          situation: this.data.situation,
        };
      }
    }

    if (
      this.idcc === SupportedCcIndemniteLicenciement.default &&
      legalResult?.result
    ) {
      return {
        detail: {
          chosenResult: "LEGAL",
          legalResult: legalResult.result,
        },
        formula: this.getFormule(),
        missingArgs: legalResult.missingArgs,
        result: legalResult.result,
        situation: this.data.situation,
      };
    }
    const chosenResult =
      !agreementResult?.result?.value ||
      !legalResult?.result?.value ||
      noLegalIndemnity
        ? "HAS_NO_LEGAL"
        : this.compareLegalAndAgreement(
            legalResult.result.value as number,
            agreementResult.result.value as number
          );
    return {
      detail: {
        agreementResult: agreementResult?.result,
        chosenResult,
        legalResult: legalResult?.result,
      },
      formula: this.getFormule(),
      missingArgs: legalResult?.missingArgs ?? [],
      result:
        chosenResult === "LEGAL"
          ? legalResult?.result
          : agreementResult?.result,
      situation: this.data.situation,
    };
  }

  protected getMissingArg(
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

  protected mapIneligibility(
    text: string
  ): PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult> {
    return {
      detail: {
        legalResult: { value: 0 },
      },
      formula: {
        explanations: [],
        formula: "",
      },
      ineligibility: text,
      missingArgs: [],
      result: { value: 0 },
      situation: [],
    };
  }

  protected calculateLegal(
    args: Record<string, string | undefined>
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    const ineligibility =
      this.legalIneligibilityInstance.getIneligibility(args);
    if (ineligibility) {
      return this.mapIneligibility(ineligibility);
    }
    args = this.mapSeniorityArgs(args);
    args = this.mapRequiredSeniorityArgs(args);
    const ineligibilityWithSeniority =
      this.legalIneligibilityInstance.getIneligibility(args);
    if (ineligibilityWithSeniority) {
      return this.mapIneligibility(ineligibilityWithSeniority);
    }
    args = this.mapSalaryArgs(args);
    const situation = this.removeNonPublicodeFields(args);
    return super.setSituation(
      situation,
      "contrat salarié . indemnité de licenciement . résultat légal"
    );
  }

  protected calculateAgreement(
    args: Record<string, string | undefined>
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    const ineligibility =
      this.agreementIneligibilityInstance.getIneligibility(args);
    if (ineligibility) {
      return this.mapIneligibility(ineligibility);
    }
    args = this.mapSeniorityArgs(args, this.idcc);
    args = this.mapRequiredSeniorityArgs(args, this.idcc);
    const ineligibilityWithSeniority =
      this.agreementIneligibilityInstance.getIneligibility(args);
    if (ineligibilityWithSeniority) {
      return this.mapIneligibility(ineligibilityWithSeniority);
    }
    args = this.mapSalaryArgs(args, this.idcc);
    console.log("situation1", args);
    const situation = this.removeNonPublicodeFields(args);
    console.log("situation2", situation);
    const result = super.setSituation(
      situation,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    console.log("result", result);
    return result;
  }

  protected compareLegalAndAgreement(
    legalValue: number,
    agreementValue: number
  ): "AGREEMENT" | "LEGAL" | "SAME" | undefined {
    if (legalValue === agreementValue) {
      return "SAME";
    }
    if (legalValue < agreementValue) {
      return "AGREEMENT";
    }
    if (legalValue > agreementValue) {
      return "LEGAL";
    }
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode
  ): PublicodesIndemniteLicenciementResult {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }

  protected hasNoLegalIndemnity(): boolean {
    const hasNoLegalIndemnity = this.engine.evaluate(
      "contrat salarié . indemnité de licenciement . résultat légal doit être ignoré"
    );

    return !!hasNoLegalIndemnity.nodeValue;
  }

  private mapSeniorityArgs(
    args: Record<string, string | undefined>,
    idcc = SupportedCcIndemniteLicenciement.default
  ): Record<string, string | undefined> {
    let newArgs = args;

    const missingArgSeniority = this.getMissingArg(args, [
      "contrat salarié . indemnité de licenciement . date d'entrée",
      "contrat salarié . indemnité de licenciement . date de sortie",
    ]);
    if (!missingArgSeniority) {
      const agreement = new SeniorityFactory().create(idcc);
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
      if (
        idcc !== SupportedCcIndemniteLicenciement.default &&
        agreementSeniority.value !== undefined
      ) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            agreementSeniority.value.toString(),
          ...agreementSeniority.extraInfos,
        };
      }
    }

    return newArgs;
  }

  private mapRequiredSeniorityArgs(
    args: Record<string, string | undefined>,
    idcc = SupportedCcIndemniteLicenciement.default
  ): Record<string, string | undefined> {
    const newArgs = args;

    const missingArgRequiredSeniority = this.getMissingArg(args, [
      "contrat salarié . indemnité de licenciement . date d'entrée",
      "contrat salarié . indemnité de licenciement . date de sortie",
      "contrat salarié . indemnité de licenciement . date de notification",
    ]);
    if (!missingArgRequiredSeniority) {
      const agreement = new SeniorityFactory().create(idcc);
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
      if (
        idcc !== SupportedCcIndemniteLicenciement.default &&
        agreementRequiredSeniority.value !== undefined
      ) {
        newArgs[
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
        ] = agreementRequiredSeniority.value.toString();
      }
    }

    return newArgs;
  }

  private mapSalaryArgs(
    args: Record<string, string | undefined>,
    idcc = SupportedCcIndemniteLicenciement.default
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
      idcc !== SupportedCcIndemniteLicenciement.default &&
      args.salaryPeriods &&
      !args[
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel"
      ]
    ) {
      const s = new ReferenceSalaryFactory().create(idcc);
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
