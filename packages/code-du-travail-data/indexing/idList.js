import slugify from "@socialgouv/cdtn-slugify";
import { SOURCES } from "@socialgouv/cdtn-sources";
import themes from "@socialgouv/datafiller-data/data/themes.json";
import { selectAll } from "unist-util-select";

import { getCourriers } from "../dataset/courrier-type";
import { thematicFiles } from "../dataset/dossiers";
import { getEditorialContents } from "../dataset/editorial_content";
import { getFichesSP } from "../dataset/fiches_service_public";
import { getAgreementPages } from "./agreement_pages";
import { splitArticle } from "./fichesTravailSplitter";
import { logger } from "./logger";

async function* cdtnIdsGen() {
  logger.info("=== Conventions Collectives ===");
  yield require("@socialgouv/kali-data/data/index.json").map(({ id }) => ({
    id,
    source: SOURCES.CCN,
  }));

  logger.info("=== Code du travail ===");
  yield selectAll(
    "article",
    require("@socialgouv/legi-data/data/LEGITEXT000006072050.json")
  ).map(({ data: { id } }) => ({
    id,
    source: SOURCES.CDT,
  }));

  logger.info("=== Fiches SP ===");
  yield getFichesSP().map(({ source, id }) => ({ id, source }));

  logger.info("=== Themes ===");
  yield themes.map(({ position }) => {
    return {
      id: position,
      source: SOURCES.THEMES,
    };
  });

  logger.info("=== Contributions ===");
  yield require("@socialgouv/contributions-data/data/contributions.json").map(
    ({ id }) => {
      return {
        id,
        source: SOURCES.CONTRIBUTIONS,
      };
    }
  );

  logger.info("=== page ccn ===");
  const ccnData = getAgreementPages();
  yield ccnData.map(({ id }) => {
    return {
      id,
      source: SOURCES.CCN_PAGE,
    };
  });

  logger.info("=== Fiche MT(split) ===");
  const fichesMT = require("@socialgouv/fiches-travail-data/data/fiches-travail.json");
  fichesMT.forEach((article) => (article.slug = slugify(article.title)));
  const splittedFiches = fichesMT.flatMap(splitArticle);
  yield splittedFiches.map(({ pubId, anchor }) => {
    return {
      id: pubId + (anchor ? `#${anchor}` : ""),
      source: SOURCES.SHEET_MT,
    };
  });

  logger.info("=== page fiches travail ===");
  yield fichesMT.map(({ pubId }) => ({
    id: pubId,
    source: SOURCES.SHEET_MT_PAGE,
  }));

  logger.info("=== Dossiers ===");
  yield thematicFiles.map(({ id }) => {
    return {
      id,
      source: SOURCES.THEMATIC_FILES,
    };
  });

  logger.info("=== Editorial contents ===");
  yield getEditorialContents().map(({ id, source }) => ({ id, source }));

  logger.info("=== Outils externes ===");
  yield require("../dataset/tools/externals.json").map(({ id }) => ({
    id,
    source: SOURCES.EXTERNALS,
  }));

  logger.info("=== Courriers ===");
  yield (await getCourriers()).map(({ id, source }) => ({ id, source }));

  logger.info("=== Outils ===");
  yield require("../dataset/tools")
    .filter((tool) => tool.slug !== "simulateur-embauche")
    .map(({ id }) => ({
      id,
      source: SOURCES.TOOLS,
    }));
}

export { cdtnIdsGen };
