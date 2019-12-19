#!/usr/bin/env node
const fiches = require("@socialgouv/fiches-vdd");
const { SOURCES } = require("@cdt/sources");

const slugify = require("../../slugify");
const filter = require("./filter");
const format = require("./format");
const { getThemeFiche } = require("./getThemeFiche");

const TYPES = ["particuliers", "professionnels", "associations"];

const fullFiches = [].concat(
  ...TYPES.map(type =>
    fiches[type]
      .filter(id => id.match(/F[0-9]+/))
      .map(id => fiches.getFiche(type, id))
  )
);

const setTheme = fiche => ({
  ...fiche,
  ...getThemeFiche(fiche)
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
        url
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
        url
      })
    );

module.exports = { getFichesSP };
