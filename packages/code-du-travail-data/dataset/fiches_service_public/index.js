const fs = require("fs");
const util = require("util")
const xmlStringToJsObject = require("xml-js").xml2js;
const uniqBy = require("lodash.uniqby");
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
  elementsKey: "children",
  attributesKey: "attr",
  textKey: "value"
}))

const formatedFiches = parsedFiches
  .map((fiche) => format(fiche))
  .filter(Boolean);
/*
  if (module === require.main) {
    console.log(JSON.stringify(uniqBy(formatedFiches, "url"), null, 2));
  }
*/
