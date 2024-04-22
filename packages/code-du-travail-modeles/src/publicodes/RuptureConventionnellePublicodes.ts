import type {
  Formula,
  IReferenceSalary,
  ISeniority,
  References,
} from "../modeles/common";
import {
  DismissalReasonFactory,
  IneligibilityRuptureConventionnelleFactory,
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCc,
} from "../modeles/common";
import type { IInegibility } from "../modeles/common/types/ineligibility";
import IndemniteLicenciementPublicodes from "./IndemniteLicenciementPublicodes";
import type {
  IndemniteDepartInstance,
  PublicodesDataWithFormula,
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { getExplanationAgreement, getMainExplanation } from "./utils";
import { mergeMissingArgs } from "./utils/merge-missing-args";

class IndemniteRuptureConventionnelleInstance
  implements IndemniteDepartInstance
{
  public ineligibility: IInegibility;

  public seniority: ISeniority<SupportedCc>;

  public salary: IReferenceSalary<SupportedCc>;

  constructor(idcc: SupportedCc) {
    this.ineligibility =
      new IneligibilityRuptureConventionnelleFactory().create(idcc);
    this.seniority = new SeniorityFactory().create(idcc);
    this.salary = new ReferenceSalaryFactory().create(idcc);
  }
}

class RuptureConventionnellePublicodes extends IndemniteLicenciementPublicodes {
  protected legalIneligibilityInstance: IInegibility =
    new IneligibilityRuptureConventionnelleFactory().create(
      SupportedCc.default
    );

  constructor(models: any, idcc?: string) {
    super(models, idcc);
    if (idcc) {
      this.agreementInstance = new IndemniteRuptureConventionnelleInstance(
        idcc as SupportedCc
      );
    }
  }

  getReferences(): References[] {
    return super.getReferences("rupture conventionnelle");
  }

  calculate(
    args: Record<string, string | undefined>
  ): PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult> {
    let agreementResult:
      | PublicodesData<PublicodesIndemniteLicenciementResult>
      | undefined = undefined;
    let agreementFormula: Formula | undefined = undefined;
    if (this.agreementInstance) {
      const dismissalReason = new DismissalReasonFactory().create(this.idcc);
      const reasons = dismissalReason.dismissalTypes();
      if (reasons.length === 0) {
        agreementResult = this.calculateAgreement(args);
        if (agreementResult) {
          agreementFormula = this.getFormuleAgreement();
        }
      } else {
        const situations = reasons.reduce<
          {
            calculate: PublicodesData<PublicodesIndemniteLicenciementResult>;
            formula: Formula;
          }[]
        >((acc, { rules }) => {
          const newArgs = args;
          rules.forEach(({ rule, value }) => {
            newArgs[rule] = value;
          });
          const calculatedAgreement = this.calculateAgreement(newArgs);
          const formula = this.getFormuleAgreement();
          if (calculatedAgreement) {
            acc.push({
              calculate: calculatedAgreement,
              formula,
            });
          }
          return acc;
        }, []);
        const missingArgsFinal = mergeMissingArgs(
          situations.map(({ calculate }) => calculate.missingArgs ?? [])
        );

        const agreementIneligibility = situations.find(
          ({ calculate }) => calculate.ineligibility
        );

        if (missingArgsFinal.length || agreementIneligibility) {
          return {
            ineligibility: agreementIneligibility?.calculate.ineligibility,
            missingArgs: missingArgsFinal,
            situation: this.data.situation,
          };
        }
        const elligibleSituations = situations.filter(
          (situation) => (situation.calculate.result?.value ?? 0) !== 0
        );
        const foundSituation = {
          ...elligibleSituations.reduce<{
            calculate: PublicodesData<PublicodesIndemniteLicenciementResult>;
            formula: Formula;
          }>((previous, current) => {
            return previous.calculate.result && current.calculate.result
              ? (previous.calculate.result.value ?? 0) <
                (current.calculate.result.value ?? 0)
                ? previous
                : current
              : current;
          }, elligibleSituations[0]),
          missingArgs: missingArgsFinal,
        };
        agreementResult = foundSituation.calculate;
        agreementFormula = foundSituation.formula;
      }
    }
    let legalResult:
      | PublicodesData<PublicodesIndemniteLicenciementResult>
      | undefined = undefined;
    let legalFormula: Formula | undefined = undefined;
    const noLegalIndemnity = this.hasNoLegalIndemnity();
    if (!noLegalIndemnity) {
      legalResult = this.calculateLegal(args, !!this.agreementInstance);
      legalFormula = this.getFormuleLegal();
    }
    if (!agreementResult?.result || this.idcc === SupportedCc.default) {
      return {
        detail: {
          chosenResult: "LEGAL",
          legalResult: legalResult?.result,
        },
        explanation: getMainExplanation(
          undefined,
          legalResult?.result?.value?.toString(),
          undefined
        ),
        formula: legalFormula,
        ineligibility: legalResult?.ineligibility,
        missingArgs: legalResult?.missingArgs ?? [],
        result: legalResult?.result,
        situation: this.data.situation,
      };
    }
    const chosenResult =
      !legalResult?.result || this.hasNoLegalIndemnity()
        ? "HAS_NO_LEGAL"
        : this.compareLegalAndAgreement(
            legalResult.result.value as number,
            agreementResult.result.value as number | undefined
          );

    return {
      detail: {
        agreementExplanation: getExplanationAgreement(
          true,
          this.idcc.toString(),
          agreementResult.result.value?.toString()
        ),
        agreementResult: agreementResult.result,
        chosenResult,
        legalResult: legalResult?.result,
      },
      explanation: getMainExplanation(
        legalResult?.result?.value?.toString(),
        agreementResult.result.value?.toString()
      ),
      formula: chosenResult !== "LEGAL" ? agreementFormula : legalFormula,
      ineligibility: agreementResult.ineligibility,
      missingArgs: agreementResult.missingArgs,
      result:
        chosenResult === "LEGAL" ? legalResult?.result : agreementResult.result,
      situation: agreementResult.situation,
    };
  }
}

export default RuptureConventionnellePublicodes;
