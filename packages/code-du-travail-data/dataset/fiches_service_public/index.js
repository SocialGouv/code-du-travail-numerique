#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const xmlStringToJsObject = require("xml-js").xml2js;
const uniqBy = require("lodash.uniqby");
const filter = require("./filter");
const format = require("./format");

const read = path => fs.readFileSync(path).toString();

const getFiches = fichePath =>
  fs
    .readdirSync(path.join(__dirname, fichePath))
    .filter(file => file.match(/F[0-9]+/))
    .map(file => read(`${fichePath}/${file}`));

const fiches = [].concat(
  getFiches("data/particuliers"),
  getFiches("data/professionnels"),
  getFiches("data/associations")
);

const parsedFiches = fiches.map(fiche =>
  xmlStringToJsObject(fiche, {
    alwaysArray: true,
    ignoreDeclaration: true,
    ignoreDoctype: true,
    ignoreInstruction: true,
    elementsKey: "$",
    attributesKey: "_",
    textKey: "$"
  })
);

const uniqFiches = uniqBy(parsedFiches, fiche => fiche.$[0]._.ID);
const filteredFiches = filter(uniqFiches);

const formatedFiches = filteredFiches.map(format).filter(Boolean);

if (module === require.main) {
  console.log(JSON.stringify(formatedFiches, null, 2));
}
