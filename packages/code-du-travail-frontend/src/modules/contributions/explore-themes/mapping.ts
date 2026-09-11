import * as fs from "fs";
import * as path from "path";
import { ExploreThemesMapping, parseMappingCsv } from "./parse-mapping-csv";

// Mapping éditorial de la rubrique « Explorez nos thématiques » (#7455).
//
// La liste est tenue par le métier dans un CSV, en attendant une gestion en
// back-office. Toute contribution absente du fichier masque la rubrique et
// conserve alors ses « Articles liés », ce qui en fait le témoin du test.
//
// Le fichier vit sous `public/` parce que c'est le seul répertoire dont
// l'image de production garantit la présence (cf. Dockerfile) : `src/` n'y est
// copié que par effet de bord de `pnpm deploy`. Il est lu au démarrage du
// serveur, jamais à chaque rendu.
const MAPPING_FILE = path.join(
  process.cwd(),
  "public",
  "static",
  "assets",
  "explore-themes-mapping.csv"
);

const readMapping = (): ExploreThemesMapping => {
  try {
    return parseMappingCsv(fs.readFileSync(MAPPING_FILE, "utf8"));
  } catch (error) {
    // Une coquille dans un fichier éditorial ne doit pas empêcher le site de
    // démarrer : la rubrique disparaît, les contributions gardent leurs
    // « Articles liés », et l'erreur part dans les logs du serveur.
    console.error(
      `[explore-themes] ${MAPPING_FILE} ignoré : ${(error as Error).message}`
    );
    return {};
  }
};

export const CONTRIBUTION_SUB_THEMES: ExploreThemesMapping = readMapping();

export const getContributionSubThemeSlugs = (
  genericSlug: string
): readonly [string, string] | undefined =>
  // `hasOwnProperty` : le slug vient de l'URL, un `toString` ou un
  // `constructor` renverrait sinon une fonction héritée d'`Object.prototype`.
  Object.prototype.hasOwnProperty.call(CONTRIBUTION_SUB_THEMES, genericSlug)
    ? CONTRIBUTION_SUB_THEMES[genericSlug]
    : undefined;
