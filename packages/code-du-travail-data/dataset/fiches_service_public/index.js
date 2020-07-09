#!/usr/bin/env node
const fiches = require("@socialgouv/fiches-vdd");
const { SOURCES, getRouteBySource } = require("@cdt/sources");

const slugify = require("@cdt/slugify");
const { filter } = require("./filter");
const format = require("./format");

const contributions = require("@socialgouv/contributions-data/data/contributions.json");
const allThemes = require("@socialgouv/datafiller-data/data/themes.json");
const { createThemer } = require("../../indexing/breadcrumbs");

const { extractMdxContentUrl } = require("../../");

const TYPES = ["particuliers", "professionnels", "associations"];

const getBreadcrumbs = createThemer(allThemes);

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

const getFichesSP = () =>
  filter(fullFiches)
    .map(format)
    .filter(Boolean)
    .map(
      ({
        id,
        title,
        description,
        theme,
        text,
        raw,
        date,
        references_juridiques,
        url,
      }) => {
        const slug = slugify(title);
        return {
          breadcrumbs: getBreadcrumbs(
            `/${getRouteBySource(SOURCES.SHEET_SP)}/${slug}`
          ),
          date,
          description,
          excludeFromSearch: contribFicheId.includes(id),
          id,
          raw,
          references_juridiques,
          slug,
          source: SOURCES.SHEET_SP,
          text,
          theme,
          title,
          url,
        };
      }
    );

module.exports = { getFichesSP };
