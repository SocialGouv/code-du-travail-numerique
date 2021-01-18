// eslint-disable-next-line simple-import-sort/sort
import { SOURCES } from "@socialgouv/cdtn-sources";
import fetch from "node-fetch";

import { createGlossaryTransform } from "./glossary";
import { buildGetBreadcrumbs } from "./breadcrumbs";
import {
  getDocumentBySource,
  getAllKaliBlocks,
  getGlossary,
} from "./fetchCdtnAdminDocuments";

import { splitArticle } from "./fichesTravailSplitter";
import { logger } from "./logger";
import { markdownTransform } from "./markdown";
import { getVersions } from "./versions";
import { getArticlesByTheme } from "./kali";
import { buildThemes } from "./buildThemes";

const CDTN_ADMIN_ENDPOINT =
  process.env.CDTN_ADMIN_ENDPOINT || "http://localhost:8080/v1/graphql";

console.error(`Accessing cdtn admin on ${CDTN_ADMIN_ENDPOINT}`);

const themesQuery = JSON.stringify({
  query: `{
  themes: documents(where: {source: {_eq: "${SOURCES.THEMES}"}}) {
    cdtnId: cdtn_id
    id: initial_id
    slug
    source
    title
    document
    contentRelations: relation_a(where: {type: {_eq: "theme-content"}}, order_by: {}) {
      content: b {
        cdtnId: cdtn_id
        slug
        source
        title
      }
      position: data(path: "position")
    }
    parentRelations: relation_b(where: {type: {_eq: "theme"}}) {
      parentThemeId: document_a
      position: data(path: "position")
    }
  }
}`,
});

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
  const themesQueryResult = await fetch(CDTN_ADMIN_ENDPOINT, {
    body: themesQuery,
    method: "POST",
  }).then(async (r) => {
    const data = await r.json();
    if (r.ok) {
      return data;
    }
    return Promise.reject(data);
  });

  console.error("themes fetched");

  const themes = themesQueryResult.data.themes;

  const getBreadcrumbs = buildGetBreadcrumbs(themes);

  const glossaryTerms = await getGlossary();
  const addGlossary = createGlossaryTransform(glossaryTerms);

  logger.info("=== Editorial contents ===");
  const documents = await getDocumentBySource(SOURCES.EDITORIAL_CONTENT);
  yield {
    documents: markdownTransform(addGlossary, documents),
    source: SOURCES.EDITORIAL_CONTENT,
  };

  logger.info("=== Courriers ===");
  yield {
    documents: await getDocumentBySource(SOURCES.LETTERS, getBreadcrumbs),
    source: SOURCES.LETTERS,
  };

  logger.info("=== Outils ===");
  yield {
    documents: await getDocumentBySource(SOURCES.TOOLS, getBreadcrumbs),
    source: SOURCES.TOOLS,
  };

  logger.info("=== Outils externes ===");
  yield {
    documents: await getDocumentBySource(SOURCES.EXTERNALS, getBreadcrumbs),
    source: SOURCES.EXTERNALS,
  };

  logger.info("=== Dossiers ===");
  yield {
    documents: await getDocumentBySource(
      SOURCES.THEMATIC_FILES,
      getBreadcrumbs
    ),
    source: SOURCES.THEMATIC_FILES,
  };

  logger.info("=== Code du travail ===");
  yield {
    documents: await getDocumentBySource(SOURCES.CDT),
    source: SOURCES.CDT,
  };

  logger.info("=== Contributions ===");
  const contributions = await getDocumentBySource(
    SOURCES.CONTRIBUTIONS,
    getBreadcrumbs
  );
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
          const contrib = contributions.find(({ slug }) => data.slug === slug);
          if (!contrib) {
            throw "unknown contribution";
          }
          const [theme] = contrib.breadcrumbs;
          return {
            ...data,
            answer: addGlossary(data.answer),
            theme: theme && theme.label,
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
    documents: await getDocumentBySource(SOURCES.SHEET_SP, getBreadcrumbs),
    source: SOURCES.SHEET_SP,
  };

  logger.info("=== page fiches travail ===");
  const fichesMT = await getDocumentBySource(
    SOURCES.SHEET_MT_PAGE,
    getBreadcrumbs
  );
  yield {
    documents: fichesMT.map(({ sections, ...infos }) => ({
      ...infos,
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
    documents: splittedFiches.map((fiche) => {
      // we don't want splitted fiches to have the same cdtnId than full pages
      // it causes bugs, tons of weird bugs, but we need the id for the
      // breadcrumbs generation
      const breadcrumbs = getBreadcrumbs(fiche.cdtnId);
      delete fiche.cdtnId;
      return {
        ...fiche,
        breadcrumbs,
        source: SOURCES.SHEET_MT,
      };
    }),
    source: SOURCES.SHEET_MT,
  };

  logger.info("=== Themes ===");
  yield {
    documents: buildThemes(themes, getBreadcrumbs),
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
        data: glossaryTerms,
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
