jest.mock("../../../../package.json", () => ({
  dependencies: { "@socialgouv/cdtn-elasticsearch": "^1.2.3" },
}));

beforeEach(() => {
  jest.resetModules();
});
describe("with ES_INDEX_PREFIX = cdtn-master", () => {
  test("prefix on branch shoulb be empty", () => {
    process.env.ES_INDEX_PREFIX = "cdtn-master";
    const { CDTN_ADMIN_VERSION } = require("../v1.prefix");
    expect(CDTN_ADMIN_VERSION).toBe("");
  });
});
describe("with ES_INDEX_PREFIX = cdtn-prod", () => {
  test("prefix should include version", () => {
    process.env.ES_INDEX_PREFIX = "cdtn-prod";
    const { CDTN_ADMIN_VERSION } = require("../v1.prefix");
    expect(CDTN_ADMIN_VERSION).toBe("-v1");
  });
});
describe("with ES_INDEX_PREFIX = cdtn-preprod", () => {
  test("prefix prefix should include version", () => {
    process.env.ES_INDEX_PREFIX = "cdtn-prod";
    const { CDTN_ADMIN_VERSION } = require("../v1.prefix");
    expect(CDTN_ADMIN_VERSION).toBe("-v1");
  });
});

afterEach(() => {
  delete process.env.ES_INDEX_PREFIX;
});
