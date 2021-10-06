"use strict";
var _v = require("../v1.prefix");

test("prefix", async () => {
  jest.mock("../../../package.json", () => ({
    dependencies: { "@socialgouv/cdtn-elasticsearch": "^1.2.3" },
  }));
  expect(_v.CDTN_ADMIN_VERSION).toBe("v1");
});
