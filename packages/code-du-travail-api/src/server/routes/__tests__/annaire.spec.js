const request = require("supertest");
const Koa = require("koa");

const router = require("../annuaire");
const addresses = require("./api-adresse.mock.json");

jest.mock("node-fetch", () => ({ default: jest.fn() }));
const fetch = require("node-fetch").default;

const app = new Koa();
app.use(router.routes());

test("should return all the records around avignon", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/annuaire/search?coord=${addresses.coord.avignon}`
  );
  expect(response.status).toBe(200);
  expect(fetch).not.toHaveBeenCalled();
  expect(response.body.hits).toMatchSnapshot();
});

test("should return all the records around loriol", async () => {
  fetch.mockResolvedValue({ json: () => addresses.payload });

  const response = await request(app.callback()).get(
    `/api/v1/annuaire/search?q=${addresses.query}`
  );
  expect(response.status).toBe(200);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining(addresses.query));
  expect(response.body.hits).toMatchSnapshot();
});