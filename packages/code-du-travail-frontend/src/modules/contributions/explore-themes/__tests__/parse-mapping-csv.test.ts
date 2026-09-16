import {
  parseMappingCsv,
  toContributionSlug,
  toSubThemeSlug,
} from "../parse-mapping-csv";

const HEADER = "contribution;theme;sous_theme_1;sous_theme_2";
const csv = (...lines: string[]) => [HEADER, ...lines].join("\n");

describe("toContributionSlug", () => {
  it.each([
    ["mon-slug", "mon-slug"],
    ["/contribution/mon-slug", "mon-slug"],
    ["contribution/mon-slug", "mon-slug"],
    ["https://code.travail.gouv.fr/contribution/mon-slug", "mon-slug"],
    // Page déclinée par convention collective : la clé reste celle de la fiche
    // générique, partagée par toutes les déclinaisons.
    [
      "https://code.travail.gouv.fr/contribution/mon-slug/1486-bureaux-detudes",
      "mon-slug",
    ],
    // Slug du document Elasticsearch, préfixé de l'IDCC.
    ["1486-mon-slug", "mon-slug"],
    // Paramètres de campagne collés avec le lien.
    [
      "https://code.travail.gouv.fr/contribution/mon-slug?utm_source=x",
      "mon-slug",
    ],
  ])("tire le slug générique de « %s »", (value, expected) => {
    expect(toContributionSlug(value)).toBe(expected);
  });
});

describe("toSubThemeSlug", () => {
  it.each([
    ["conges-payes", "conges-payes"],
    // Le lien d'un sous-thème porte son slug en ancre.
    ["/themes/conges#conges-payes", "conges-payes"],
    ["https://code.travail.gouv.fr/themes/conges#conges-payes", "conges-payes"],
  ])("tire le slug du sous-thème de « %s »", (value, expected) => {
    expect(toSubThemeSlug(value)).toBe(expected);
  });
});

describe("parseMappingCsv", () => {
  it("lit une ligne par contribution : thème puis sous-thèmes", () => {
    expect(
      parseMappingCsv(
        csv(
          "les-conges-pour-evenements-familiaux;conges-lies-a-la-vie-familiale;conges-payes;jours-feries-et-ponts",
          "heures-supplementaires;heures-supplementaires;duree-du-travail;repos"
        )
      )
    ).toEqual({
      "les-conges-pour-evenements-familiaux": {
        theme: "conges-lies-a-la-vie-familiale",
        subThemes: ["conges-payes", "jours-feries-et-ponts"],
      },
      "heures-supplementaires": {
        theme: "heures-supplementaires",
        subThemes: ["duree-du-travail", "repos"],
      },
    });
  });

  it.each([
    ["le second sous-thème vide", "mon-slug;demission;retraite;"],
    // Excel omet le dernier « ; » quand la dernière cellule est vide.
    ["le second sous-thème absent", "mon-slug;demission;retraite"],
  ])("accepte %s", (_label, line) => {
    expect(parseMappingCsv(csv(line))).toEqual({
      "mon-slug": { theme: "demission", subThemes: ["retraite"] },
    });
  });

  it("accepte le premier sous-thème vide : le second garde sa place", () => {
    expect(parseMappingCsv(csv("mon-slug;demission;;retraite"))).toEqual({
      "mon-slug": { theme: "demission", subThemes: ["retraite"] },
    });
  });

  it("ignore les commentaires et les lignes vides", () => {
    expect(
      parseMappingCsv(
        csv(
          "# à trancher avec le métier",
          "",
          "   ",
          "mon-slug;preavis;demission;retraite"
        )
      )
    ).toEqual({
      "mon-slug": { theme: "preavis", subThemes: ["demission", "retraite"] },
    });
  });

  it("livre un mapping vide quand le fichier n'a que son en-tête", () => {
    expect(parseMappingCsv(csv())).toEqual({});
  });

  it("digère un export Excel : BOM, CRLF et cellules entre guillemets", () => {
    expect(
      parseMappingCsv(
        `﻿${HEADER}\r\n"mon-slug";"preavis";"demission";"retraite"\r\n`
      )
    ).toEqual({
      "mon-slug": { theme: "preavis", subThemes: ["demission", "retraite"] },
    });
  });

  it("refuse un en-tête inattendu", () => {
    expect(() =>
      parseMappingCsv("url;ss1;ss2\nmon-slug;preavis;demission;retraite")
    ).toThrow(/en-tête attendu/);
  });

  it("refuse un fichier sans en-tête", () => {
    expect(() => parseMappingCsv("# rien d'autre\n")).toThrow(/introuvable/);
  });

  it("refuse une ligne qui n'a pas assez de colonnes", () => {
    expect(() => parseMappingCsv(csv("mon-slug;demission"))).toThrow(
      /2 colonne\(s\)/
    );
  });

  it("refuse une ligne qui a trop de colonnes", () => {
    expect(() =>
      parseMappingCsv(csv("mon-slug;preavis;demission;retraite;salaire"))
    ).toThrow(/5 colonne\(s\)/);
  });

  it("refuse un thème vide", () => {
    expect(() => parseMappingCsv(csv("mon-slug;;demission;retraite"))).toThrow(
      /thème illisible/
    );
  });

  it("refuse une ligne sans aucun sous-thème", () => {
    expect(() => parseMappingCsv(csv("mon-slug;demission;;"))).toThrow(
      /aucun sous-thème/
    );
  });

  it("refuse deux fois le même sous-thème : deux cartes identiques", () => {
    expect(() =>
      parseMappingCsv(csv("mon-slug;preavis;demission;demission"))
    ).toThrow(/« demission » apparaît deux fois/);
  });

  it("refuse un sous-thème identique au thème de repli", () => {
    expect(() =>
      parseMappingCsv(csv("mon-slug;demission;demission;retraite"))
    ).toThrow(/« demission » apparaît deux fois/);
  });

  it("refuse une contribution mappée deux fois", () => {
    expect(() =>
      parseMappingCsv(
        csv(
          "mon-slug;preavis;demission;retraite",
          "mon-slug;preavis;conges-payes;salaire"
        )
      )
    ).toThrow(/déjà mappée/);
  });

  it("refuse un slug qui n'est pas en kebab-case", () => {
    expect(() =>
      parseMappingCsv(csv("mon-slug;preavis;Démission;retraite"))
    ).toThrow(/sous-thème illisible/);
  });

  it("liste toutes les lignes fautives d'un coup", () => {
    let message = "";
    try {
      parseMappingCsv(
        csv(
          "mon-slug;preavis;demission;demission",
          "autre-slug;preavis;Retraite;conges-payes"
        )
      );
    } catch (error) {
      message = (error as Error).message;
    }

    expect(message).toMatch(/ligne 2/);
    expect(message).toMatch(/ligne 3/);
  });
});
