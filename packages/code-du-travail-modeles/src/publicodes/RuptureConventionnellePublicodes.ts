import type { References } from "../modeles/common";
import {
  DismissalReasonFactory,
  SupportedCcIndemniteLicenciement,
} from "../modeles/common";
import IndemniteLicenciementPublicodes from "./IndemniteLicenciementPublicodes";
import type {
  PublicodesData,
  PublicodesDataWithFormula,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { mergeMissingArgs } from "./utils";

class RuptureConventionnellePublicodes extends IndemniteLicenciementPublicodes {
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
      } else {
        const situations = reasons.map(({ rules }) => {
          const newArgs = args;
          rules.forEach(({ rule, value }) => {
            newArgs[rule] = value;
          });
          return this.calculateAgreement(newArgs);
        });
        const missingArgsFinal = mergeMissingArgs(
          situations.map((item) => item.missingArgs)
        );

        const agreementIneligibility = situations.find(
          ({ ineligibility }) => ineligibility
        );

        if (missingArgsFinal.length || agreementIneligibility) {
          console.log("missingArgsFinal", missingArgsFinal);
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
      let legalResult:
        | PublicodesData<PublicodesIndemniteLicenciementResult>
        | undefined = undefined;
      const noLegalIndemnity = this.hasNoLegalIndemnity();
      if (!noLegalIndemnity) {
        legalResult = this.calculateLegal(args);
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
      if (this.idcc === SupportedCcIndemniteLicenciement.default) {
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
        !agreementResult.result?.value ||
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
          chosenResult === "LEGAL"
            ? legalResult?.result
            : agreementResult.result,
        situation: agreementResult.situation,
      };
    }
  }
}

export default RuptureConventionnellePublicodes;
