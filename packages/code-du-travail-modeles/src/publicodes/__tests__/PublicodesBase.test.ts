import { PublicodesBase } from "../PublicodesBase";
import type { PublicodesOutput } from "../types";

class TestablePublicodesBase extends PublicodesBase<string> {
  constructor() {
    super({}, "test-rule");
  }

  calculate(): PublicodesOutput<string> {
    throw new Error("Method not implemented.");
  }

  protected convertedResult(): string {
    throw new Error("Method not implemented.");
  }

  // Exposer la méthode pour les tests
  public testFormatRuleName(ruleName: string): string {
    return this.formatRuleName(ruleName);
  }
}

describe("PublicodesBase", () => {
  let testInstance: TestablePublicodesBase;

  beforeEach(() => {
    testInstance = new TestablePublicodesBase();
  });

  describe("formatRuleName", () => {
    it("should replace dots with spaces", () => {
      const result = testInstance.testFormatRuleName("contrat.salarie.type");
      expect(result).toBe("contrat-salarie-type");
    });

    it("should replace multiple spaces with single dash", () => {
      const result = testInstance.testFormatRuleName(
        "contrat   salarie    type"
      );
      expect(result).toBe("contrat-salarie-type");
    });

    it("should remove accents and diacritics", () => {
      const result = testInstance.testFormatRuleName(
        "contrat.salarié.ancienneté"
      );
      expect(result).toBe("contrat-salarie-anciennete");
    });

    it("should handle mixed dots and spaces", () => {
      const result = testInstance.testFormatRuleName("contrat. salarie .type");
      expect(result).toBe("contrat-salarie-type");
    });

    it("should handle empty string", () => {
      const result = testInstance.testFormatRuleName("");
      expect(result).toBe("");
    });

    it("should handle string with only spaces", () => {
      const result = testInstance.testFormatRuleName("   ");
      expect(result).toBe("-");
    });

    it("should handle string with only dots", () => {
      const result = testInstance.testFormatRuleName("...");
      expect(result).toBe("-");
    });

    it("should handle complex accented characters", () => {
      const result = testInstance.testFormatRuleName(
        "règle.avec.caractères.spéciaux"
      );
      expect(result).toBe("regle-avec-caracteres-speciaux");
    });

    it("should handle mixed case with accents", () => {
      const result = testInstance.testFormatRuleName(
        "Contrat.Salarié.Ancienneté"
      );
      expect(result).toBe("Contrat-Salarie-Anciennete");
    });

    it("should handle numbers and special characters", () => {
      const result = testInstance.testFormatRuleName("rule.123.test");
      expect(result).toBe("rule-123-test");
    });
  });
});
