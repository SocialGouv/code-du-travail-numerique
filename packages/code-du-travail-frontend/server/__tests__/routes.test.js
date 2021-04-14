const request = require("supertest");

const mockNextApp = {
  getRequestHandler: () => {
    return ({ res }) => {
      res.json({ success: true });
    };
  },
};

beforeEach(async () => {
  jest.resetModules();
});

jest.mock(
  "../redirects.json",
  () => [
    {
      baseUrl: "/path/to/original",
      code: 303,
      redirectUrl: "/path/to/destination",
    },
  ],
  { virtual: true }
);

describe("/IS_PRODUCTION_DEPLOYMENT=true", () => {
  let app;
  beforeEach(async () => {
    process.env.IS_PRODUCTION_DEPLOYMENT = true;
    process.env.PROD_HOSTNAME = "prod-test-hostname";
    const { getKoaServer } = require("../koaServer");
    app = await getKoaServer({ nextApp: mockNextApp });
  });
  afterEach(() => {
    process.env.IS_PRODUCTION_DEPLOYMENT = undefined;
    process.env.PROD_HOSTNAME = undefined;
  });
  it("should return production robots.txt", async () => {
    const response = await request(app.callback()).get("/robots.txt");
    expect(response.text).toMatchSnapshot();
  });
  it("should NOT set noindex header", async () => {
    const response = await request(app.callback()).get("/robots.txt");
    expect(response.headers["x-robots-tag"]).toBe(undefined);
  });

  it("should return health probe", async () => {
    const response = await request(app.callback()).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual("up and running");
  });
});

describe("/IS_PRODUCTION_DEPLOYMENT=false", () => {
  let app;
  beforeEach(async () => {
    process.env.IS_PRODUCTION_DEPLOYMENT = false;
    const { getKoaServer } = require("../koaServer");
    app = await getKoaServer({ nextApp: mockNextApp });
  });
  afterEach(() => {
    process.env.IS_PRODUCTION_DEPLOYMENT = undefined;
  });
  it("should return dev robots.txt", async () => {
    const response = await request(app.callback()).get("/robots.txt");
    expect(response.text).toMatchSnapshot();
  });
  it("should set noindex header", async () => {
    const response = await request(app.callback()).get("/robots.txt");
    expect(response.headers["x-robots-tag"]).toEqual(
      "noindex, nofollow, nosnippet"
    );
  });
  it("should return health probe", async () => {
    const response = await request(app.callback()).get("/health");
    expect(response.body.status).toEqual("up and running");
  });
});

describe("/NODE_ENV=production", () => {
  let app;
  beforeEach(async () => {
    process.env.NODE_ENV = "production";
    const { getKoaServer } = require("../koaServer");
    app = await getKoaServer({ nextApp: mockNextApp });
  });
  afterEach(() => {
    process.env.NODE_ENV = undefined;
  });
  it("should set production CSP", async () => {
    const response = await request(app.callback()).get("/health");
    expect(response.status).toBe(200);
    expect(response.headers["content-security-policy"]).toMatchSnapshot();
  });
});

describe("/NODE_ENV=*", () => {
  let app;
  beforeEach(async () => {
    process.env.NODE_ENV = "test";
    const { getKoaServer } = require("../koaServer");
    app = await getKoaServer({ nextApp: mockNextApp });
  });
  afterEach(() => {
    process.env.NODE_ENV = undefined;
  });
  it("should set dev CSP", async () => {
    const response = await request(app.callback()).get("/health");
    expect(response.status).toBe(200);
    expect(
      response.headers["content-security-policy-report-only"]
    ).toMatchSnapshot();
  });
});

describe("redirects", () => {
  let app;
  beforeEach(async () => {
    const { getKoaServer } = require("../koaServer");
    app = await getKoaServer({ nextApp: mockNextApp });
  });
  afterEach(() => {});
  it("should redirect from redirects.json", async () => {
    const response = await request(app.callback()).get("/path/to/original");
    expect(response.status).toBe(303);
    expect(response.headers["location"]).toEqual("/path/to/destination");
  });
});
