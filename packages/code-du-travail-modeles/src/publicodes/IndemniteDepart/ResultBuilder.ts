import type { Formula, References } from "../../modeles";
import type {
  ChosenResult,
  PublicodesIndemniteLicenciementResult,
  PublicodesOutput,
  SituationElement,
} from "../types";
import type { IndemniteDepartResult } from "./types";

export class ResultBuilder {
  buildResult(
    situation: SituationElement[],
    legalResult?: IndemniteDepartResult<PublicodesIndemniteLicenciementResult>,
    agreementResult?: IndemniteDepartResult<PublicodesIndemniteLicenciementResult>
  ): PublicodesOutput<PublicodesIndemniteLicenciementResult> {
    const { chosenResult, result, formula, references } = this.chosenResult(
      legalResult,
      agreementResult
    );

    return {
      detail: {
        agreementResult: agreementResult?.result,
        chosenResult,
        legalResult: legalResult?.result,
      },
      formula,
      notifications: agreementResult?.notifications ?? [],
      result,
      situation,
      references,
      type: "result",
    };
  }

  private chosenResult(
    legalResult?: IndemniteDepartResult<PublicodesIndemniteLicenciementResult>,
    agreementResult?: IndemniteDepartResult<PublicodesIndemniteLicenciementResult>
  ): {
    chosenResult: ChosenResult;
    result: PublicodesIndemniteLicenciementResult;
    formula: Formula;
    references: References[];
  } {
    if (!legalResult) {
      if (agreementResult === undefined) {
        throw new Error(
          "[HAS_NO_LEGAL] il manque le résultat de la convention collective"
        );
      }
      return {
        chosenResult: "HAS_NO_LEGAL",
        formula: agreementResult.formula,
        references: agreementResult.references,
        result: agreementResult.result,
      };
    }
    if (legalResult && (!agreementResult || !agreementResult.result)) {
      return {
        chosenResult: "LEGAL",
        formula: legalResult.formula,
        references: legalResult.references,
        result: legalResult.result,
      };
    }
    if (agreementResult && !legalResult) {
      return {
        chosenResult: "AGREEMENT",
        formula: agreementResult.formula,
        references: agreementResult.references,
        result: agreementResult.result,
      };
    }
    if (legalResult && agreementResult) {
      const legalValue = legalResult.result.value ?? 0;
      const agreementValue = agreementResult.result.value ?? 0;

      if (legalValue === agreementValue) {
        return {
          chosenResult: "SAME",
          formula: agreementResult.formula,
          references: agreementResult.references,
          result: agreementResult.result,
        };
      }
      if (legalValue < agreementValue) {
        return {
          chosenResult: "AGREEMENT",
          formula: agreementResult.formula,
          references: agreementResult.references,
          result: agreementResult.result,
        };
      }
      if (legalValue > agreementValue) {
        return {
          chosenResult: "LEGAL",
          formula: legalResult.formula,
          references: legalResult.references,
          result: legalResult.result,
        };
      }
    }
    throw new Error(
      "Le légal et le conventionnel ne peut être tous les deux undefined"
    );
  }
}
