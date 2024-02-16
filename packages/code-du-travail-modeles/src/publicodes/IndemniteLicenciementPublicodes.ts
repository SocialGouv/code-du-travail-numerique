import type { EvaluatedNode } from "publicodes";

import type {
  RequiredSeniorityResult,
  SeniorityResult,
} from "../modeles/common";
import {
  IneligibilityFactory,
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../modeles/common";
import type { Publicodes } from "./Publicodes";
import { PublicodesBase } from "./PublicodesBase";
import type {
  PublicodesData,
  PublicodesIndemniteLicenciementResult,
} from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";

class IndemniteLicenciementPublicodes
  extends PublicodesBase<PublicodesIndemniteLicenciementResult>
  implements Publicodes<PublicodesIndemniteLicenciementResult>
{
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
  }

  getMissingArg(
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

  mapMissingArg(
    name: string
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    return {
      missingArgs: [
        {
          indice: 0,
          name,
          rawNode: {
            nom: name,
          },
        },
      ],
      result: { value: 0 },
      situation: [],
    };
  }

  mapIneligibility(
    text: string
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    return {
      ineligibility: text,
      missingArgs: [],
      result: { value: 0 },
      situation: [],
    };
  }

  removeNonPublicodeFields(
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    return Object.keys(args).reduce((filteredObj, key) => {
      if (key.startsWith("contrat salarié . ") && args[key]) {
        return {
          ...filteredObj,
          [key]: args[key],
        };
      }
      return filteredObj;
    }, {});
  }

  calculate(
    args: Record<string, string | undefined>,
    targetRule?: string
  ): PublicodesData<PublicodesIndemniteLicenciementResult> {
    let newArgs = args;
    const ineligibilityInstance = new IneligibilityFactory().create(this.idcc);
    const ineligibility = ineligibilityInstance.getIneligibility(newArgs);
    if (ineligibility) {
      return this.mapIneligibility(ineligibility);
    }
    if (
      !args[
        "contrat salarié . indemnité de licenciement . ancienneté en année"
      ] ||
      !args[
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année"
      ]
    ) {
      const missingArg = this.getMissingArg(args, [
        "contrat salarié . indemnité de licenciement . date d'entrée",
        "contrat salarié . indemnité de licenciement . date de sortie",
      ]);
      if (missingArg) {
        return this.mapMissingArg(missingArg);
      }
      const agreement = new SeniorityFactory().create(this.idcc);
      const agreementSeniority: SeniorityResult = agreement.computeSeniority(
        agreement.mapSituation(args)
      );
      const legal = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalSeniority: SeniorityResult = legal.computeSeniority(
        legal.mapSituation(args)
      );
      if (legalSeniority.value) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            legalSeniority.value.toString(),
          ...legalSeniority.extraInfos,
        };
      }
      if (agreementSeniority.value) {
        newArgs = {
          ...newArgs,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            agreementSeniority.value.toString(),
          ...agreementSeniority.extraInfos,
        };
      }
    }
    if (
      !args[
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
      ] ||
      !args[
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
      ]
    ) {
      const missingArg = this.getMissingArg(args, [
        "contrat salarié . indemnité de licenciement . date d'entrée",
        "contrat salarié . indemnité de licenciement . date de sortie",
        "contrat salarié . indemnité de licenciement . date de notification",
      ]);
      if (missingArg) {
        return this.mapMissingArg(missingArg);
      }
      const agreement = new SeniorityFactory().create(this.idcc);
      const agreementRequiredSeniority: RequiredSeniorityResult =
        agreement.computeRequiredSeniority(
          agreement.mapRequiredSituation(args)
        );
      const legal = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalRequiredSeniority: RequiredSeniorityResult =
        legal.computeRequiredSeniority(legal.mapRequiredSituation(args));
      if (legalRequiredSeniority.value) {
        newArgs[
          "contrat salarié . indemnité de licenciement . ancienneté requise en année"
        ] = legalRequiredSeniority.value.toString();
      }
      if (agreementRequiredSeniority.value) {
        newArgs[
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année"
        ] = agreementRequiredSeniority.value.toString();
      }
    }
    const ineligibilityWithSeniority =
      ineligibilityInstance.getIneligibility(newArgs);
    if (ineligibilityWithSeniority) {
      return this.mapIneligibility(ineligibilityWithSeniority);
    }
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
      !args[
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel"
      ]
    ) {
      const s = new ReferenceSalaryFactory().create(this.idcc);
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
      if (s.removeSpecificSituation) {
        newArgs = s.removeSpecificSituation(newArgs);
      }
    }
    const situation = this.removeNonPublicodeFields(newArgs);
    return super.setSituation(situation, targetRule);
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode
  ): PublicodesIndemniteLicenciementResult {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }
}

export default IndemniteLicenciementPublicodes;
