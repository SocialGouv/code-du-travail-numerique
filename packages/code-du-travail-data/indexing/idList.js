import { logger } from "./logger";
import { SOURCES } from "@cdt/sources";
import { selectAll } from "unist-util-select";
import slugify from "../slugify";
// import { getEditorialContents } from "../dataset/editorial_content";
import { getFichesSP } from "../dataset/fiches_service_public";
import themes from "@socialgouv/datafiller-data/data/themes.json";
// import { getCourriers } from "../dataset/courrier-type";
// import { thematicFiles } from "../dataset/dossiers";
import { getAgreementPages } from "./agreement_pages";
import { splitArticle } from "./fichesTravailSplitter";

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
    source: SOURCES.CDT,
    id,
  }));

  logger.info("=== Fiches SP ===");
  yield getFichesSP().map(({ source, id }) => ({ source, id }));

  logger.info("=== Themes ===");
  yield themes.map(({ position }) => {
    return {
      source: SOURCES.THEMES,
      id: position,
    };
  });

  logger.info("=== Contributions ===");
  yield require("@socialgouv/contributions-data/data/contributions.json").map(
    ({ id }) => {
      return {
        source: SOURCES.CONTRIBUTIONS,
        id,
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
  yield splittedFiches.map(
    ({ anchor, slug, text, title }) => {
      return {
        source: SOURCES.SHEET_MT,
        anchor,
        slug,
        text,
        title,
        excludeFromSearch: false,
      };
    }
  );

  logger.info("=== page fiches travail ===");
  yield fichesMT.map(({ sections, ...content }) => {
    return {
      ...content,
      source: SOURCES.SHEET_MT_PAGE,
      breadcrumbs: getBreadcrumbs(
        `/${getRouteBySource(SOURCES.SHEET_MT)}/${content.slug}`
      ),
      // eslint-disable-next-line no-unused-vars
      sections: sections.map(({ description, text, ...section }) => ({
        ...section,
        html: addGlossary(section.html),
      })),
    };
  });

  // TODO
  /*
  logger.info("=== Editorial contents ===");
  yield getEditorialContents();

  logger.info("=== Dossiers ===");
  yield thematicFiles.map(
    ({ categories, description, metaDescription, refs, slug, title }) => {
      return {
        categories,
        description,
        excludeFromSearch: false,
        metaDescription,
        refs,
        slug,
        source: SOURCES.THEMATIC_FILES,
        text: `${title}\n${description}`,
        title,
      };
    }
  );

  logger.info("=== Outils externes ===");
  yield require("../dataset/tools/externals.json").map(
    ({ action, description, icon, title, url }) => ({
      action,
      description,
      icon,
      slug: slugify(title),
      source: SOURCES.EXTERNALS,
      text: description,
      url,
      title,
      excludeFromSearch: false,
    })
  );
  logger.info("=== Courriers ===");
  yield getCourriers();

  logger.info("=== Outils ===");
  yield require("../dataset/tools")
    .filter((tool) => tool.slug !== "simulateur-embauche")
    .map(
      ({
        action,
        breadcrumbs,
        date,
        description,
        icon,
        questions,
        slug,
        title,
      }) => ({
        action,
        breadcrumbs,
        date,
        description,
        icon,
        slug,
        source: SOURCES.TOOLS,
        text: questions.join("\n"),
        title,
        excludeFromSearch: false,
      })
    );
    */
}

export { cdtnIdsGen };
