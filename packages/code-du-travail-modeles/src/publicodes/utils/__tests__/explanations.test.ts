import { getExplanationAgreement, getMainExplanation } from "../explanations";

describe("Explanations", () => {
  describe("getMainExplanation", () => {
    it('should return "HAS_NOT_SELECTED_AGREEMENT" when no agreement is selected', () => {
      expect(getMainExplanation(undefined, "100", "200")).toEqual(
        "HAS_NOT_SELECTED_AGREEMENT"
      );
    });

    it('should return "AGREEMENT_NOT_SUPPORTED" when agreement is not supported', () => {
      expect(getMainExplanation("1603", "100", "200")).toEqual(
        "AGREEMENT_NOT_SUPPORTED"
      );
    });

    it('should return "AGREEMENT_RESULT_ZERO" when agreement result is 0', () => {
      expect(getMainExplanation("44", "100", "0")).toEqual(
        "AGREEMENT_RESULT_ZERO"
      );
    });

    it('should return "LEGAL_RESULT_ZERO_BUT_AGREEMENT" when legal result is 0 and agreement result is more than 0', () => {
      expect(getMainExplanation("44", "0", "200")).toEqual(
        "LEGAL_RESULT_ZERO_BUT_AGREEMENT"
      );
    });

    it('should return "SAME_AMOUNT" when agreement result and legal result are the same and not 0', () => {
      expect(getMainExplanation("44", "200", "200")).toEqual("SAME_AMOUNT");
    });

    it('should return "AGREEMENT_AMOUNT_MORE" when agreement result is more than legal result', () => {
      expect(getMainExplanation("44", "100", "200")).toEqual(
        "AGREEMENT_AMOUNT_MORE"
      );
    });

    it('should return "LEGAL_AMOUNT_MORE" when legal result is more than agreement result', () => {
      expect(getMainExplanation("44", "200", "100")).toEqual(
        "LEGAL_AMOUNT_MORE"
      );
    });

    it("should throw an error when no condition is met", () => {
      expect(getMainExplanation("44", "NaN", "NaN")).toEqual("NO_EXPLANATION");
    });
  });

  describe("getExplanationAgreement", () => {
    it("should return explanation for agreement result when agreement result is 0", () => {
      const result = getExplanationAgreement(true, "44", "0");

      expect(result).toEqual("AGREEMENT_RESULT_ZERO");
    });

    it("should return explanation for agreement result when hasSelectedAgreement is false", () => {
      const result = getExplanationAgreement(true, undefined, "1");

      expect(result).toEqual("NO_AGREEMENT_SELECTED");
    });

    it("should return explanation for hors ani when isHorsAni is true", () => {
      const result = getExplanationAgreement(true, "413", "1");

      expect(result).toEqual("IS_HORS_ANI");
    });

    it("should return explanation for not supported when isAgreementSupported is true", () => {
      const result = getExplanationAgreement(true, "44", "1");

      expect(result).toEqual("NO_EXPLANATION");
    });
  });
});
