import { nafMapper } from "../naf";

describe("nafMapper", () => {
  it("should contain valid NAF codes", () => {
    expect(nafMapper["01.11Z"]).toContain("Culture de céréales");
    expect(nafMapper["10.71C"]).toBe("Boulangerie et boulangerie-pâtisserie");
    expect(nafMapper["62.01Z"]).toBe("Programmation informatique");
  });

  it("should have codes in correct format", () => {
    const codes = Object.keys(nafMapper);
    codes.forEach((code) => {
      expect(code).toMatch(/^\d{2}\.\d{2}[A-Z]$/);
    });
  });

  it("should have all values as non-empty strings", () => {
    Object.values(nafMapper).forEach((description) => {
      expect(typeof description).toBe("string");
      expect(description.length).toBeGreaterThan(0);
    });
  });

  it("should contain expected number of NAF codes", () => {
    const codesCount = Object.keys(nafMapper).length;
    // NAF rév. 2 contains 732 codes
    expect(codesCount).toBeGreaterThan(700);
  });

  it("should include first and last NAF codes", () => {
    // First code in agriculture section
    expect(nafMapper["01.11Z"]).toBeDefined();
    // Last code for extraterritorial organizations
    expect(nafMapper["99.00Z"]).toBe(
      "Activités des organisations et organismes extraterritoriaux"
    );
  });

  it("should include service codes", () => {
    expect(nafMapper["47.11F"]).toBe("Hypermarchés");
    expect(nafMapper["56.10A"]).toBe("Restauration traditionnelle");
    expect(nafMapper["85.10Z"]).toBe("Enseignement pré-primaire");
  });

  it("should include manufacturing codes", () => {
    expect(nafMapper["10.13B"]).toBe("Charcuterie");
    expect(nafMapper["29.10Z"]).toBe("Construction de véhicules automobiles");
    expect(nafMapper["32.50A"]).toBe(
      "Fabrication de matériel médico-chirurgical et dentaire"
    );
  });

  it("should include construction codes", () => {
    expect(nafMapper["41.20A"]).toBe("Construction de maisons individuelles");
    expect(nafMapper["43.21A"]).toContain("installation électrique");
  });
});
