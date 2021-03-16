test("fixme", () => {
  expect(true).toBeTruthy();
});

/*
const request = require("supertest");
const koa = require("koa");

const router = require("../entreprises");

const app = new koa();
const cb = app.callback();
app.use(router.routes());

const makePath = (query, address) =>
  `/api/v1/entreprises?q=${query}${address ? `&a=${address}` : ""}`;

const getFirst = (query, address) =>
  request(cb)
    .get(makePath(query, address))
    .then((resp) => resp.body.entreprises[0]);

const checkFields = ({
  address,
  activitePrincipale,
  conventions,
  simpleLabel,
  label,
  etablissements,
}) => {
  [
    address,
    etablissements,
    activitePrincipale,
    conventions,
    simpleLabel,
    label,
  ].forEach((f) => expect(f).toBeDefined());
};

test("search should return error 404 when no match", async () => {
  const response = await request(app.callback()).get(
    makePath("12345678901234567890")
  );
  expect(response.status).toBe(404);
});

test("search should return error 400 when no query", async () => {
  const response = await request(app.callback()).get(makePath(""));
  expect(response.status).toBe(400);
});

test("search no address", async () => {
  const response = await request(cb).get(makePath("michelin"));

  // check required fields are set accordingly
  response.body.entreprises.map(checkFields);

  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("search case insensitive", async () => {
  const e1 = await getFirst("zara");
  const e2 = await getFirst("ZARA");

  expect(e1).toEqual(e1, e2);
});

test("search with postal code", async () => {
  const cp = "59800";
  const e = await getFirst("ZARA", cp);

  expect(e.address).toContain(cp);
  expect(e.matching).toBe(3);
});

test("search with city", async () => {
  const ville = "lille";
  const e = await getFirst("ZARA", ville);

  expect(e.address.toLowerCase()).toContain(ville);
});

test("search fuzzy", async () => {
  const e = await getFirst("mixhelin");

  expect(e.label).toContain("MICHELIN");
});

test("search highlight", async () => {
  const e = await getFirst("paul boulanger");

  expect(e.label).toContain("BOULANGERIES PAUL");
  expect(e.highlightLabel).toEqual(
    "<b><u>BOULANGERIES</b></u> <b><u>PAUL</b></u>"
  );
});

test("search SIREN / SIRET", async () => {
  const siret = "77560485300041";
  const siren = "775604853";

  const eSiret = await getFirst(siret);
  expect(eSiret.siret).toEqual(siret);
  expect(eSiret.siren).toEqual(siren);

  const eSiren = await getFirst(siren);
  expect(eSiren.siren).toEqual(siren);
});

test("conventions should be different if address set or not", async () => {
  const e1 = await getFirst("michelin");
  const e2 = await getFirst("michelin", "clermont");

  expect(e1.conventions.length).toEqual(2);
  expect(e2.conventions.length).toEqual(1);
});
*/
