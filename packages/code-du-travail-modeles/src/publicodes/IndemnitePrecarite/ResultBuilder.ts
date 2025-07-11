import type { Formula, References } from "../../modeles";
import type {
  ChosenResult,
  PublicodesOutput,
  SituationElement,
} from "../types";
import type { ExplanationBuilder } from "../common/ExplanationBuilder";
import { BuilderResult, PublicodesCalculateResult } from "../common/type";

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
    if (agreementResult?.result.value) {
      return {
        chosenResult: "AGREEMENT",
        formula: agreementResult.formula,
        references: agreementResult.references,
        result: agreementResult.result,
      };
    }
    if (legalResult?.result.value) {
      return {
        chosenResult: "LEGAL",
        formula: legalResult.formula,
        references: legalResult.references,
        result: legalResult.result,
      };
    }
    return {
      chosenResult: "HAS_NO_LEGAL",
      formula: {
        explanations: [],
        formula: "",
      },
      references: [],
      result: {
        value: 0,
      },
    };
  }
}
