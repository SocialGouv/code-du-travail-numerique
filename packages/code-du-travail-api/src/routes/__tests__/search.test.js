import router from "../search";

const request = require("supertest");
const Koa = require("koa");
const { SOURCES } = require("@socialgouv/cdtn-utils");

const getSearchBody = require("../search/search.elastic");
const getSemBody = require("../search/search.sem");

require("./__mocking__/mockNLP");

jest.mock("@socialgouv/cdtn-elasticsearch");

const app = new Koa();
app.use(router.routes());

it("asks same sources wether it is search sem or search elastic and gets a description", () => {
  const searchBody = getSearchBody({ sources: [SOURCES.CDT] });
  const semBody = getSemBody({ sources: [SOURCES.CDT] });
  expect(searchBody._source).toEqual(semBody._source);
  expect(searchBody._source).toContain("description");
});

// it("returns search results for demission from prequalified requests", async () => {
//   const response = await request(app.callback()).get(
//     "/api/v1/search?q=démission"
//   );
//   expect(response.status).toBe(200);
//   expect(response.body).toMatchSnapshot(); // prequalified results completed by ES results
// });

it("returns 3 search results for demission from elastic if size = 3", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission&skipSavedResults&size=3"
  );
  expect(response.status).toBe(200);
  expect(response.body.documents.length).toBe(3);
});

// it("returns search results for demission from elastic", async () => {
//   const response = await request(app.callback()).get(
//     "/api/v1/search?q=démission&skipSavedResults"
//   );
//   expect(response.status).toBe(200);
//   expect(response.body).toMatchSnapshot();
// });

// it("returns article results when searching article R1225-18", async () => {
//   const response = await request(app.callback()).get(
//     `/api/v1/search?q=r1225-18`
//   );
//   expect(response.status).toBe(200);
//   expect(response.body).toMatchSnapshot();
// });
// it("returns unique documents from prequalified data (same slug but different source)", async () => {
//   const response = await request(app.callback()).get(
//     `/api/v1/search?q=certificat de travail`
//   );
//   expect(response.status).toBe(200);
//   expect(response.body).toMatchSnapshot();
// });

// it("return conventions", async () => {
//   const response = await request(app.callback()).get(
//     `/api/v1/search?q=boulangerie`
//   );
//   expect(response.status).toBe(200);
//   expect(response.body).toMatchSnapshot();
// });
