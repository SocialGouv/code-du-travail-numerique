import { cleanHash } from "../hash";

describe("cleanHash", () => {
  it("should return empty string for empty input", () => {
    expect(cleanHash("")).toBe("");
  });

  it("should remove leading # character", () => {
    expect(cleanHash("#section-1")).toBe("section-1");
  });

  it("should handle hash without # character", () => {
    expect(cleanHash("section-1")).toBe("section-1");
  });

  it("should decode URI encoded characters", () => {
    expect(cleanHash("#contenus%20populaires")).toBe("contenus-populaires");
    expect(cleanHash("contenus%20populaires")).toBe("contenus-populaires");
  });

  it("should convert to lowercase", () => {
    expect(cleanHash("#Section-Name")).toBe("section-name");
    expect(cleanHash("SECTION-NAME")).toBe("section-name");
    expect(cleanHash("#MixedCase")).toBe("mixedcase");
  });

  it("should replace spaces with hyphens", () => {
    expect(cleanHash("#section name")).toBe("section-name");
    expect(cleanHash("section name")).toBe("section-name");
    expect(cleanHash("#multiple  spaces  here")).toBe("multiple-spaces-here");
  });

  it("should trim whitespace", () => {
    expect(cleanHash("#  section-name  ")).toBe("section-name");
    expect(cleanHash("  section-name  ")).toBe("section-name");
  });

  it("should handle complex combinations", () => {
    expect(cleanHash("#Contenus%20Populaires")).toBe("contenus-populaires");
    expect(cleanHash("  Section Name  ")).toBe("section-name");
    expect(cleanHash("#UPPER%20CASE%20SECTION")).toBe("upper-case-section");
  });

  it("should handle multiple consecutive spaces", () => {
    expect(cleanHash("#section    with    spaces")).toBe("section-with-spaces");
  });

  it("should handle special encoded characters and remove accents", () => {
    expect(cleanHash("#section%C3%A9")).toBe("sectione");
  });

  it("should handle malformed URI encoding gracefully", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    const result = cleanHash("#invalid%encoding");
    expect(result).toBe("invalid%encoding");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Failed to decode hash:",
      "#invalid%encoding"
    );

    consoleWarnSpy.mockRestore();
  });

  it("should handle real-world examples", () => {
    expect(cleanHash("#contenus-populaires")).toBe("contenus-populaires");
    expect(cleanHash("#Embauche%20et%20contrat%20de%20travail")).toBe(
      "embauche-et-contrat-de-travail"
    );
    expect(cleanHash("#Temps%20de%20travail")).toBe("temps-de-travail");
  });

  it("should handle hyphens already present", () => {
    expect(cleanHash("#section-already-with-hyphens")).toBe(
      "section-already-with-hyphens"
    );
  });

  it("should handle mixed hyphen and space combinations", () => {
    expect(cleanHash("#section-with spaces")).toBe("section-with-spaces");
  });

  it("should remove commas, special characters and accents", () => {
    expect(cleanHash("#santé,-sécurité-et-conditions-de-travail")).toBe(
      "sante-securite-et-conditions-de-travail"
    );
    expect(cleanHash("santé,-sécurité-et-conditions-de-travail")).toBe(
      "sante-securite-et-conditions-de-travail"
    );
    expect(cleanHash("#section,with,commas")).toBe("section-with-commas");
  });

  it("should remove accents from various characters", () => {
    expect(cleanHash("#café")).toBe("cafe");
    expect(cleanHash("#résumé")).toBe("resume");
    expect(cleanHash("#élève")).toBe("eleve");
    expect(cleanHash("#naïve")).toBe("naive");
    expect(cleanHash("#Santé et Sécurité")).toBe("sante-et-securite");
  });
});
