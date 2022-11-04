import router from "../themes";
const request = require("supertest");
const Koa = require("koa");
const app = new Koa();
app.use(router.routes());
test("return themes root themes", async ()=>{
    const response = await request(app.callback()).get(`/api/v1/themes`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
});
test("return theme data for slug depart-de-lentreprise", async ()=>{
    const response = await request(app.callback()).get(`/api/v1/themes/depart-de-lentreprise`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
});
test("returns 404 when slug match no themes", async ()=>{
    const response = await request(app.callback()).get(`/api/v1/themes/slug`);
    expect(response.status).toBe(404);
});

//# sourceMappingURL=themes.test.js.map