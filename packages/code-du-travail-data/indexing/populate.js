import slugify from "@socialgouv/cdtn-slugify";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import themes from "@socialgouv/datafiller-data/data/themes.json";

import { markdownTransform } from "../dataset/editorial_content";
import { addGlossary } from "./addGlossary";
import { createThemer, toBreadcrumbs, toSlug } from "./breadcrumbs";
import { getDocumentBySource } from "./fetchCdtnAdminDocuments";
import { splitArticle } from "./fichesTravailSplitter";
import { logger } from "./logger";
import { getVersions } from "./versions";

const getBreadcrumbs = createThemer(themes);

/**
 * Find duplicate slugs
 * @param {iterable} allDocuments is an iterable generator
 */
async function getDuplicateSlugs(allDocuments) {
  let slugs = [];
  for await (const documents of allDocuments) {
    slugs = slugs.concat(
      documents.map(({ source, slug }) => `${source}/${slug}`)
    );
  }

  return slugs
    .map((slug) => ({ count: slugs.filter((s) => slug === s).length, slug }))
    .filter(({ count }) => count > 1)
    .reduce((state, { slug, count }) => ({ ...state, [slug]: count }), {});
}

async function* cdtnDocumentsGen() {
  logger.info("=== Editorial contents ===");
  const documents = await getDocumentBySource(SOURCES.EDITORIAL_CONTENT);
  yield markdownTransform(documents);

  logger.info("=== Courriers ===");
  yield await getDocumentBySource(SOURCES.LETTERS);

  logger.info("=== Outils ===");
  yield await getDocumentBySource(SOURCES.TOOLS);

  logger.info("=== Outils externes ===");
  yield getDocumentBySource(SOURCES.EXTERNALS);

  logger.info("=== Dossiers ===");
  yield await getDocumentBySource(SOURCES.THEMATIC_FILES);

  logger.info("=== Code du travail ===");
  yield await getDocumentBySource(SOURCES.CDT);

  logger.info("=== Contributions ===");
  const contributions = await getDocumentBySource(SOURCES.CONTRIBUTIONS);
  yield contributions.map(({ answers, ...contribution }) => ({
    ...contribution,
    answers: {
      ...answers,
      generic: {
        ...answers.generic,
        markdown: addGlossary(answers.generic.markdown),
      },
    },
  }));

  logger.info("=== Conventions Collectives ===");
  const ccnData = await getDocumentBySource(SOURCES.CCN);
  yield ccnData.map(({ ...content }) => {
    return {
      ...content,
      answers: content.answers.map((data) => {
        const contrib = contributions.find(({ index }) => data.index === index);
        if (!contrib) {
          throw "unknonw contribution";
        }
        const [theme] = contrib.breadcrumbs;
        return {
          ...data,
          answer: addGlossary(data.answer),
          theme: theme.label,
        };
      }),
      source: SOURCES.CCN,
    };
  });

  logger.info("=== Fiches SP ===");
  yield await getDocumentBySource(SOURCES.SHEET_SP);

  logger.info("=== page fiches travail ===");
  const fichesMT = await getDocumentBySource(SOURCES.SHEET_MT_PAGE);
  yield fichesMT.map(({ sections, ...infos }) => ({
    ...infos,
    // fix breadcrumbs
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.SHEET_MT)}/${infos.slug}`
    ),
    sections: sections.map(({ html, ...section }) => {
      delete section.description;
      delete section.text;
      return {
        ...section,
        html: addGlossary(html),
      };
    }),
  }));

  logger.info("=== Fiche MT(split) ===");
  const splittedFiches = fichesMT.flatMap(splitArticle);
  yield splittedFiches.map((fiche) => ({
    ...fiche,
    // fix breadcrumbs generation
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.SHEET_MT)}/${fiche.slug.replace(/#.*$/, "")}`
    ),
    source: SOURCES.SHEET_MT,
  }));

  logger.info("=== Themes ===");
  yield themes.map(
    ({
      id,
      breadcrumbs,
      children,
      icon,
      introduction,
      position,
      refs,
      title,
    }) => {
      return {
        breadcrumbs: breadcrumbs.map(toBreadcrumbs),
        children: children.map(toBreadcrumbs),
        description: introduction,
        excludeFromSearch: false,
        icon,
        id,
        position,
        refs,
        slug: toSlug(title, position),
        source: SOURCES.THEMES,
        title,
      };
    }
  );

  logger.info("=== Hightlights ===");
  yield [
    {
      data: require("@socialgouv/datafiller-data/data/hightlights.json"),
      source: SOURCES.HIGHLIGHTS,
    },
  ];

  logger.info("=== glossary ===");
  yield [
    {
      data: require("@socialgouv/datafiller-data/data/glossary.json").map(
        (item) => {
          return {
            ...item,
            slug: slugify(item.title),
          };
        }
      ),
      source: SOURCES.GLOSSARY,
    },
  ];

  logger.info("=== PreQualified Request ===");
  yield [
    {
      data: require("@socialgouv/datafiller-data/data/requests.json"),
      source: SOURCES.PREQUALIFIED,
    },
  ];

  logger.info("=== data version ===");
  yield [
    {
      data: getVersions(),
      source: SOURCES.VERSIONS,
    },
  ];
}

export { getDuplicateSlugs, cdtnDocumentsGen };
