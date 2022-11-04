import router from "../sheets-mt";
const request = require("supertest");
const Koa = require("koa");
require("./__mocking__/mockNLP");
jest.mock("@socialgouv/cdtn-elasticsearch");
const app = new Koa();
app.use(router.routes());
test("return content data for slug 5-questions-reponses-sur-la-sante-au-travail", async ()=>{
    const response = await request(app.callback()).get(`/api/v1/sheets-mt/5-questions-reponses-sur-la-sante-au-travail`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
});
test("returns 404 when slug match no themes", async ()=>{
    const response = await request(app.callback()).get(`/api/sheets-mt/no-pasa-nada`);
    expect(response.status).toBe(404);
});

//# sourceMappingURL=sheets-mt.test.js.map