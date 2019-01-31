const { tags, dumpTags, extractTags } = require("./index");

jest.mock("../faq.json", () => require("./file.mock.json"));
jest.mock("../faq-contributions.json", () => require("./file2.mock.json"));

test("it should export tags as an map", () => {
  expect(tags).toMatchSnapshot();
});

test("it extract tags", () => {
  const dump = extractTags("./file.mock.json");
  expect(dump).toMatchSnapshot();
});

test("it print tags to markdown", () => {
  const dump = dumpTags(extractTags("./file.mock.json"));
  expect(dump).toMatchSnapshot();
});
