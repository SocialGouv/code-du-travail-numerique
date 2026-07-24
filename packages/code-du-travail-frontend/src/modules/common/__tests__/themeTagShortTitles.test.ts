import { getThemeTagShortTitle } from "../themeTagShortTitles";

describe("getThemeTagShortTitle", () => {
  it("renvoie le titre raccourci quand le libellé correspond exactement", () => {
    expect(
      getThemeTagShortTitle("Épargne salariale, participation et intéressement")
    ).toBe("Épargne salariale");
  });

  it("tolère l'apostrophe typographique du libellé Elasticsearch", () => {
    // U+2019 (’) au lieu de l'apostrophe droite (') dans les clés.
    expect(
      getThemeTagShortTitle(
        "Temps d’équivalence, astreintes et temps d’habillage"
      )
    ).toBe("Temps d'équivalence, astreinte et habillage");
  });

  it("tolère les points de suspension typographiques (…)", () => {
    expect(
      getThemeTagShortTitle(
        "Congés liés à la vie familiale (mariage, décès, naissance…)"
      )
    ).toBe("Congés liés à la vie familiale");
  });

  it("tolère les écarts d'accents (ex: interessement vs intéressement)", () => {
    expect(
      getThemeTagShortTitle("Épargne salariale, participation et interessement")
    ).toBe("Épargne salariale");
  });

  it("tolère les espaces insécables et la casse", () => {
    expect(
      getThemeTagShortTitle(
        "Représentation du personnel et négociation collective"
      )
    ).toBe("Représentation du personnel");
  });

  it("renvoie le libellé complet quand il n'y a pas de correspondance", () => {
    expect(getThemeTagShortTitle("Sécurité au travail")).toBe(
      "Sécurité au travail"
    );
  });
});
