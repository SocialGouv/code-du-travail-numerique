import striptags from "striptags";
import crypto from "crypto";

import { logger } from "./logger";
import slugify from "../slugify";

const SOURCES = {
  CCN: "kali",
  CDT: "code_du_travail",
  SHEET_SP: "fiches_service_public",
  SHEET_MT: "fiches_ministere_travail",
  THEMES: "themes",
  TOOLS: "outils",
  LETTERS: "modeles_de_courriers",
  FAQ: "faq",
  SNIPPET: "snippet"
};

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

/**
 * Find duplicate slugs
 * @param {iterable} allDocuments is an iterable generator
 */
function getDuplicateSlugs(allDocuments) {
  let slugs = [];
  for (const documents of allDocuments) {
    slugs = slugs.concat(
      documents.map(({ source, slug }) => `${source}/${slug}`)
    );
  }

  return slugs
    .map(slug => ({ slug, count: slugs.filter(s => slug === s).length }))
    .filter(({ count }) => count > 1)
    .reduce((state, { slug, count }) => ({ ...state, [slug]: count }), {});
}

function* cdtnDocumentsGen() {
  logger.info("=== Conventions Collectives ===");
  yield require("../dataset/kali/kali.json").map(
    ({ slug, titre, url, num, id }) => ({
      source: SOURCES.CCN,
      id,
      idcc: num,
      title: titre,
      slug: slug,
      text: `IDCC ${num} ${titre}`,
      url
    })
  );

  logger.info("=== Code du travail ===");
  yield require("../dataset/code_du_travail/code-du-travail.json").map(
    ({ bloc_textuel, slug, titre, date_debut, url }) => ({
      source: SOURCES.CDT,
      title: titre,
      slug,
      description: bloc_textuel.slice(0, bloc_textuel.indexOf("…", 150)),
      text: bloc_textuel,
      html: bloc_textuel,
      date_debut,
      url
    })
  );

  logger.info("=== Fiches SP ===");
  yield require("../dataset/fiches_service_public/fiches-sp-travail.json").map(
    ({
      id,
      title,
      description,
      themeCdtn,
      text,
      raw,
      date,
      references_juridiques,
      url
    }) => ({
      id,
      source: SOURCES.SHEET_SP,
      title,
      slug: slugify(title),
      description: description,
      breadcrumbs: themeCdtn,
      theme: themeCdtn && themeCdtn[themeCdtn.length - 1].slug,
      text,
      raw,
      date,
      references_juridiques,
      url
    })
  );

  logger.info("=== Fiches MT ===");
  yield require("../dataset/fiches_ministere_travail/fiches-min-travail.json").map(
    ({
      title,
      slug,
      text,
      description,
      anchor,
      intro,
      html,
      themeCdtn,
      date,
      url
    }) => ({
      source: SOURCES.SHEET_MT,
      title,
      slug,
      intro,
      description,
      text,
      html,
      breadcrumbs: themeCdtn,
      theme: themeCdtn && themeCdtn[themeCdtn.length - 1].slug,
      date,
      url,
      anchor
    })
  );

  logger.info("=== Themes ===");
  yield require("../dataset/themes/themes.json").map(({ slug, label }) => ({
    source: SOURCES.THEMES,
    title: label,
    slug
  }));

  logger.info("=== Courriers ===");
  yield require("../dataset/export-courriers.json").map(
    ({
      titre,
      filename,
      description,
      questions,
      html,
      tags,
      date_redaction,
      redacteur,
      source
    }) => ({
      source: SOURCES.LETTERS,
      title: titre,
      slug: slugify(titre),
      description,
      text: questions.join("\n"),
      html,
      filename,
      date: date_redaction,
      editor: source,
      author: redacteur,
      tags: flattenTags(tags)
    })
  );
  logger.info("=== Outils ===");
  yield require("../dataset/outils.json").map(
    ({ titre, code, questions, themes, date, branche }) => ({
      source: SOURCES.TOOLS,
      title: titre,
      slug: slugify(code),
      text: questions.join("\n"),
      themes: themes,
      date,
      branche
    })
  );

  logger.info("=== Faq ===");
  yield require("../dataset/faq.json").map(
    ({ question, reponse, date, tags, source }) => {
      const faqText = striptags(reponse);
      const flatTags = flattenTags(tags);
      return {
        source: SOURCES.FAQ,
        title: question,
        slug: makeSlug(question, flatTags.join("-")),
        text: faqText,
        description: faqText.slice(0, faqText.indexOf(" ", 150)) + "…",
        html: reponse,
        tags: flatTags,
        date,
        author: source ? source : "DIRRECTE"
      };
    }
  );

  logger.info("=== Faq contributions ===");
  yield require("../dataset/faq-contributions.json").map(
    ({ question, reponse, date_redaction, date_expiration, tags }) => {
      const faqText = striptags(reponse);
      const flatTags = flattenTags(tags);
      return {
        source: SOURCES.FAQ,
        title: question,
        slug: makeSlug(question, flatTags.join("-")),
        text: faqText,
        description: faqText.slice(0, faqText.indexOf(" ", 150)) + "…",
        html: reponse,
        tags: flatTags,
        date: date_redaction,
        date_expiration: date_expiration,
        author: "DIRRECTE"
      };
    }
  );

  logger.info("=== Faq snippets ===");
  yield require("../dataset/faq-snippets.json").map(
    ({
      question,
      reponse,
      date_redaction,
      date_expiration,
      tags,
      references,
      redacteur
    }) => {
      const faqText = striptags(reponse);
      const flatTags = flattenTags(tags);
      return {
        source: SOURCES.SNIPPET,
        title: question,
        slug: slugify(question),
        text: faqText,
        description: faqText.slice(0, faqText.indexOf(" ", 150)) + "…",
        html: reponse,
        tags: flatTags,
        date: date_redaction,
        date_expiration: date_expiration,
        references,
        author: redacteur
      };
    }
  );
}

export { flattenTags, makeSlug, getDuplicateSlugs, cdtnDocumentsGen };
