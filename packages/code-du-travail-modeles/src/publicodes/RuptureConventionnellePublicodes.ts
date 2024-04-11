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
  PublicodesData,
  PublicodesDataWithFormula,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { mergeMissingArgs } from "./utils";

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
        agreementFormula = this.getFormule();
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
          const formula = this.getFormule();
          if (calculatedAgreement) {
            acc.push({ calculate: calculatedAgreement, formula });
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
        const foundSituation = {
          ...situations.reduce((previous, current) => {
            return previous.calculate.result?.value
              ? previous.calculate.result.value <
                (current.calculate.result?.value ?? 0)
                ? previous
                : current
              : current;
          }, situations[0]),
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
      legalFormula = this.getFormule();
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
    if (!agreementResult?.result || this.idcc === SupportedCc.default) {
      return {
        detail: {
          chosenResult: "LEGAL",
          legalResult: legalResult?.result,
        },
        formula: legalFormula,
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
        agreementResult: agreementResult.result,
        chosenResult,
        legalResult: legalResult?.result,
      },
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
