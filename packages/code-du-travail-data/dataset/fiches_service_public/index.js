#!/usr/bin/env node
const fiches = require("@socialgouv/fiches-vdd");
const { SOURCES } = require("@cdt/sources");

const slugify = require("../../slugify");
const { filter } = require("./filter");
const format = require("./format");
const { getThemeFiche } = require("./getThemeFiche");

const contributions = require("@socialgouv/contributions-data/data/contributions.json");
const { extractMdxContentUrl } = require("../../");

const TYPES = ["particuliers", "professionnels", "associations"];

/** Fiche SP referenced from a contribution */

const contribFicheId = contributions
  .map(({ answers }) => extractMdxContentUrl(answers.generic.markdown))
  .filter(Boolean)
  .map((url) => {
    const [, id] = url.match(/\/(\w+)$/);
    return id;
  });

const fullFiches = [].concat(
  ...TYPES.map((type) =>
    fiches[type]
      .filter((id) => id.match(/F[0-9]+/))
      .map((id) => fiches.getFiche(type, id))
  )
);

const setTheme = (fiche) => ({
  ...fiche,
  ...getThemeFiche(fiche),
});

const getFichesSP = () =>
  filter(fullFiches)
    .map(format)
    .map(setTheme)
    .filter(Boolean)
    .map(
      ({
        id,
        title,
        description,
        breadcrumbs,
        theme,
        text,
        raw,
        date,
        references_juridiques,
        url,
      }) => ({
        id,
        source: SOURCES.SHEET_SP,
        title,
        slug: slugify(title),
        description,
        breadcrumbs,
        theme,
        text,
        raw,
        date,
        references_juridiques,
        url,
        excludeFromSearch: contribFicheId.includes(id),
      })
    );

module.exports = { getFichesSP };
