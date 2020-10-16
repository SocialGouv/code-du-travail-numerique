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
  yield markdownTransform(documents).map((doc) => ({
    ...doc,
    /**
     * @TODO: this will needs to be changed for other editorial content
     */
    breadcrumbs: [
      {
        label: "Dossier Coronavirus-Covid 19",
        slug: `/${getRouteBySource(
          SOURCES.THEMATIC_FILES
        )}/ministere-du-travail-notre-dossier-sur-le-coronavirus`,
      },
    ],
  }));

  logger.info("=== Courriers ===");
  const courriers = await getDocumentBySource(SOURCES.LETTERS);
  yield courriers.map((courrier) => ({
    ...courrier,
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.LETTERS)}/${courrier.slug}`
    ),
  }));

  logger.info("=== Outils ===");
  const outils = await getDocumentBySource(SOURCES.TOOLS);
  yield outils.map((outil) => ({
    ...outil,
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.TOOLS)}/${outil.slug}`
    ),
  }));

  logger.info("=== Outils externes ===");
  const externalTools = await getDocumentBySource(SOURCES.EXTERNALS);
  yield externalTools.map((externalTool) => ({
    ...externalTool,
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.EXTERNALS)}/${externalTool.slug}`
    ),
  }));

  logger.info("=== Dossiers ===");
  const dossiers = await getDocumentBySource(SOURCES.THEMATIC_FILES);
  yield dossiers.map((dossier) => ({
    ...dossier,
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.THEMATIC_FILES)}/${dossier.slug}`
    ),
  }));

  logger.info("=== Code du travail ===");
  yield getDocumentBySource(SOURCES.CDT);

  logger.info("=== Conventions Collectives ===");
  const ccnData = await getDocumentBySource(SOURCES.CCN);
  yield ccnData.map(({ ...content }) => {
    return {
      ...content,
      answers: content.answers.map((data) => ({
        ...data,
        answer: addGlossary(data.answer),
      })),
      source: SOURCES.CCN,
    };
  });

  logger.info("=== Contributions ===");
  const contributions = await getDocumentBySource(SOURCES.CONTRIBUTIONS);
  yield contributions.map(({ slug, answers, ...contribution }) => ({
    ...contribution,
    answers: {
      ...answers,
      generic: {
        ...answers.generic,
        markdown: addGlossary(answers.generic.markdown),
      },
    },
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${slug}`
    ),
  }));

  logger.info("=== Fiches SP ===");
  const fiches = await getDocumentBySource(SOURCES.SHEET_SP);
  yield fiches.map((fiche) => ({
    ...fiche,
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.SHEET_SP)}/${fiche.slug}`
    ),
  }));

  logger.info("=== page fiches travail ===");
  const fichesMT = await getDocumentBySource(SOURCES.SHEET_MT_PAGE);
  yield fichesMT.map(({ sections, ...infos }) => ({
    ...infos,
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.SHEET_MT_PAGE)}/${infos.slug}`
    ),
    sections: sections.map(({ html, ...section }) => {
      delete section.description;
      delete section.text;
      return {
        html: addGlossary(html),
        ...section,
      };
    }),
  }));

  logger.info("=== Fiche MT(split) ===");
  const splittedFiches = fichesMT.flatMap(splitArticle);
  console.log();
  yield splittedFiches.map((fiche) => ({
    ...fiche,
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
