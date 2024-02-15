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
        return false;
      }
      return true;
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

  removeNonPublicodeFields(args: Record<string, string | undefined>) {
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
    const { absencePeriods, salaryPeriods, ...situation } = args;
    const result = super.setSituation(
      this.removeNonPublicodeFields(args),
      targetRule
    );
    const ineligibilityInstance = new IneligibilityFactory().create(this.idcc);
    const ineligibility = ineligibilityInstance.getIneligibility(situation);
    if (ineligibility) {
      return {
        explanation: ineligibility,
        missingArgs: [],
        result: {
          value: 0,
        },
        situation: [],
      };
    }
    const isSeniorityMissing = !Object.keys(args).find(
      (name) =>
        name ===
        "contrat salarié . indemnité de licenciement . ancienneté en année"
    );
    console.log("isSeniorityMissing", isSeniorityMissing);
    if (isSeniorityMissing) {
      const missingArg = this.getMissingArg(args, [
        "contrat salarié . indemnité de licenciement . date d'entrée",
        "contrat salarié . indemnité de licenciement . date de sortie",
      ]);
      if (missingArg) {
        return this.mapMissingArg(missingArg);
      }
      const agreement = new SeniorityFactory().create(this.idcc);
      const agreementSeniority: SeniorityResult = agreement.computeSeniority(
        agreement.mapSituation({ absencePeriods, ...situation })
      );
      const legal = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalSeniority: SeniorityResult = legal.computeSeniority(
        legal.mapSituation({ absencePeriods, ...situation })
      );
      return this.calculate({
        ...situation,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          agreementSeniority.value.toString(),
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          legalSeniority.value.toString(),
        salaryPeriods,
        ...legalSeniority.extraInfos,
        ...agreementSeniority.extraInfos,
      });
    }
    const isSeniorityRequiredMissing = !Object.keys(situation).find(
      (name) =>
        name ===
        "contrat salarié . indemnité de licenciement . ancienneté requise en année"
    );
    if (isSeniorityRequiredMissing) {
      const missingArg = this.getMissingArg(situation, [
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
      return this.calculate({
        ...situation,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          agreementRequiredSeniority.value.toString(),
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          legalRequiredSeniority.value.toString(),
        salaryPeriods,
      });
    }
    const isReferenceSalaryMissing = !Object.keys(args).find(
      (name) =>
        name ===
        "contrat salarié . indemnité de licenciement . salaire de référence"
    );
    if (isReferenceSalaryMissing) {
      const agreementReferenceSalary = new ReferenceSalaryFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const value = agreementReferenceSalary.computeReferenceSalary({
        salaires: salaryPeriods ? JSON.parse(salaryPeriods) : [],
      });
      if (value) {
        return this.calculate({
          ...situation,
          "contrat salarié . indemnité de licenciement . salaire de référence":
            value.toString(),
        });
      }
    }
    return result;
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
