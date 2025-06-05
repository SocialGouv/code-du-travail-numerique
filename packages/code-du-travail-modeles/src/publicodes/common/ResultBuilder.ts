import type { Formula, References } from "../../modeles";
import type {
  ChosenResult,
  PublicodesOutput,
  SituationElement,
} from "../types";
import type { ExplanationBuilder } from "./ExplanationBuilder";
import { BuilderResult, PublicodesCalculateResult } from "./type";

export class ResultBuilder {
  private readonly explanationBuilder: ExplanationBuilder;

  constructor(explanationBuilder: ExplanationBuilder) {
    this.explanationBuilder = explanationBuilder;
  }

  buildResult(
    situation: SituationElement[],
    legalResult?: BuilderResult<PublicodesCalculateResult>,
    agreementResult?: BuilderResult<PublicodesCalculateResult>
  ): PublicodesOutput<PublicodesCalculateResult> {
    const { chosenResult, result, formula, references } = this.chosenResult(
      legalResult,
      agreementResult
    );

    return {
      detail: {
        agreementExplanation: this.explanationBuilder.getAgreementExplanation(
          agreementResult?.result.value
        ),
        agreementResult: agreementResult?.result,
        chosenResult,
        legalResult: legalResult?.result,
      },
      explanation: this.explanationBuilder.getMainExplanation(
        legalResult?.result.value,
        agreementResult?.result.value
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
    legalResult?: BuilderResult<PublicodesCalculateResult>,
    agreementResult?: BuilderResult<PublicodesCalculateResult>
  ): {
    chosenResult: ChosenResult;
    result: PublicodesCalculateResult;
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
