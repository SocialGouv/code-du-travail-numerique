import slugify from "@socialgouv/cdtn-slugify";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import themes from "@socialgouv/datafiller-data/data/themes.json";
import crypto from "crypto";
import find from "unist-util-find";
import { selectAll } from "unist-util-select";

import { parseIdcc } from "..";
import { getCourriers } from "../dataset/courrier-type";
import { thematicFiles } from "../dataset/dossiers";
import { getEditorialContents } from "../dataset/editorial_content";
import { getFichesSP } from "../dataset/fiches_service_public";
import { addGlossary } from "./addGlossary";
import { getAgreementPages } from "./agreementPages";
import { createThemer, toBreadcrumbs, toSlug } from "./breadcrumbs";
import { splitArticle } from "./fichesTravailSplitter";
import { logger } from "./logger";
import { getVersions } from "./versions";

const getBreadcrumbs = createThemer(themes);
function flattenTags(tags = []) {
  return Object.entries(tags).reduce((state, [key, value]) => {
    return value instanceof Array
      ? state.concat(value.map((value) => `${key}:${value}`))
      : state.concat(`${key}:${value}`);
  }, []);
}

function makeSlug(text, seed) {
  const shasum = crypto.createHash("sha1");
  const value = shasum.update(text + seed);
  return slugify(
    `${text}-${Buffer.from(value.digest().slice(0, 10))
      .toString("base64")
      // we replace + / with urlsafe char to mimic python urlsafe_b64encode
      // since it was used originally
      .replace(/\+/g, "-")
      .replace(/\//g, "_")}}`
  );
}

function getArticleUrl(id) {
  return `https://www.legifrance.gouv.fr/affichCodeArticle.do;?idArticle=${id}&cidTexte=LEGITEXT000006072050`;
}

function fixArticleNum(id, num) {
  if (num.match(/^annexe\s/i) && !num.includes("article")) {
    return `${num} ${id}`;
  }
  return num;
}

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
  const fichesMT = require("@socialgouv/fiches-travail-data/data/fiches-travail.json");
  fichesMT.forEach((article) => (article.slug = slugify(article.title)));

  logger.info("=== Conventions Collectives ===");
  yield require("@socialgouv/kali-data/data/index.json").map(
    ({ id, num, title, shortTitle, url, effectif }) => {
      return {
        effectif,
        excludeFromSearch: false,
        id,
        idcc: parseIdcc(num),
        shortTitle,
        slug: slugify(`${num}-${shortTitle}`.substring(0, 80)),
        source: SOURCES.CCN,
        text: `IDCC ${num} ${title}`,
        title,
        url,
      };
    }
  );

  logger.info("=== Code du travail ===");
  yield selectAll(
    "article",
    require("@socialgouv/legi-data/data/LEGITEXT000006072050.json")
  ).map(
    ({ data: { id, num, dateDebut, nota, notaHtml, texte, texteHtml } }) => ({
      dateDebut,
      description: texte.slice(0, texte.indexOf("…", 150)),
      html: texteHtml,
      id,
      slug: slugify(fixArticleNum(id, num)),
      source: SOURCES.CDT,
      text: `${texte}\n${nota}`,
      title: fixArticleNum(id, num),
      ...(nota.length > 0 && { notaHtml }),
      excludeFromSearch: false,
      url: getArticleUrl(id),
    })
  );

  logger.info("=== Editorial contents ===");
  yield getEditorialContents();

  logger.info("=== Fiches SP ===");
  yield getFichesSP();

  logger.info("=== Fiche MT(split) ===");
  const splittedFiches = fichesMT.flatMap(splitArticle);

  yield splittedFiches.map(
    ({ anchor, pubId, description, html, slug, text, title }) => {
      return {
        anchor,
        breadcrumbs: getBreadcrumbs(
          `/${getRouteBySource(SOURCES.SHEET_MT)}/${slug.replace(/#.*$/, "")}`
        ),
        description,
        excludeFromSearch: false,
        html,
        id: pubId + (anchor ? `#${anchor}` : ""),
        slug,
        source: SOURCES.SHEET_MT,
        text,
        title,
      };
    }
  );

  logger.info("=== Themes ===");
  yield themes.map(
    ({ breadcrumbs, children, icon, introduction, position, refs, title }) => {
      return {
        breadcrumbs: breadcrumbs.map(toBreadcrumbs),
        children: children.map(toBreadcrumbs),
        description: introduction,
        excludeFromSearch: false,
        icon,
        // FIXME: temporary
        id: title,
        position,
        refs,
        slug: toSlug(title, position),
        source: SOURCES.THEMES,
        title: title,
      };
    }
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
        id,
        questions,
        slug,
        title,
      }) => ({
        action,
        breadcrumbs,
        date,
        description,
        excludeFromSearch: false,
        icon,
        id,
        slug,
        source: SOURCES.TOOLS,
        text: questions.join("\n"),
        title,
      })
    );

  logger.info("=== Outils externes ===");
  yield require("../dataset/tools/externals.json").map(
    ({ action, description, icon, id, title, url }) => ({
      action,
      description,
      excludeFromSearch: false,
      icon,
      id,
      slug: slugify(title),
      source: SOURCES.EXTERNALS,
      text: description,
      title,
      url,
    })
  );

  logger.info("=== Contributions ===");
  yield require("@socialgouv/contributions-data/data/contributions.json").map(
    ({ title, answers, id }) => {
      const slug = slugify(title);
      fixReferences(answers.generic);
      answers.conventions.forEach(fixReferences);

      return {
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
        description: (answers.generic && answers.generic.description) || title,
        excludeFromSearch: false,
        id,
        slug,
        source: SOURCES.CONTRIBUTIONS,
        text: (answers.generic && answers.generic.text) || title,
        title,
      };
    }
  );

  logger.info("=== Dossiers ===");
  yield thematicFiles.map(
    ({ categories, description, metaDescription, refs, slug, title, id }) => {
      return {
        categories,
        description,
        excludeFromSearch: false,
        id,
        metaDescription,
        refs,
        slug,
        source: SOURCES.THEMATIC_FILES,
        text: `${title}\n${description}`,
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

  logger.info("=== page fiches travail ===");
  yield fichesMT.map(({ sections, ...content }) => {
    return {
      ...content,
      breadcrumbs: getBreadcrumbs(
        `/${getRouteBySource(SOURCES.SHEET_MT)}/${content.slug}`
      ),
      // eslint-disable-next-line no-unused-vars
      sections: sections.map(({ description, text, ...section }) => ({
        ...section,
        html: addGlossary(section.html),
      })),

      source: SOURCES.SHEET_MT_PAGE,
    };
  });

  logger.info("=== page ccn ===");
  const ccnData = getAgreementPages();
  yield ccnData.map(({ ...content }) => {
    return {
      ...content,
      answers: content.answers.map((data) => ({
        ...data,
        answer: addGlossary(data.answer),
      })),
      source: SOURCES.CCN_PAGE,
    };
  });

  logger.info("=== data version ===");
  yield [
    {
      data: getVersions(),
      source: SOURCES.VERSIONS,
    },
  ];
}
/**
 * HACK @lionelb
 * fix references is here only until migration of references in contributions
 * will be done.
 * fixReferences will resolve article num.
 * For article withou num, it will use the parent section's name
 */
function fixReferences({ references = [], idcc = "generic" }) {
  references.forEach((ref) => {
    if (ref.title.startsWith("KALIARTI")) {
      const tree = require(`@socialgouv/kali-data/data/${ref.agreement.id}.json`);
      const parent = find(tree, (node) => {
        return (
          node.type === "section" &&
          node.children.some((node) => node.data.id === ref.title)
        );
      });
      if (parent) {
        const node = parent.children.find((node) => node.data.id === ref.title);
        ref.id = ref.title;
        ref.title = node.data.num
          ? `Article ${node.data.num}`
          : parent.data.title;
        if (!ref.title) {
          console.error("article with no num", ref.id, ref.agreement.id, idcc);
        }
      } else {
        console.error("can't fix ref for", ref.title, ref.agreement.id, idcc);
      }
    }
  });
}

export { flattenTags, makeSlug, getDuplicateSlugs, cdtnDocumentsGen };
