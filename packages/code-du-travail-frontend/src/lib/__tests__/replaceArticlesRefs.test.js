import { replaceArticlesRefs } from "../replaceArticlesRefs";

const cases = [
  "L2213-2",
  "L. 1242-2",
  "l'Article L2213-2",
  "article R. * 3231-2.",
  "article R-3231-2",
];

describe("replaceArticlesRefs", () => {
  test("Should NOT replace raw L2213-2 in text", () => {
    const html = `Some content with link to L2213-2`;
    expect(replaceArticlesRefs(html)).toMatchSnapshot();
  });
  cases.forEach((t) => {
    test(`Should replace ${t} links in HTML`, () => {
      const html = `Some content and a link to <a href="#whatever">${t}</a> and some other one <a href="#whatelse">${t}</a> and other stuff.`;
      expect(replaceArticlesRefs(html)).toMatchSnapshot();
    });
  });
});
