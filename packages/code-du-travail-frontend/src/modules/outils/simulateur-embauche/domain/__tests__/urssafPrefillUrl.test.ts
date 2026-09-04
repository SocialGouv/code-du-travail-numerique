import { buildUrssafPrefillUrl } from "../urssafPrefillUrl";

const BASE = "https://mon-entreprise.urssaf.fr";

describe("buildUrssafPrefillUrl", () => {
  it("préremplit avec le dotted name en nom de paramètre", () => {
    const url = new URL(
      buildUrssafPrefillUrl({
        baseUrl: BASE,
        period: "mois",
        contract: "CDI",
        salaireBrutMensuel: 2875,
      })
    );

    expect(url.origin + url.pathname).toBe(
      "https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net"
    );
    expect(url.searchParams.get("unité")).toBe("€/mois");
    expect(url.searchParams.get("salarié . contrat")).toBe("'CDI'");
    expect(url.searchParams.get("salarié . contrat . salaire brut")).toBe(
      "2875€/mois"
    );
  });

  it("encode les dotted names et les unités dans la chaîne de requête", () => {
    const url = buildUrssafPrefillUrl({
      baseUrl: BASE,
      period: "mois",
      contract: "CDI",
      salaireBrutMensuel: 2875,
    });
    // Les espaces des dotted names et le « € » doivent être percent-encodés.
    expect(url).toContain("salari%C3%A9+.+contrat");
    expect(url).toContain("%E2%82%AC%2Fmois");
    expect(url).not.toMatch(/[ €]/);
  });

  it("passe l'unité annuelle mais garde un brut mensuel", () => {
    // Le paramètre `unité` ne pilote que l'affichage : la valeur transmise reste
    // celle que nous détenons, en €/mois.
    const url = new URL(
      buildUrssafPrefillUrl({
        baseUrl: BASE,
        period: "annee",
        contract: "CDD",
        salaireBrutMensuel: 2875,
      })
    );
    expect(url.searchParams.get("unité")).toBe("€/an");
    expect(url.searchParams.get("salarié . contrat . salaire brut")).toBe(
      "2875€/mois"
    );
  });

  it.each([[null], [undefined], [Number.NaN]])(
    "omet le salaire quand il vaut %p, sans casser le lien",
    (salaireBrutMensuel) => {
      const url = new URL(
        buildUrssafPrefillUrl({
          baseUrl: BASE,
          period: "mois",
          contract: "CDI",
          salaireBrutMensuel,
        })
      );
      expect(url.searchParams.has("salarié . contrat . salaire brut")).toBe(
        false
      );
      expect(url.searchParams.get("salarié . contrat")).toBe("'CDI'");
    }
  );

  it("se replie sur l'URL nue si la base n'est pas une URL valide", () => {
    expect(
      buildUrssafPrefillUrl({
        baseUrl: "pas-une-url",
        period: "mois",
        contract: "CDI",
        salaireBrutMensuel: 2875,
      })
    ).toBe("pas-une-url/simulateurs/salaire-brut-net");
  });
});
