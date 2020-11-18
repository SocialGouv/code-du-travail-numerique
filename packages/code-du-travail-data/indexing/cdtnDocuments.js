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
    source: SOURCES.EDITORIAL_CONTENT,
    documents: markdownTransform(documents),
  };

  logger.info("=== Courriers ===");
  yield {
    source: SOURCES.LETTERS,
    documents: await getDocumentBySource(SOURCES.LETTERS),
  };

  logger.info("=== Outils ===");
  yield {
    source: SOURCES.TOOLS,
    documents: await getDocumentBySource(SOURCES.TOOLS),
  };

  logger.info("=== Outils externes ===");
  yield {
    source: SOURCES.EXTERNALS,
    documents: await getDocumentBySource(SOURCES.EXTERNALS),
  };

  logger.info("=== Dossiers ===");
  yield {
    source: SOURCES.THEMATIC_FILES,
    documents: await getDocumentBySource(SOURCES.THEMATIC_FILES),
  };

  logger.info("=== Code du travail ===");
  yield {
    source: SOURCES.CDT,
    documents: await getDocumentBySource(SOURCES.CDT),
  };

  logger.info("=== Contributions ===");
  const contributions = await getDocumentBySource(SOURCES.CONTRIBUTIONS);
  yield {
    source: SOURCES.CONTRIBUTIONS,
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
  };

  logger.info("=== Conventions Collectives ===");
  const ccnData = await getDocumentBySource(SOURCES.CCN);
  const allKaliBlocks = await getAllKaliBlocks();
  yield {
    source: SOURCES.CCN,
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
        source: SOURCES.CCN,
        articlesByTheme: getArticlesByTheme(allKaliBlocks, content.id),
      };
    }),
  };

  logger.info("=== Fiches SP ===");
  yield {
    source: SOURCES.SHEET_SP,
    documents: await getDocumentBySource(SOURCES.SHEET_SP),
  };

  logger.info("=== page fiches travail ===");
  const fichesMT = await getDocumentBySource(SOURCES.SHEET_MT_PAGE);
  yield {
    source: SOURCES.SHEET_MT_PAGE,
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
  };

  logger.info("=== Fiche MT(split) ===");
  const splittedFiches = fichesMT.flatMap(splitArticle);
  yield {
    source: SOURCES.SHEET_MT,
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
  };

  logger.info("=== Themes ===");
  yield {
    source: SOURCES.THEMES,
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
  };

  logger.info("=== Highlights ===");
  yield {
    source: SOURCES.HIGHLIGHTS,
    documents: [
      {
        data: require("@socialgouv/datafiller-data/data/hightlights.json"),
        source: SOURCES.HIGHLIGHTS,
      },
    ],
  };

  logger.info("=== glossary ===");
  yield {
    source: SOURCES.GLOSSARY,
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
  };

  logger.info("=== PreQualified Request ===");
  yield {
    source: SOURCES.PREQUALIFIED,
    documents: [
      {
        data: require("@socialgouv/datafiller-data/data/requests.json"),
        source: SOURCES.PREQUALIFIED,
      },
    ],
  };

  logger.info("=== data version ===");
  yield {
    source: SOURCES.VERSIONS,
    documents: [
      {
        data: getVersions(),
        source: SOURCES.VERSIONS,
      },
    ],
  };
}

export { getDuplicateSlugs, cdtnDocumentsGen };
