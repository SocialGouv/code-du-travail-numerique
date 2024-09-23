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
    let legalArgs = this.removeAgreementFields(args);
    const ineligibility = this.ineligibility.getIneligibility(legalArgs);
    if (ineligibility) {
      return mapIneligibility(ineligibility);
    }
    legalArgs = mapLegalSeniorityArgs(legalArgs, this.seniority);
    legalArgs = mapLegalRequiredSeniorityArgs(legalArgs, this.seniority);
    if (!disableIneligibilityWithSeniority) {
      const ineligibilityWithSeniority =
        this.ineligibility.getIneligibility(legalArgs);
      if (ineligibilityWithSeniority) {
        return mapIneligibility(ineligibilityWithSeniority);
      }
    }
    legalArgs = mapLegalSalaryArgs(legalArgs, this.salary);
    const situation = removeNonPublicodeFields(legalArgs);
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

  private removeAgreementFields(
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    return Object.keys(args)
      .filter(
        (key) => !key.startsWith("contrat salarié . convention collective")
      )
      .reduce((obj: Record<string, string | undefined>, key) => {
        obj[key] = args[key];
        return obj;
      }, {});
  }
}
