import type { IDismissalReason, SupportedCc } from "../../modeles";
import {
  DismissalReasonFactory,
  IneligibilityRuptureConventionnelleFactory,
} from "../../modeles";
import type { PublicodesBase } from "../PublicodesBase";
import type {
  PublicodesIndemniteLicenciementResult,
  PublicodesIneligibility,
} from "../types";
import { mergeMissingArgs } from "../utils";
import { Agreement } from "./Agreement";
import type { AgreementIndemniteCompute } from "./AgreementIndemniteCompute";
import type { IndemniteDepartOutput, IndemniteDepartResult } from "./types";

export class AgreementRuptureCo implements AgreementIndemniteCompute {
  public readonly dismissalReason: IDismissalReason;

  public readonly agreement: Agreement;

  constructor(idcc: SupportedCc) {
    this.dismissalReason = new DismissalReasonFactory().create(idcc);
    this.agreement = new Agreement(
      idcc,
      new IneligibilityRuptureConventionnelleFactory().create(idcc)
    );
  }

  calculate(
    args: Record<string, string | undefined>,
    publicodes: PublicodesBase<PublicodesIndemniteLicenciementResult>
  ): IndemniteDepartOutput<PublicodesIndemniteLicenciementResult> {
    const reasons = this.dismissalReason.dismissalTypes();
    if (reasons.length === 0) {
      return this.agreement.calculate(args, publicodes);
    } else {
      const situations = reasons.reduce<
        IndemniteDepartOutput<PublicodesIndemniteLicenciementResult>[]
      >((acc, { rules }) => {
        const newArgs = args;
        rules.forEach(({ rule, value }) => {
          newArgs[rule] = value;
        });
        const result = this.agreement.calculate(newArgs, publicodes);
        acc.push(result);
        return acc;
      }, []);
      const missingArgsFinal = mergeMissingArgs(
        situations.map((result) =>
          result.type === "missing-args" ? result.missingArgs : []
        )
      );

      const agreementIneligibility = situations.find(
        (situation) => situation.type === "ineligibility"
      ) as PublicodesIneligibility | undefined;

      if (missingArgsFinal.length) {
        return {
          missingArgs: missingArgsFinal,
          type: "missing-args",
        };
      }
      if (agreementIneligibility) {
        return agreementIneligibility;
      }
      // Here, all situations must be a result
      if (situations.filter((item) => item.type !== "result").length) {
        throw new Error(
          "Certains résultats comporte des missing args ou une elligibilité, cela ne doit pas arriver dans le cas présent"
        );
      }
      const allSituations =
        situations as IndemniteDepartResult<PublicodesIndemniteLicenciementResult>[];

      const elligibleSituations = allSituations.filter(
        (situation) => situation.result?.value && situation.result.value !== 0
      );
      const foundSituation = {
        ...elligibleSituations.reduce<
          IndemniteDepartResult<PublicodesIndemniteLicenciementResult>
        >((previous, current) => {
          return (previous.result?.value ?? 0) < (current.result?.value ?? 0)
            ? previous
            : current;
        }, elligibleSituations[0]),
        missingArgs: missingArgsFinal,
      };
      return foundSituation;
    }
  }
}
