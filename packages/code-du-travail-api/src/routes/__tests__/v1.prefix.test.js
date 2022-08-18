import { CDTN_ADMIN_VERSION } from "../v1.prefix";

jest.mock("../../../package.json", () => ({
  dependencies: { "@socialgouv/cdtn-elasticsearch": "^1.2.3" },
}));
test("prefix", () => {
  expect(CDTN_ADMIN_VERSION).toBe("v1");
});
