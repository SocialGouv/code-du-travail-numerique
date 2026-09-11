import {
  parseMappingCsv,
  toContributionSlug,
  toSubThemeSlug,
} from "../parse-mapping-csv";

const HEADER = "contribution;sous_theme_1;sous_theme_2";
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
  it("lit une ligne par contribution", () => {
    expect(
      parseMappingCsv(
        csv(
          "les-conges-pour-evenements-familiaux;conges-payes;jours-feries-et-ponts",
          "heures-supplementaires;heures-supplementaires;duree-du-travail"
        )
      )
    ).toEqual({
      "les-conges-pour-evenements-familiaux": [
        "conges-payes",
        "jours-feries-et-ponts",
      ],
      "heures-supplementaires": ["heures-supplementaires", "duree-du-travail"],
    });
  });

  it("ignore les commentaires et les lignes vides", () => {
    expect(
      parseMappingCsv(
        csv(
          "# à trancher avec le métier",
          "",
          "   ",
          "mon-slug;demission;retraite"
        )
      )
    ).toEqual({ "mon-slug": ["demission", "retraite"] });
  });

  it("livre un mapping vide quand le fichier n'a que son en-tête", () => {
    expect(parseMappingCsv(csv())).toEqual({});
  });

  it("digère un export Excel : BOM, CRLF et cellules entre guillemets", () => {
    expect(
      parseMappingCsv(`﻿${HEADER}\r\n"mon-slug";"demission";"retraite"\r\n`)
    ).toEqual({ "mon-slug": ["demission", "retraite"] });
  });

  it("refuse un en-tête inattendu", () => {
    expect(() =>
      parseMappingCsv("url,ss1,ss2\nmon-slug,demission,retraite")
    ).toThrow(/en-tête attendu/);
  });

  it("refuse un fichier sans en-tête", () => {
    expect(() => parseMappingCsv("# rien d'autre\n")).toThrow(/introuvable/);
  });

  it("refuse une ligne qui n'a pas trois colonnes", () => {
    expect(() => parseMappingCsv(csv("mon-slug;demission"))).toThrow(
      /2 colonne\(s\)/
    );
  });

  it("refuse deux fois le même sous-thème : deux cartes identiques", () => {
    expect(() => parseMappingCsv(csv("mon-slug;demission;demission"))).toThrow(
      /identiques/
    );
  });

  it("refuse une contribution mappée deux fois", () => {
    expect(() =>
      parseMappingCsv(
        csv("mon-slug;demission;retraite", "mon-slug;conges-payes;salaire")
      )
    ).toThrow(/déjà mappée/);
  });

  it("refuse un slug qui n'est pas en kebab-case", () => {
    expect(() => parseMappingCsv(csv("mon-slug;Démission;retraite"))).toThrow(
      /sous-thème illisible/
    );
  });

  it("liste toutes les lignes fautives d'un coup", () => {
    let message = "";
    try {
      parseMappingCsv(
        csv("mon-slug;demission;demission", "autre-slug;Retraite;conges-payes")
      );
    } catch (error) {
      message = (error as Error).message;
    }

    expect(message).toMatch(/ligne 2/);
    expect(message).toMatch(/ligne 3/);
  });
});
