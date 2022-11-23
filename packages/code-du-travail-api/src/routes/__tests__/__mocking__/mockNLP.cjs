const { vectorizeQuery } = require("@socialgouv/cdtn-elasticsearch");
const {
  santeVector,
  demissionVector,
  r122518Vector,
  demissionSalarie,
} = require("./vectors");

// mock fetch function to return vector for démission
jest.mock("@socialgouv/cdtn-elasticsearch");
vectorizeQuery.mockImplementation(async (req) => {
  let data = null;
  switch (req) {
    case "démission":
      data = demissionVector;
      break;
    case "5 questions/réponses sur la santé au travail":
      data = santeVector;
      break;
    case "démission d'un salarié":
      data = demissionSalarie;
      break;
    default:
      data = r122518Vector;
      break;
  }

  return Promise.resolve(data);
});
