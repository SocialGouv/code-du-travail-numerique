import { getRouteBySource, SOURCES } from "@cdt/sources";
import themes from "@socialgouv/datafiller-data/data/themes.json";
import crypto from "crypto";
import find from "unist-util-find";
import { selectAll } from "unist-util-select";
import { parseIdcc } from "..";
import { getCourriers } from "../dataset/courrier-type";
import { thematicFiles } from "../dataset/dossiers";
import { getFichesSP } from "../dataset/fiches_service_public";
import slugify from "../slugify";
import { getAgreementPages } from "./agreement_pages";
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
    .map((slug) => ({ slug, count: slugs.filter((s) => slug === s).length }))
    .filter(({ count }) => count > 1)
    .reduce((state, { slug, count }) => ({ ...state, [slug]: count }), {});
}

async function* cdtnDocumentsGen() {
  logger.info("=== Conventions Collectives ===");
  yield require("@socialgouv/kali-data/data/index.json").map(
    ({ id, num, title, shortTitle, url, effectif }) => {
      return {
        source: SOURCES.CCN,
        id,
        idcc: parseIdcc(num),
        title,
        shortTitle,
        slug: slugify(`${num}-${shortTitle}`.substring(0, 80)),
        text: `IDCC ${num} ${title}`,
        url,
        effectif,
        excludeFromSearch: false,
      };
    }
  );

  logger.info("=== Code du travail ===");
  yield selectAll(
    "article",
    require("@socialgouv/legi-data/data/LEGITEXT000006072050.json")
  ).map(
    ({ data: { id, num, dateDebut, nota, notaHtml, texte, texteHtml } }) => ({
      source: SOURCES.CDT,
      title: fixArticleNum(id, num),
      slug: slugify(fixArticleNum(id, num)),
      description: texte.slice(0, texte.indexOf("…", 150)),
      html: texteHtml,
      text: `${texte}\n${nota}`,
      dateDebut,
      ...(nota.length > 0 && { notaHtml }),
      url: getArticleUrl(id),
      excludeFromSearch: false,
    })
  );

  logger.info("=== Fiches SP ===");
  yield getFichesSP();

  logger.info("=== Fiche MT(split) ===");
  const fichesTravail = require("@socialgouv/fiches-travail-data/data/fiches-travail.json");
  fichesTravail.forEach((article) => (article.slug = slugify(article.title)));

  const splittedFiches = fichesTravail.flatMap(splitArticle);

  yield splittedFiches.map(
    ({ anchor, description, html, slug, text, title }) => {
      return {
        source: SOURCES.SHEET_MT,
        anchor,
        description,
        breadcrumbs: getBreadcrumbs(
          `/${getRouteBySource(SOURCES.SHEET_MT)}/${slug}`
        ),
        html,
        slug,
        text,
        title,
        excludeFromSearch: false,
      };
    }
  );

  logger.info("=== Themes ===");
  yield themes.map(({ breadcrumbs, children, icon, position, refs, title }) => {
    return {
      source: SOURCES.THEMES,
      title: title,
      slug: toSlug(title, position),
      icon,
      children: children.map(toBreadcrumbs),
      position,
      breadcrumbs: breadcrumbs.map(toBreadcrumbs),
      refs,
      excludeFromSearch: false,
    };
  });

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

  logger.info("=== Contributions ===");

  yield require("@socialgouv/contributions-data/data/contributions.json").map(
    ({ title, answers }) => {
      const slug = slugify(title);
      fixReferences(answers.generic);
      answers.conventions.forEach(fixReferences);
      return {
        source: SOURCES.CONTRIBUTIONS,
        title,
        slug,
        breadcrumbs: getBreadcrumbs(`/${SOURCES.CONTRIBUTIONS}/${slug}`),
        description: (answers.generic && answers.generic.description) || title,
        text: (answers.generic && answers.generic.text) || title,
        answers,
        excludeFromSearch: false,
      };
    }
  );

  logger.info("=== Dossiers ===");
  yield thematicFiles.map(
    ({ asideContent, description, metaDescription, refs, slug, title }) => {
      return {
        source: SOURCES.THEMATIC_FILES,
        title,
        slug,
        description,
        metaDescription,
        asideContent,
        text: `${title}\n${description}`,
        refs,
        excludeFromSearch: false,
      };
    }
  );
  logger.info("=== Hightlights ===");
  yield [
    {
      source: SOURCES.HIGHLIGHTS,
      data: require("@socialgouv/datafiller-data/data/hightlights.json"),
    },
  ];
  logger.info("=== glossary ===");
  yield [
    {
      source: SOURCES.GLOSSARY,
      data: require("@socialgouv/datafiller-data/data/glossary.json").map(
        (item) => {
          return {
            ...item,
            slug: slugify(item.title),
          };
        }
      ),
    },
  ];
  logger.info("=== PreQualified Request ===");
  yield [
    {
      source: SOURCES.PREQUALIFIED,
      data: require("@socialgouv/datafiller-data/data/requests.json"),
    },
  ];
  logger.info("=== page fiches travail ===");
  const fichesTravailData = require("@socialgouv/fiches-travail-data/data/fiches-travail.json");
  yield fichesTravailData.map(({ sections, ...content }) => {
    const slug = slugify(content.title);
    return {
      ...content,
      source: SOURCES.SHEET_MT_PAGE,
      slug,
      breadcrumbs: getBreadcrumbs(
        `/${getRouteBySource(SOURCES.SHEET_MT)}/${slug}`
      ),
      // eslint-disable-next-line no-unused-vars
      sections: sections.map(({ description, text, ...section }) => section),
    };
  });
  logger.info("=== page ccn ===");
  const ccnData = getAgreementPages();
  yield ccnData.map(({ ...content }) => {
    return {
      ...content,
      source: SOURCES.CCN_PAGE,
    };
  });
  logger.info("=== data version ===");
  yield [
    {
      source: SOURCES.VERSIONS,
      data: getVersions(),
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
