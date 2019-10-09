"use strict";

var _routeBySource, _labelBySource;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var SOURCES = {
  CCN: "conventions_collectives",
  CDT: "code_du_travail",
  SHEET_SP: "fiches_service_public",
  SHEET_MT: "fiches_ministere_travail",
  THEMES: "themes",
  TOOLS: "outils",
  LETTERS: "modeles_de_courriers",
  IDCC: "idcc",
  SHEET: "fiches",
  EXTERNALS: "external",
  CONTRIBUTIONS: "contributions"
}; // mapping elastic search source type -> route name

var routeBySource =
  ((_routeBySource = {}),
  _defineProperty(_routeBySource, SOURCES.SHEET_SP, "fiche-service-public"),
  _defineProperty(_routeBySource, SOURCES.SHEET_MT, "fiche-ministere-travail"),
  _defineProperty(_routeBySource, SOURCES.CDT, "code-du-travail"),
  _defineProperty(_routeBySource, SOURCES.LETTERS, "modeles-de-courriers"),
  _defineProperty(_routeBySource, SOURCES.THEMES, "themes"),
  _defineProperty(_routeBySource, SOURCES.TOOLS, "outils"),
  _defineProperty(_routeBySource, SOURCES.IDCC, "idcc"),
  _defineProperty(_routeBySource, SOURCES.CCN, "convention-collective"),
  _defineProperty(_routeBySource, SOURCES.EXTERNALS, "external"),
  _defineProperty(_routeBySource, SOURCES.CONTRIBUTIONS, "contribution"),
  _routeBySource); // mapping elastic search source type -> source label

var labelBySource =
  ((_labelBySource = {}),
  _defineProperty(_labelBySource, SOURCES.SHEET_SP, "service-public.fr"),
  _defineProperty(_labelBySource, SOURCES.SHEET_MT, "Ministère du Travail"),
  _defineProperty(_labelBySource, SOURCES.CDT, "Code du travail"),
  _defineProperty(_labelBySource, SOURCES.LETTERS, "Courrier Type"),
  _defineProperty(_labelBySource, SOURCES.THEMES, "Themes"),
  _defineProperty(_labelBySource, SOURCES.TOOLS, "Outils"),
  _defineProperty(_labelBySource, SOURCES.IDCC, "Legifrance"),
  _defineProperty(_labelBySource, SOURCES.CCN, "Legifrance"),
  _defineProperty(_labelBySource, SOURCES.EXTERNALS, "Lien externe"),
  _defineProperty(_labelBySource, SOURCES.SHEET, "Fiches"),
  _defineProperty(_labelBySource, SOURCES.CONTRIBUTIONS, "Contributions"),
  _labelBySource);
var sources = Object.values(SOURCES); // code_du_travail -> Code du travail

var getLabelBySource = function getLabelBySource(src) {
  return labelBySource[src] || "";
}; // code_du_travail -> code-du-travail

var getRouteBySource = function getRouteBySource(src) {
  return routeBySource[src];
}; // code-du-travail -> code_du_travail

var getSourceByRoute = function getSourceByRoute(slug) {
  return sources.find(function(key) {
    return routeBySource[key] === slug;
  });
};

module.exports = {
  SOURCES: SOURCES,
  getLabelBySource: getLabelBySource,
  getRouteBySource: getRouteBySource,
  getSourceByRoute: getSourceByRoute
};
