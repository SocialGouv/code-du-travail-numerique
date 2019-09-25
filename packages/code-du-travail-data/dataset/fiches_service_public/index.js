#!/usr/bin/env node
const fiches = require("@socialgouv/fiches-vdd");
const filter = require("./filter");
const format = require("./format");

const TYPES = ["particuliers", "professionnels", "associations"];

const fullFiches = [].concat(
  ...TYPES.map(type =>
    fiches[type]
      .filter(id => id.match(/F[0-9]+/))
      .map(id => fiches.getFiche(type, id))
  )
);

const filteredFiches = filter(fullFiches);
const formatedFiches = filteredFiches.map(format).filter(Boolean);

if (module === require.main) {
  console.log(JSON.stringify(formatedFiches, null, 2));
}
