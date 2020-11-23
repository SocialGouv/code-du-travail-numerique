// eslint-disable-next-line simple-import-sort/sort
import slugify from "@socialgouv/cdtn-slugify";
import themes from "@socialgouv/datafiller-data/data/themes.json";

import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";

import { addGlossary } from "./addGlossary";
import { createThemer, toBreadcrumbs, toSlug } from "./breadcrumbs";
import {
  getDocumentBySource,
  getAllKaliBlocks,
} from "./fetchCdtnAdminDocuments";
import { splitArticle } from "./fichesTravailSplitter";
import { logger } from "./logger";
import { markdownTransform } from "./markdown";
import { getVersions } from "./versions";
import { getArticlesByTheme } from "./kali";

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
  yield {
    documents: markdownTransform(documents),
    source: SOURCES.EDITORIAL_CONTENT,
  };

  logger.info("=== Courriers ===");
  yield {
    documents: await getDocumentBySource(SOURCES.LETTERS),
    source: SOURCES.LETTERS,
  };

  logger.info("=== Outils ===");
  yield {
    documents: await getDocumentBySource(SOURCES.TOOLS),
    source: SOURCES.TOOLS,
  };

  logger.info("=== Outils externes ===");
  yield {
    documents: await getDocumentBySource(SOURCES.EXTERNALS),
    source: SOURCES.EXTERNALS,
  };

  logger.info("=== Dossiers ===");
  yield {
    documents: await getDocumentBySource(SOURCES.THEMATIC_FILES),
    source: SOURCES.THEMATIC_FILES,
  };

  logger.info("=== Code du travail ===");
  yield {
    documents: await getDocumentBySource(SOURCES.CDT),
    source: SOURCES.CDT,
  };

  logger.info("=== Contributions ===");
  const contributions = await getDocumentBySource(SOURCES.CONTRIBUTIONS);
  yield {
    documents: contributions.map(({ answers, ...contribution }) => ({
      ...contribution,
      answers: {
        ...answers,
        generic: {
          ...answers.generic,
          markdown: addGlossary(answers.generic.markdown),
        },
      },
    })),
    source: SOURCES.CONTRIBUTIONS,
  };

  logger.info("=== Conventions Collectives ===");
  const ccnData = await getDocumentBySource(SOURCES.CCN);
  const allKaliBlocks = await getAllKaliBlocks();
  yield {
    documents: ccnData.map(({ ...content }) => {
      return {
        ...content,
        answers: content.answers.map((data) => {
          const contrib = contributions.find(
            ({ index }) => data.index === index
          );
          if (!contrib) {
            throw "unknown contribution";
          }
          const [theme] = contrib.breadcrumbs;
          return {
            ...data,
            answer: addGlossary(data.answer),
            theme: theme.label,
          };
        }),
        articlesByTheme: getArticlesByTheme(allKaliBlocks, content.id),
        source: SOURCES.CCN,
      };
    }),
    source: SOURCES.CCN,
  };

  logger.info("=== Fiches SP ===");
  yield {
    documents: await getDocumentBySource(SOURCES.SHEET_SP),
    source: SOURCES.SHEET_SP,
  };

  logger.info("=== page fiches travail ===");
  const fichesMT = await getDocumentBySource(SOURCES.SHEET_MT_PAGE);
  yield {
    documents: fichesMT.map(({ sections, ...infos }) => ({
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
    })),
    source: SOURCES.SHEET_MT_PAGE,
  };

  logger.info("=== Fiche MT(split) ===");
  const splittedFiches = fichesMT.flatMap(splitArticle);
  yield {
    documents: splittedFiches.map((fiche) => ({
      ...fiche,
      // fix breadcrumbs generation
      breadcrumbs: getBreadcrumbs(
        `/${getRouteBySource(SOURCES.SHEET_MT)}/${fiche.slug.replace(
          /#.*$/,
          ""
        )}`
      ),
      source: SOURCES.SHEET_MT,
    })),
    source: SOURCES.SHEET_MT,
  };

  logger.info("=== Themes ===");
  yield {
    documents: themes.map(
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
          isPublished: true,
          position,
          refs,
          slug: toSlug(title, position),
          source: SOURCES.THEMES,
          title,
        };
      }
    ),
    source: SOURCES.THEMES,
  };

  logger.info("=== Highlights ===");
  yield {
    documents: [
      {
        data: require("@socialgouv/datafiller-data/data/hightlights.json"),
        source: SOURCES.HIGHLIGHTS,
      },
    ],
    source: SOURCES.HIGHLIGHTS,
  };

  logger.info("=== glossary ===");
  yield {
    documents: [
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
    ],
    source: SOURCES.GLOSSARY,
  };

  logger.info("=== PreQualified Request ===");
  yield {
    documents: [
      {
        data: require("@socialgouv/datafiller-data/data/requests.json"),
        source: SOURCES.PREQUALIFIED,
      },
    ],
    source: SOURCES.PREQUALIFIED,
  };

  logger.info("=== data version ===");
  yield {
    documents: [
      {
        data: getVersions(),
        source: SOURCES.VERSIONS,
      },
    ],
    source: SOURCES.VERSIONS,
  };
}

export { getDuplicateSlugs, cdtnDocumentsGen };
