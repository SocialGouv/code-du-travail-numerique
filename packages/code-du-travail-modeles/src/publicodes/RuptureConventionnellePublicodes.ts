import type {
  IReferenceSalary,
  ISeniority,
  References,
} from "../modeles/common";
import {
  DismissalReasonFactory,
  IneligibilityRuptureConventionnelleFactory,
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
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

  public seniority: ISeniority<SupportedCcIndemniteLicenciement>;

  public salary: IReferenceSalary<SupportedCcIndemniteLicenciement>;

  constructor(idcc: SupportedCcIndemniteLicenciement) {
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
        idcc as SupportedCcIndemniteLicenciement
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
    if (this.idcc !== SupportedCcIndemniteLicenciement.default) {
      const dismissalReason = new DismissalReasonFactory().create(this.idcc);
      const reasons = dismissalReason.dismissalTypes();
      if (reasons.length === 0) {
        agreementResult = this.calculateAgreement(args);
        if (agreementResult) {
          return {
            detail: {
              agreementResult: agreementResult.result,
              chosenResult: "AGREEMENT",
            },
            formula: this.getFormule(),
            missingArgs: agreementResult.missingArgs,
            result: agreementResult.result,
            situation: this.data.situation,
          };
        }
      } else {
        const situations = reasons.reduce<
          PublicodesData<PublicodesIndemniteLicenciementResult>[]
        >((acc, { rules }) => {
          const newArgs = args;
          rules.forEach(({ rule, value }) => {
            newArgs[rule] = value;
          });
          const calculatedAgreement = this.calculateAgreement(newArgs);
          if (calculatedAgreement) {
            acc.push(calculatedAgreement);
          }
          return acc;
        }, []);
        const missingArgsFinal = mergeMissingArgs(
          situations.map((item) => item.missingArgs ?? [])
        );

        const agreementIneligibility = situations.find(
          (situation) => situation.ineligibility
        );

        if (missingArgsFinal.length || agreementIneligibility) {
          return {
            ineligibility: agreementIneligibility?.ineligibility,
            missingArgs: missingArgsFinal,
            situation: this.data.situation,
          };
        }
        agreementResult = {
          ...situations.reduce((previous, current) => {
            return previous.result?.value
              ? previous.result.value < (current.result?.value ?? 0)
                ? previous
                : current
              : current;
          }, situations[0]),
          missingArgs: missingArgsFinal,
        };
      }
    }
    let legalResult:
      | PublicodesData<PublicodesIndemniteLicenciementResult>
      | undefined = undefined;
    const noLegalIndemnity = this.hasNoLegalIndemnity();
    if (!noLegalIndemnity) {
      legalResult = this.calculateLegal(args, !!this.agreementInstance);
      if (
        !legalResult.result ||
        legalResult.missingArgs.length ||
        legalResult.ineligibility
      ) {
        console.log("legalResult", legalResult);
        return {
          ineligibility: legalResult.ineligibility,
          missingArgs: legalResult.missingArgs,
          situation: this.data.situation,
        };
      }
    }
    if (
      !agreementResult?.result ||
      this.idcc === SupportedCcIndemniteLicenciement.default
    ) {
      return {
        detail: {
          chosenResult: "LEGAL",
          legalResult: legalResult?.result,
        },
        formula: this.getFormule(),
        missingArgs: legalResult?.missingArgs ?? [],
        result: legalResult?.result,
        situation: this.data.situation,
      };
    }
    const chosenResult =
      !agreementResult.result.value ||
      !legalResult?.result?.value ||
      this.hasNoLegalIndemnity()
        ? "HAS_NO_LEGAL"
        : this.compareLegalAndAgreement(
            legalResult.result.value as number,
            agreementResult.result.value as number
          );
    console.log("legalResult", legalResult);
    console.log("agreementResult", agreementResult);
    return {
      detail: {
        agreementResult: agreementResult.result,
        chosenResult,
        legalResult: legalResult?.result,
      },
      ineligibility: agreementResult.ineligibility,
      missingArgs: agreementResult.missingArgs,
      result:
        chosenResult === "LEGAL" ? legalResult?.result : agreementResult.result,
      situation: agreementResult.situation,
    };
  }
}

export default RuptureConventionnellePublicodes;
