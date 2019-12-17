import crypto from "crypto";
import { selectAll } from "unist-util-select";
import { logger } from "./logger";
import slugify from "../slugify";
import { SOURCES } from "@cdt/sources";
import { parseIdcc, formatIdcc } from "../lib";
import { getCourriers } from "../dataset/courrier-type";
import { getFichesSP } from "../dataset/fiches_service_public";

function flattenTags(tags = []) {
  return Object.entries(tags).reduce((state, [key, value]) => {
    return value instanceof Array
      ? state.concat(value.map(value => `${key}:${value}`))
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
    .map(slug => ({ slug, count: slugs.filter(s => slug === s).length }))
    .filter(({ count }) => count > 1)
    .reduce((state, { slug, count }) => ({ ...state, [slug]: count }), {});
}

async function* cdtnDocumentsGen() {
  logger.info("=== Conventions Collectives ===");
  yield require("@socialgouv/kali-data/data/index.json").map(
    ({ id, num, title, shortTitle }) => {
      const idcc = formatIdcc(num);
      return {
        source: SOURCES.CCN,
        id,
        idcc: parseIdcc(num),
        title,
        shortTitle,
        slug: slugify(`${idcc}-${title}`.substring(0, 80)),
        text: `IDCC ${num} ${title}`,
        url: `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${id}`
      };
    }
  );

  logger.info("=== Code du travail ===");
  yield selectAll(
    "article",
    require("@socialgouv/legi-data/data/LEGITEXT000006072050.json")
  ).map(({ data: { id, num, date_debut, texte, texteHtml } }) => ({
    source: SOURCES.CDT,
    title: fixArticleNum(id, num),
    slug: slugify(fixArticleNum(id, num)),
    description: texte.slice(0, texte.indexOf("…", 150)),
    html: texteHtml,
    text: texte,
    date_debut,
    url: getArticleUrl(id)
  }));

  logger.info("=== Fiches SP ===");
  yield getFichesSP();

  logger.info("=== Fiche MT(split) ===");
  yield require("../dataset/fiches_ministere_travail/fiches-mt-split.json").map(
    ({ anchor, description, html, slug, text, title }) => ({
      source: SOURCES.SHEET_MT,
      anchor,
      description,
      html,
      slug,
      text,
      title
    })
  );

  logger.info("=== Themes ===");
  yield require("../dataset/datafiller/themes.data.json").map(
    ({ slug, title }) => ({
      source: SOURCES.THEMES,
      title: title,
      slug
    })
  );

  logger.info("=== Courriers ===");
  yield getCourriers();

  logger.info("=== Outils ===");
  yield require("../dataset/tools").map(
    ({ action, date, description, icon, questions, slug, themes, title }) => ({
      action,
      date,
      description,
      icon,
      slug,
      source: SOURCES.TOOLS,
      text: questions.join("\n"),
      themes: themes,
      title
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
      title
    })
  );

  // Temporary removed from ES
  logger.info("=== Contributions ===");
  yield require("../dataset/contributions/contributions.data.json").map(
    ({ value, answers }) => {
      return {
        source: SOURCES.CONTRIBUTIONS,
        title: value,
        slug: slugify(value),
        description: (answers.generic && answers.generic.text) || value,
        text: (answers.generic && answers.generic.text) || value,
        answers
      };
    }
  );
}

export { flattenTags, makeSlug, getDuplicateSlugs, cdtnDocumentsGen };
