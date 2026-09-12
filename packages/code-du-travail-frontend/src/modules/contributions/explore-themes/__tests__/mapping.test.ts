import * as fs from "fs";
import * as path from "path";
import {
  CONTRIBUTION_SUB_THEMES,
  getContributionSubThemeSlugs,
} from "../mapping";
import { parseMappingCsv } from "../parse-mapping-csv";

const MAPPING_FILE = path.join(
  process.cwd(),
  "public",
  "static",
  "assets",
  "explore-themes-mapping.csv"
);

// Garde-fou sur un fichier tenu à la main par le métier : une coquille y est
// rattrapée en CI plutôt qu'avalée au démarrage du serveur, où elle ne laisse
// qu'une ligne de log et une rubrique muette.
describe("le CSV livré", () => {
  it("est lisible par le parseur", () => {
    expect(() =>
      parseMappingCsv(fs.readFileSync(MAPPING_FILE, "utf8"))
    ).not.toThrow();
  });

  it("est bien ce que le module expose", () => {
    expect(CONTRIBUTION_SUB_THEMES).toEqual(
      parseMappingCsv(fs.readFileSync(MAPPING_FILE, "utf8"))
    );
  });
});

describe("getContributionSubThemeSlugs", () => {
  it("ne renvoie rien pour une contribution absente du mapping", () => {
    expect(
      getContributionSubThemeSlugs("une-contribution-jamais-mappee")
    ).toBeUndefined();
  });

  it("ne remonte pas les propriétés héritées d'Object", () => {
    // Sans garde, `CONTRIBUTION_SUB_THEMES["toString"]` renverrait une fonction
    // là où l'appelant attend un couple de slugs.
    expect(getContributionSubThemeSlugs("toString")).toBeUndefined();
  });
});
