const { isFixableUrl, getVariants, sortByKey } = require("../utils");

// isFixableUrl

it("isFixableUrl should try to fix fiches SP url", () => {
  expect(isFixableUrl("/fiche-service-public/hello")).toEqual(true);
});

it("isFixableUrl should try to fix fiches MT url", () => {
  expect(isFixableUrl("/fiche-ministere-travail/hello")).toEqual(true);
});

it("isFixableUrl should not try to fix random url", () => {
  expect(isFixableUrl("/hello/world")).toEqual(false);
});

it("isFixableUrl should not try to fix cdt url", () => {
  expect(isFixableUrl("/code-du-travail/l1134-4")).toEqual(false);
});

// getVariants

it("getVariants should split lines", () => {
  expect(
    getVariants({
      title: "title",
      variants: `line1
line2
line3`
    })
  ).toEqual(["title", "line1", "line2", "line3"]);
});

it("getVariants should handle no variants", () => {
  expect(
    getVariants({
      title: "title",
      variants: null
    })
  ).toEqual(["title"]);
});

it("getVariants should handle no variants", () => {
  expect(
    getVariants({
      title: "title",
      variants: ""
    })
  ).toEqual(["title"]);
});

it("getVariants should trim texts", () => {
  expect(
    getVariants({
      title: " title ",
      variants: `     page
          page2 `
    })
  ).toEqual(["title", "page", "page2"]);
});

it("getVariants should handle no variants", () => {
  expect(
    getVariants({
      title: "",
      variants: ""
    })
  ).toEqual([]);
});

it("getVariants should handle no variants", () => {
  expect(
    getVariants({
      title: null,
      variants: null
    })
  ).toEqual([]);
});

it("getVariants should handle no variants", () => {
  expect(
    getVariants({
      title: null,
      variants: null
    })
  ).toEqual([]);
});

// sortByKey

const dict1 = [
  {
    a: 1,
    b: 3,
    c: "r1234-5"
  },
  { a: 277, b: 1, c: "r1234-2" },
  { a: 32, b: 12, c: "r223" },
  { a: 28, b: 0, c: "r1235" }
];

it("sortByKey should sort by integer key", () => {
  expect(dict1.sort(sortByKey("a"))).toMatchSnapshot();
});

it("sortByKey should sort by integer key", () => {
  expect(dict1.sort(sortByKey("b"))).toMatchSnapshot();
});

it("sortByKey should sort by string key", () => {
  expect(dict1.sort(sortByKey("c"))).toMatchSnapshot();
});
