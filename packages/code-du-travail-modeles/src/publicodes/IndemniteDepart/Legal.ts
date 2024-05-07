import type { IReferenceSalary, ISeniority } from "../../modeles";
import {
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCc,
} from "../../modeles";
import type { IInegibility } from "../../modeles/common/types/ineligibility";
import type { PublicodesBase } from "../PublicodesBase";
import type { PublicodesIndemniteLicenciementResult } from "../types";
import type { IndemniteDepartOutput } from "./types";
import {
  mapIneligibility,
  mapLegalRequiredSeniorityArgs,
  mapLegalSalaryArgs,
  mapLegalSeniorityArgs,
  removeNonPublicodeFields,
} from "./utils";

export class Legal {
  public readonly ineligibility: IInegibility;

  public readonly seniority: ISeniority<SupportedCc>;

  public readonly salary: IReferenceSalary<SupportedCc>;

  constructor(ineligibility: IInegibility) {
    this.ineligibility = ineligibility;
    this.seniority = new SeniorityFactory().create(SupportedCc.default);
    this.salary = new ReferenceSalaryFactory().create(SupportedCc.default);
  }

  calculate(
    args: Record<string, string | undefined>,
    publicodes: PublicodesBase<PublicodesIndemniteLicenciementResult>,
    disableIneligibilityWithSeniority: boolean
  ): IndemniteDepartOutput<PublicodesIndemniteLicenciementResult> {
    const ineligibility = this.ineligibility.getIneligibility(args);
    if (ineligibility) {
      return mapIneligibility(ineligibility);
    }
    args = mapLegalSeniorityArgs(args, this.seniority);
    args = mapLegalRequiredSeniorityArgs(args, this.seniority);
    if (!disableIneligibilityWithSeniority) {
      const ineligibilityWithSeniority =
        this.ineligibility.getIneligibility(args);
      if (ineligibilityWithSeniority) {
        return mapIneligibility(ineligibilityWithSeniority);
      }
    }
    args = mapLegalSalaryArgs(args, this.salary);
    const situation = removeNonPublicodeFields(args);
    const result = publicodes.setSituation(
      situation,
      "contrat salarié . indemnité de licenciement . résultat légal"
    );
    if (result.missingArgs.length > 0) {
      return {
        missingArgs: result.missingArgs,
        type: "missing-args",
      };
    }
    return {
      formula: publicodes.getFormuleLegal(),
      notifications: [],
      references: publicodes.getReferences(),
      result: result.result,
      type: "result",
    };
  }
}
