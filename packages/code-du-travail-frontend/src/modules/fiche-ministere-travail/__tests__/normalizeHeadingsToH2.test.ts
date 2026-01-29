import { normalizeHeadingsToH2 } from "../utils";

describe("normalizeHeadingsToH2", () => {
  it("should transform h3 to h2", () => {
    const input = "<h3>Titre</h3>";
    const expected = "<h2>Titre</h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should transform h4 to h2", () => {
    const input = "<h4>Titre</h4>";
    const expected = "<h2>Titre</h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should transform h5 to h2", () => {
    const input = "<h5>Titre</h5>";
    const expected = "<h2>Titre</h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should transform h6 to h2", () => {
    const input = "<h6>Titre</h6>";
    const expected = "<h2>Titre</h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should keep h2 unchanged", () => {
    const input = "<h2>Titre</h2>";
    const expected = "<h2>Titre</h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should preserve attributes on headings", () => {
    const input = '<h3 id="test-id" class="test-class">Titre</h3>';
    const expected = '<h2 id="test-id" class="test-class">Titre</h2>';
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should handle headings without attributes", () => {
    const input = "<h3>Titre sans attributs</h3>";
    const expected = "<h2>Titre sans attributs</h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should transform multiple headings", () => {
    const input =
      "<h3>Premier</h3><p>Contenu</p><h4>Deuxième</h4><p>Plus</p><h5>Troisième</h5>";
    const expected =
      "<h2>Premier</h2><p>Contenu</p><h2>Deuxième</h2><p>Plus</p><h2>Troisième</h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should handle mixed h2 and h3+", () => {
    const input =
      "<h2>Déjà h2</h2><p>Contenu</p><h3>À transformer</h3><p>Plus</p>";
    const expected =
      "<h2>Déjà h2</h2><p>Contenu</p><h2>À transformer</h2><p>Plus</p>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should handle headings with complex attributes", () => {
    const input =
      '<h4 id="section-1" class="fr-h4 fr-mb-2w" data-test="value">Titre complexe</h4>';
    const expected =
      '<h2 id="section-1" class="fr-h4 fr-mb-2w" data-test="value">Titre complexe</h2>';
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should handle empty headings", () => {
    const input = "<h3></h3>";
    const expected = "<h2></h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should not transform h1", () => {
    const input = "<h1>Titre h1</h1><h3>Titre h3</h3>";
    const expected = "<h1>Titre h1</h1><h2>Titre h3</h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should handle self-closing-like headings with content", () => {
    const input = "<h3>Contenu avec <strong>du gras</strong></h3>";
    const expected = "<h2>Contenu avec <strong>du gras</strong></h2>";
    expect(normalizeHeadingsToH2(input)).toBe(expected);
  });

  it("should return empty string when input is empty", () => {
    expect(normalizeHeadingsToH2("")).toBe("");
  });

  it("should return unchanged content when no headings", () => {
    const input = "<p>Juste du contenu</p><div>Plus de contenu</div>";
    expect(normalizeHeadingsToH2(input)).toBe(input);
  });
});
