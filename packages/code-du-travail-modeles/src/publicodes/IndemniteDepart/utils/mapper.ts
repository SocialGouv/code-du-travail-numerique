import type {
  IReferenceSalary,
  ISeniority,
  SupportedCc,
} from "../../../modeles";
import type { PublicodesIneligibility } from "../../types";

export const mapIneligibility = (text: string): PublicodesIneligibility => {
  return {
    ineligibility: text,
    type: "ineligibility",
  };
};

export const mapAgreementSeniorityArgs = (
  args: Record<string, string | undefined>,
  seniority: ISeniority<SupportedCc>
): Record<string, string | undefined> => {
  let newArgs = args;

  const missingArgSeniority = getMissingArg(args, [
    "contrat salarié . indemnité de licenciement . date d'entrée",
    "contrat salarié . indemnité de licenciement . date de sortie",
  ]);

  if (!missingArgSeniority) {
    const agreementSeniority = seniority.computeSeniority(
      seniority.mapSituation(args)
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

  return newArgs;
};

export const mapLegalSeniorityArgs = (
  args: Record<string, string | undefined>,
  seniority: ISeniority<SupportedCc>
): Record<string, string | undefined> => {
  let newArgs = args;

  const missingArgSeniority = getMissingArg(args, [
    "contrat salarié . indemnité de licenciement . date d'entrée",
    "contrat salarié . indemnité de licenciement . date de sortie",
  ]);

  if (!missingArgSeniority) {
    const legalSeniority = seniority.computeSeniority(
      seniority.mapSituation(args)
    );
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
};

export const mapAgreementRequiredSeniorityArgs = (
  args: Record<string, string | undefined>,
  seniority: ISeniority<SupportedCc>
): Record<string, string | undefined> => {
  const newArgs = args;

  const missingArgRequiredSeniority = getMissingArg(args, [
    "contrat salarié . indemnité de licenciement . date d'entrée",
    "contrat salarié . indemnité de licenciement . date de sortie",
    "contrat salarié . indemnité de licenciement . date de notification",
  ]);
  if (!missingArgRequiredSeniority) {
    const agreementRequiredSeniority = seniority.computeRequiredSeniority(
      seniority.mapRequiredSituation(args)
    );
    if (agreementRequiredSeniority.value !== undefined) {
      newArgs[
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
      ] = agreementRequiredSeniority.value.toString();
    }
  }

  return newArgs;
};

export const mapLegalRequiredSeniorityArgs = (
  args: Record<string, string | undefined>,
  seniority: ISeniority<SupportedCc>
): Record<string, string | undefined> => {
  const newArgs = { ...args };

  const missingArgRequiredSeniority = getMissingArg(args, [
    "contrat salarié . indemnité de licenciement . date d'entrée",
    "contrat salarié . indemnité de licenciement . date de sortie",
    "contrat salarié . indemnité de licenciement . date de notification",
  ]);
  if (!missingArgRequiredSeniority) {
    const legalRequiredSeniority = seniority.computeRequiredSeniority(
      seniority.mapRequiredSituation(newArgs)
    );
    if (legalRequiredSeniority.value !== undefined) {
      newArgs[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ] = legalRequiredSeniority.value.toString();
    }
  }

  return newArgs;
};

export const mapAgreementSalaryArgs = (
  args: Record<string, string | undefined>,
  salary: IReferenceSalary<SupportedCc>
): Record<string, string | undefined> => {
  let newArgs = args;

  if (
    args.salaryPeriods &&
    !args[
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel"
    ]
  ) {
    const salarySituation = salary.mapSituation
      ? salary.mapSituation(args)
      : {
          salaires: args.salaryPeriods ? JSON.parse(args.salaryPeriods) : [],
        };
    const salaryExtraInfo = salary.computeExtraInfo
      ? salary.computeExtraInfo(salarySituation)
      : {};
    const value = salary.computeReferenceSalary(salarySituation);
    if (value) {
      newArgs = {
        ...newArgs,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          value.toString(),
        ...salaryExtraInfo,
      };
    }
  }
  return removeNonPublicodeFields(newArgs);
};

export const mapLegalSalaryArgs = (
  args: Record<string, string | undefined>,
  salary: IReferenceSalary<SupportedCc>
): Record<string, string | undefined> => {
  let newArgs = args;

  if (
    !args["contrat salarié . indemnité de licenciement . salaire de référence"]
  ) {
    const value = salary.computeReferenceSalary({
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
  return removeNonPublicodeFields(newArgs);
};

const getMissingArg = (
  args: Record<string, string | undefined>,
  names: string[]
): string | undefined => {
  let missingArg: string | undefined = undefined;
  names.some((name) => {
    if (!args[name]) {
      missingArg = name;
      return true;
    }
    return false;
  });
  return missingArg;
};

export const removeNonPublicodeFields = (
  args: Record<string, string | undefined>
): Record<string, string | undefined> => {
  return Object.keys(args).reduce((filteredObj, key) => {
    if (key.startsWith("contrat salarié . ") && args[key]) {
      return {
        ...filteredObj,
        [key]: args[key],
      };
    }
    return filteredObj;
  }, {});
};
