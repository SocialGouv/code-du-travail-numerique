import type { IReferenceSalary, ISeniority } from "../../modeles";
import {
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCc,
} from "../../modeles";
import type { IInegibility } from "../../modeles/common/types/ineligibility";
import type { PublicodesBase } from "../PublicodesBase";
import type { PublicodesIndemniteLicenciementResult } from "../types";
import type { AgreementIndemniteCompute } from "./AgreementIndemniteCompute";
import type { IndemniteDepartOutput } from "./types";
import {
  mapAgreementRequiredSeniorityArgs,
  mapAgreementSalaryArgs,
  mapAgreementSeniorityArgs,
  mapIneligibility,
  mapLegalRequiredSeniorityArgs,
  mapLegalSeniorityArgs,
  removeNonPublicodeFields,
} from "./utils";

export class Agreement implements AgreementIndemniteCompute {
  public readonly ineligibility: IInegibility;

  public readonly seniority: ISeniority<SupportedCc>;

  public readonly legalSeniority: ISeniority<SupportedCc>;

  public readonly salary: IReferenceSalary<SupportedCc>;

  constructor(idcc: SupportedCc, ineligibility: IInegibility) {
    this.ineligibility = ineligibility;
    this.seniority = new SeniorityFactory().create(idcc);
    this.legalSeniority = new SeniorityFactory().create(SupportedCc.default);
    this.salary = new ReferenceSalaryFactory().create(idcc);
  }

  calculate(
    args: Record<string, string | undefined>,
    publicodes: PublicodesBase<PublicodesIndemniteLicenciementResult>
  ): IndemniteDepartOutput<PublicodesIndemniteLicenciementResult> {
    const ineligibility = this.ineligibility.getIneligibility(args);
    if (ineligibility) {
      return mapIneligibility(ineligibility);
    }
    args = mapAgreementSeniorityArgs(args, this.seniority);
    args = mapAgreementRequiredSeniorityArgs(args, this.seniority);
    // For legacy reason, to compute the ineligibility of the agreement, we need to compute required legal seniority and legal seniority
    const argsWithLegalSeniority = mapLegalSeniorityArgs(
      mapLegalRequiredSeniorityArgs(args, this.legalSeniority),
      this.legalSeniority
    );
    const ineligibilityWithSeniority = this.ineligibility.getIneligibility(
      argsWithLegalSeniority
    );
    if (ineligibilityWithSeniority) {
      return mapIneligibility(ineligibilityWithSeniority);
    }
    args = mapAgreementSalaryArgs(args, this.salary);
    const situation = removeNonPublicodeFields(args);
    const result = publicodes.setSituation(
      situation,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    if (result.missingArgs.length > 0) {
      return {
        missingArgs: result.missingArgs,
        type: "missing-args",
      };
    }
    return {
      formula: publicodes.getFormuleAgreement(),
      notifications: publicodes.getNotifications(),
      references: publicodes.getReferences("résultat conventionnel"),
      result: result.result,
      type: "result",
    };
  }
}
