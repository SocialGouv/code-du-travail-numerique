import { ExplanationBuilder } from "../../common/ExplanationBuilder";
import { ExplanationBuilderRuptureCo } from "../ExplanationBuilderRuptureCo";

describe("Explanations", () => {
  describe("getMainExplanation", () => {
    it('should return "HAS_NOT_SELECTED_AGREEMENT" when no agreement is selected', () => {
      const explanationBuilder = new ExplanationBuilder(undefined);

      expect(explanationBuilder.getMainExplanation(100, 200)).toEqual(
        "HAS_NOT_SELECTED_AGREEMENT"
      );
    });

    it('should return "AGREEMENT_NOT_SUPPORTED" when agreement is not supported', () => {
      const explanationBuilder = new ExplanationBuilder("1603");

      expect(explanationBuilder.getMainExplanation(100, 200)).toEqual(
        "AGREEMENT_NOT_SUPPORTED"
      );
    });

    it('should return "AGREEMENT_RESULT_ZERO" when agreement result is 0', () => {
      const explanationBuilder = new ExplanationBuilder("44");

      expect(explanationBuilder.getMainExplanation(100, 0)).toEqual(
        "AGREEMENT_RESULT_ZERO"
      );
    });

    it('should return "LEGAL_RESULT_ZERO_BUT_AGREEMENT" when legal result is 0 and agreement result is more than 0', () => {
      const explanationBuilder = new ExplanationBuilder("44");

      expect(explanationBuilder.getMainExplanation(0, 200)).toEqual(
        "LEGAL_RESULT_ZERO_BUT_AGREEMENT"
      );
    });

    it('should return "SAME_AMOUNT" when agreement result and legal result are the same and not 0', () => {
      const explanationBuilder = new ExplanationBuilder("44");

      expect(explanationBuilder.getMainExplanation(200, 200)).toEqual(
        "SAME_AMOUNT"
      );
    });

    it('should return "AGREEMENT_AMOUNT_MORE" when agreement result is more than legal result', () => {
      const explanationBuilder = new ExplanationBuilder("44");

      expect(explanationBuilder.getMainExplanation(100, 200)).toEqual(
        "AGREEMENT_AMOUNT_MORE"
      );
    });

    it('should return "LEGAL_AMOUNT_MORE" when legal result is more than agreement result', () => {
      const explanationBuilder = new ExplanationBuilder("44");

      expect(explanationBuilder.getMainExplanation(200, 100)).toEqual(
        "LEGAL_AMOUNT_MORE"
      );
    });

    it("should throw an error when no condition is met", () => {
      const explanationBuilder = new ExplanationBuilder("44");

      expect(explanationBuilder.getMainExplanation(NaN, NaN)).toEqual(
        "NO_EXPLANATION"
      );
    });
  });

  describe("getExplanationAgreement", () => {
    it("should return explanation for agreement result when agreement result is 0", () => {
      const explanationBuilder = new ExplanationBuilder("44");

      const result = explanationBuilder.getAgreementExplanation(0);

      expect(result).toEqual("AGREEMENT_RESULT_ZERO");
    });

    it("should return explanation for agreement result when hasSelectedAgreement is false", () => {
      const explanationBuilder = new ExplanationBuilder(undefined);

      const result = explanationBuilder.getAgreementExplanation(0);

      expect(result).toEqual("NO_AGREEMENT_SELECTED");
    });

    it("should return explanation for hors ani when isHorsAni is true", () => {
      const explanationBuilder = new ExplanationBuilderRuptureCo("1518");

      const result = explanationBuilder.getAgreementExplanation(10);

      expect(result).toEqual("IS_HORS_ANI");
    });

    it("should return explanation for agreement not supported", () => {
      const explanationBuilder = new ExplanationBuilder("1212");

      const result = explanationBuilder.getAgreementExplanation(10);

      expect(result).toEqual("AGREEMENT_NOT_SUPPORTED");
    });
  });
});
