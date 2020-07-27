// Kept there for documentation purpose
// code used to generate ids for internal content (July 2020)

// import { getEditorialContents } from "../dataset/editorial_content";
// import { getCourriers } from "./dataset/courrier-type";
// import { thematicFiles } from "../dataset/dossiers";

import { v4 as uuidv4 } from "uuid";

// const data = require("./dataset/courrier-type/courriers.json");
// const data = require("./dataset/editorial_content/contents.json");
// import { thematicFiles as data } from "./dataset/dossiers";

const data = require("./dataset/tools/externals.json");

const dataWithId = data.map(({ ...elements }) => ({
  ...elements,
  id: uuidv4(),
}));

console.log(JSON.stringify(dataWithId, null, 2));
