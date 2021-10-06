"use strict";
const { vectorizeQuery } = require("@socialgouv/cdtn-elasticsearch");
const {
  santeVector,
  demissionVector,
  r122518Vector,
  demissionSalarie,
} = require("./vectors");
// mock fetch function to return vector for démission
jest.mock("@socialgouv/cdtn-elasticsearch");
vectorizeQuery.mockImplementation((req) => {
  let data;
  switch (req) {
    case "d\xE9mission":
      data = demissionVector;
      break;
    case "5 questions/r\xE9ponses sur la sant\xE9 au travail":
      data = santeVector;
      break;
    case "d\xE9mission d'un salari\xE9":
      data = demissionSalarie;
      break;
    default:
      data = r122518Vector;
      break;
  }
  return Promise.resolve(data);
});
