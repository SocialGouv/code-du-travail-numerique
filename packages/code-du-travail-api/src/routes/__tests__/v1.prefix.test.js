const { CDTN_ADMIN_VERSION } = require("../v1.prefix");

test("prefix", async () => {
  jest.mock("../../../../package.json", () => ({
    dependencies: { "@socialgouv/cdtn-elasticsearch": "^1.2.3" },
  }));
  expect(CDTN_ADMIN_VERSION).toBe("v1");
});
