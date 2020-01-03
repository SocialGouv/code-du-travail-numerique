import { replaceArticlesRefs } from "../replaceArticlesRefs";

describe("replaceArticlesRefs", () => {
  test("Should NOT replace L2213-2 in text", () => {
    const html = `Some content with linke to L2213-2`;
    expect(replaceArticlesRefs(html)).toMatchSnapshot();
  });
  test("Should replace L2213-2 link in HTML", () => {
    const html = `Some content with links to <a href="#1">Article L2213-2</a>.`;
    expect(replaceArticlesRefs(html)).toMatchSnapshot();
  });
  test("Should replace l'article L. 1242-2 link in HTML", () => {
    const html = `Some content with links to <a href="#1">l'article L. 1242-2</a>.`;
    expect(replaceArticlesRefs(html)).toMatchSnapshot();
  });
  test("Should replace l'Article L2213-2 links in HTML", () => {
    const html = `Some content with links to <a href="#1">l'Article L2213-2</a>.`;
    expect(replaceArticlesRefs(html)).toMatchSnapshot();
  });
  test("Should replace multiple articles links in HTML", () => {
    const html = `Some content with links to <a href="#1">Article L2213-2</a> and <a href="#2">L.2312-1</a>`;
    expect(replaceArticlesRefs(html)).toMatchSnapshot();
  });
});
