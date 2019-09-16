const { getExcludeSources } = require("../index");

test("getExcludeSources should return empty array if value is empty", () => {
  expect(getExcludeSources("")).toMatchSnapshot();
});

test("getExcludeSources should return all sources execpt one that match value", () => {
  expect(getExcludeSources("faq")).toMatchSnapshot();
});
