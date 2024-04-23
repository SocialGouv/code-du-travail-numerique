import type { Formula, References } from "../../modeles";
import type {
  ChosenResult,
  PublicodesIndemniteLicenciementResult,
  PublicodesOutput,
  SituationElement,
} from "../types";
import type { ExplanationBuilder } from "./ExplanationBuilder";
import type { IndemniteDepartResult } from "./types";

export class ResultBuilder {
  private readonly explanationBuilder: ExplanationBuilder;

  constructor(explanationBuilder: ExplanationBuilder) {
    this.explanationBuilder = explanationBuilder;
  }

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
        agreementExplanation: this.explanationBuilder.getAgreementExplanation(
          agreementResult?.result?.value
        ),
        agreementResult: agreementResult?.result,
        chosenResult,
        legalResult: legalResult?.result,
      },
      explanation: this.explanationBuilder.getMainExplanation(
        legalResult?.result?.value,
        agreementResult?.result?.value
      ),
      formula,
      notifications: agreementResult?.notifications ?? [],
      references,
      result,
      situation,
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
      if (agreementResult === undefined || !agreementResult.result) {
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
    if (legalResult.result && (!agreementResult || !agreementResult.result)) {
      return {
        chosenResult: "LEGAL",
        formula: legalResult.formula,
        references: legalResult.references,
        result: legalResult.result,
      };
    }
    if (agreementResult?.result) {
      return {
        chosenResult: "AGREEMENT",
        formula: agreementResult.formula,
        references: agreementResult.references,
        result: agreementResult.result,
      };
    }
    if (legalResult.result && agreementResult?.result) {
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
