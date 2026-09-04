import {
  formatAmount,
  formatPercentage,
  fromMonthlyAmount,
  parseFrenchAmount,
  roundToCents,
  toMonthlyAmount,
} from "../amount";

describe("parseFrenchAmount", () => {
  it.each([
    ["2875", 2875],
    ["2875,50", 2875.5],
    ["2875.50", 2875.5],
    ["2 875,50", 2875.5],
    ["2 875,50", 2875.5],
    ["2 875,50", 2875.5],
    ["2875,5 €", 2875.5],
    ["  2 875  ", 2875],
    ["0", 0],
  ])("lit « %s » comme %p", (raw, expected) => {
    expect(parseFrenchAmount(raw)).toBe(expected);
  });

  it.each([
    ["", "vide"],
    ["abc", "non numérique"],
    ["-5", "négatif"],
    ["1,234", "trois décimales"],
    ["1e3", "notation scientifique"],
    ["2 875,50,10", "deux séparateurs décimaux"],
    [",", "séparateur seul"],
    ["€", "symbole seul"],
  ])("rejette « %s » (%s)", (raw) => {
    expect(parseFrenchAmount(raw)).toBeNull();
  });

  it("accepte de relire ce que formatAmount produit", () => {
    // Le formateur fr-FR peut utiliser U+202F ou U+00A0 selon le runtime :
    // la saisie doit rester relisable dans les deux cas.
    expect(parseFrenchAmount(formatAmount(3800.8))).toBe(3800.8);
  });
});

describe("formatAmount", () => {
  it("formate en fr-FR avec deux décimales et sans symbole €", () => {
    // Le symbole est porté par le suffixe visuel du champ, pas par la valeur :
    // celle-ci doit rester ré-éditable telle quelle.
    const formatted = formatAmount(3800.8);
    expect(formatted).not.toContain("€");
    expect(formatted.replace(/[\s  ]/g, "")).toBe("3800,80");
  });

  it.each([
    [null, ""],
    [undefined, ""],
    [Number.NaN, ""],
    [Number.POSITIVE_INFINITY, ""],
  ])("renvoie une chaîne vide pour %p", (input, expected) => {
    expect(formatAmount(input)).toBe(expected);
  });
});

describe("formatPercentage", () => {
  it("affiche le taux sans décimale superflue", () => {
    expect(formatPercentage(5.3)).toBe("5,3 %");
    expect(formatPercentage(0)).toBe("0 %");
  });

  it("renvoie une chaîne vide sans valeur", () => {
    expect(formatPercentage(null)).toBe("");
  });
});

describe("roundToCents", () => {
  it("arrondit la pleine précision de l'API à deux décimales", () => {
    expect(roundToCents(2253.9028125)).toBe(2253.9);
    expect(roundToCents(2128.9861458333335)).toBe(2128.99);
    expect(roundToCents(3800.7975)).toBe(3800.8);
  });
});

describe("conversions de période", () => {
  it("ramène une saisie annuelle au mensuel canonique", () => {
    expect(toMonthlyAmount(34500, "annee")).toBe(2875);
    expect(toMonthlyAmount(2875, "mois")).toBe(2875);
  });

  it("est idempotent en aller-retour", () => {
    expect(fromMonthlyAmount(toMonthlyAmount(34500, "annee"), "annee")).toBe(
      34500
    );
    expect(fromMonthlyAmount(toMonthlyAmount(2875, "mois"), "mois")).toBe(2875);
  });
});
