import {
  getDecryptedValue,
  getDecryptedValueAgreement,
} from "../getDecryptedValue";
import {
  ExplanationAgreementResult,
  ExplanationMainResult,
} from "@socialgouv/modeles-social";

describe("getDecryptedValueAgreement", () => {
  it("should return default result when value is undefined", () => {
    expect(getDecryptedValueAgreement(undefined, "1000")).toBe("1000 €");
  });

  it.each([
    ["IS_HORS_ANI", "Non applicable dans votre situation"],
    ["NO_AGREEMENT_SELECTED", "Convention collective non renseignée"],
    ["AGREEMENT_NOT_SUPPORTED", "Convention collective non traitée"],
    [
      "AGREEMENT_RESULT_ZERO",
      "La convention collective ne prévoit pas d'indemnité dans ce cas",
    ],
    ["NO_EXPLANATION", "1000 €"],
    ["UNKNOWN_VALUE" as ExplanationAgreementResult, "1000 €"],
  ])("should handle %s case correctly", (value, expected) => {
    expect(
      getDecryptedValueAgreement(value as ExplanationAgreementResult, "1000")
    ).toBe(expected);
  });
});

describe("getDecryptedValue", () => {
  const label = "licenciement";

  it.each([
    [
      "HAS_NOT_SELECTED_AGREEMENT",
      "La convention collective n'ayant pas été renseignée, le montant de l'indemnité de licenciement affiché correspond au montant prévu par le code du travail.",
    ],
    [
      "AGREEMENT_NOT_SUPPORTED",
      "La convention collective n'ayant pas été traitée par nos services, le montant de l'indemnité de licenciement affiché correspond au montant prévu par le code du travail.",
    ],
    [
      "AGREEMENT_RESULT_ZERO",
      "En l'absence de montant prévu par la convention collective, le montant de l'indemnité de licenciement à appliquer pour le salarié est donc le montant prévu par le code du travail.",
    ],
    [
      "LEGAL_RESULT_ZERO_BUT_AGREEMENT",
      "En l'absence de montant prévu par le code du travail, le montant de l'indemnité de licenciement à appliquer pour le salarié est donc le montant prévu par la convention collective.",
    ],
    [
      "SAME_AMOUNT",
      "Le montant prévu par le code du travail est le même que celui prévu par la convention collective.",
    ],
    [
      "AGREEMENT_AMOUNT_MORE",
      "Le montant à retenir pour le salarié est celui prévu par la convention collective, celui-ci étant plus favorable que le montant prévu par le code du travail.",
    ],
    [
      "LEGAL_AMOUNT_MORE",
      "Le montant à retenir pour le salarié est celui prévu par le code du travail, celui-ci étant plus favorable que le montant prévu par la convention collective.",
    ],
  ])("should handle %s case correctly", (value, expected) => {
    expect(getDecryptedValue(label, value as ExplanationMainResult)).toBe(
      expected
    );
  });

  it("should throw error for NO_EXPLANATION case", () => {
    expect(() => getDecryptedValue(label, "NO_EXPLANATION")).toThrow(
      "No explanation provided"
    );
  });

  it("should throw error for unknown values", () => {
    expect(() =>
      getDecryptedValue(label, "UNKNOWN" as ExplanationMainResult)
    ).toThrow("No explanation provided");
  });
});
