const fs = require("fs");
const path = require("path");
const JSDOM = require("jsdom").JSDOM;

const { parseDom } = require("../index");

const sample = fs.readFileSync(path.join(__dirname, "article.html")).toString();

test("should parse HTML section", () => {
  const dom = new JSDOM(sample);
  const parsed = parseDom(dom, "http://test.fr");
  expect(parsed).toMatchSnapshot();
});
