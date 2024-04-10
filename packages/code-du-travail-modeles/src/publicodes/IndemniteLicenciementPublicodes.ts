import type { EvaluatedNode } from "publicodes";

import type { IReferenceSalary, ISeniority } from "../modeles/common";
import {
  IneligibilityIndemniteLicenciementFactory,
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../modeles/common";
import type { IInegibility } from "../modeles/common/types/ineligibility";
import { PublicodesBase } from "./PublicodesBase";
import type {
  IndemniteDepartInstance,
  PublicodesData,
  PublicodesDataWithFormula,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";

class IndemniteLicenciementInstance implements IndemniteDepartInstance {
  public ineligibility: IInegibility;

  public seniority: ISeniority<SupportedCcIndemniteLicenciement>;

  public salary: IReferenceSalary<SupportedCcIndemniteLicenciement>;

  constructor(idcc: SupportedCcIndemniteLicenciement) {
    this.ineligibility = new IneligibilityIndemniteLicenciementFactory().create(
      idcc
    );
    this.seniority = new SeniorityFactory().create(idcc);
    this.salary = new ReferenceSalaryFactory().create(idcc);
  }
}

class IndemniteLicenciementPublicodes extends PublicodesBase<PublicodesIndemniteLicenciementResult> {
  protected legalIneligibilityInstance: IInegibility =
    new IneligibilityIndemniteLicenciementFactory().create(
      SupportedCcIndemniteLicenciement.default
    );

  protected legalInstance: IndemniteLicenciementInstance =
    new IndemniteLicenciementInstance(SupportedCcIndemniteLicenciement.default);

  protected agreementInstance?: IndemniteDepartInstance;

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
    if (idcc) {
      this.agreementInstance = new IndemniteLicenciementInstance(
        idcc as SupportedCcIndemniteLicenciement
      );
    }
  }

  public calculate(
    args: Record<string, string | undefined>
  ): PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult> {
    let agreementResult:
      | PublicodesData<PublicodesIndemniteLicenciementResult>
      | undefined = undefined;
    if (this.idcc !== SupportedCcIndemniteLicenciement.default) {
      agreementResult = this.calculateAgreement(args);
      console.log("agreementResult", agreementResult);
      if (
        agreementResult &&
        (agreementResult.missingArgs.length || agreementResult.ineligibility)
      ) {
        return {
          ineligibility: agreementResult.ineligibility,
          missingArgs: agreementResult.missingArgs,
          result: {
            value: 0,
          },
          situation: this.data.situation,
        };
      }
    }

    const noLegalIndemnity = this.hasNoLegalIndemnity();

    let legalResult:
      | PublicodesData<PublicodesIndemniteLicenciementResult>
      | undefined = undefined;
    if (!noLegalIndemnity) {
      legalResult = this.calculateLegal(args, !!this.agreementInstance);
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

    if (!this.agreementInstance && legalResult?.result) {
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
    args: Record<string, string | undefined>,
    disableIneligibilityCheck = false
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    const ineligibility =
      this.legalIneligibilityInstance.getIneligibility(args);
    if (ineligibility) {
      return this.mapIneligibility(ineligibility);
    }
    args = this.mapSeniorityArgs(args);
    args = this.mapRequiredSeniorityArgs(args);
    if (!disableIneligibilityCheck) {
      const ineligibilityWithSeniority =
        this.legalIneligibilityInstance.getIneligibility(args);
      if (ineligibilityWithSeniority) {
        return this.mapIneligibility(ineligibilityWithSeniority);
      }
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
  ): PublicodesData<PublicodesIndemniteLicenciementResult> | undefined {
    if (!this.agreementInstance) return;
    const ineligibility =
      this.agreementInstance.ineligibility.getIneligibility(args);
    if (ineligibility) {
      return this.mapIneligibility(ineligibility);
    }
    args = this.mapSeniorityArgs(args);
    args = this.mapRequiredSeniorityArgs(args);
    const ineligibilityWithSeniority =
      this.agreementInstance.ineligibility.getIneligibility(args);
    if (ineligibilityWithSeniority) {
      return this.mapIneligibility(ineligibilityWithSeniority);
    }
    args = this.mapSalaryArgs(args);
    const situation = this.removeNonPublicodeFields(args);
    const result = super.setSituation(
      situation,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
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
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    let newArgs = args;

    const missingArgSeniority = this.getMissingArg(args, [
      "contrat salarié . indemnité de licenciement . date d'entrée",
      "contrat salarié . indemnité de licenciement . date de sortie",
    ]);

    if (!missingArgSeniority) {
      if (this.agreementInstance) {
        const agreement = this.agreementInstance.seniority;
        const agreementSeniority = agreement.computeSeniority(
          agreement.mapSituation(args)
        );
        if (agreementSeniority.value !== undefined) {
          newArgs = {
            ...newArgs,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              agreementSeniority.value.toString(),
            ...agreementSeniority.extraInfos,
          };
        }
      }
      const legal = this.legalInstance.seniority;
      const legalSeniority = legal.computeSeniority(legal.mapSituation(args));
      if (legalSeniority.value !== undefined) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            legalSeniority.value.toString(),
          ...legalSeniority.extraInfos,
        };
      }
    }

    return newArgs;
  }

  private mapRequiredSeniorityArgs(
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    const newArgs = args;

    const missingArgRequiredSeniority = this.getMissingArg(args, [
      "contrat salarié . indemnité de licenciement . date d'entrée",
      "contrat salarié . indemnité de licenciement . date de sortie",
      "contrat salarié . indemnité de licenciement . date de notification",
    ]);
    if (!missingArgRequiredSeniority) {
      if (this.agreementInstance) {
        const agreement = this.agreementInstance.seniority;
        const agreementRequiredSeniority = agreement.computeRequiredSeniority(
          agreement.mapRequiredSituation(args)
        );
        if (agreementRequiredSeniority.value !== undefined) {
          newArgs[
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
          ] = agreementRequiredSeniority.value.toString();
        }
      }
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
      this.agreementInstance &&
      args.salaryPeriods &&
      !args[
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel"
      ]
    ) {
      const s = this.agreementInstance.salary;
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
