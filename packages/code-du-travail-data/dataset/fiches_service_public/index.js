// node --max-old-space-size=4096 index.js
const fs = require("fs");
const util = require("util")
const xmlStringToJsObject = require("xml-js").xml2js;
const uniqBy = require("lodash.uniqby");
const filter = require("./filter");
const format = require("./format");

const read = path => fs.readFileSync(path).toString();

const getFiches = path => fs
  .readdirSync(path)
  .filter(file => file.match(/[A-Z]{1}[0-9]+/))
  .map(file => read(`${path}/${file}`))

const fichesParticuliers = getFiches("./data/vosdroits-particuliers");
const fichesPro = getFiches("./data/vosdroits-professionnels")
const fiches = fichesParticuliers.concat(fichesPro);

const parsedFiches = fiches.map(fiche => xmlStringToJsObject(fiche, {
  alwaysArray: true,
  ignoreDeclaration: true,
  ignoreDoctype:  true,
  ignoreInstruction: true,
  elementsKey: "$",
  attributesKey: "_",
  textKey: "$"
}))

const filteredFiches = filter(uniqBy(parsedFiches, (fiche) => fiche.$[0]._.ID));

const formatedFiches = filteredFiches
  .map((fiche) => format(fiche))
  .filter(Boolean);

  if (module === require.main) {
    fs.writeFileSync("./fiches-sp-travail.json", JSON.stringify(formatedFiches, null, 2));
  }
