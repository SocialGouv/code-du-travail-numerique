const select = require("xpath.js");

module.exports = function ficheFilter(xml) {
  if (excludeDossierId.some(id => matchFilDAriane(xml, id))) {
    return false;
  }
  const includeList = includeThemeId.concat(includeDossierId, includeFicheId);
  if (includeList.some(id => matchFilDAriane(xml, id))) {
    return true;
  }
  return false;
};

function matchFilDAriane(doc, id) {
  return select(doc, `/Publication/FilDAriane//Niveau[@ID='${id}']`).length > 0;
}

// Liste fourni par @jrduscher
const excludeDossierId = [
  "N500",
  "N511",
  "N505",
  "N31057",
  "N19978",
  "N186",
  "N431",
  "N512",
  "N503",
  "N102",
  "N20276",
  "N515",
  "N379"
];

const includeDossierId = [
  "N20286",
  "N31477",
  "N107",
  "N31143",
  "N16594",
  "N24267",
  "N31775",
  "N22781",
  "N31391",
  "N31392"
];

const includeThemeId = [
  "N19806" // particulier / travail
];
const includeFicheId = [
  "F2517",
  "F1642",
  "F2354",
  "F1043",
  "F34705",
  "F31982",
  "F21000",
  "F23633",
  "F19087",
  "F34059",
  "F23106",
  "F10029",
  "F33050",
  "F32329",
  "F2607",
  "F153"
];
