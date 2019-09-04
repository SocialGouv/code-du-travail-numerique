jest.mock(
  "@cdt/data...datafiller/prequalified.data.json",
  () => [
    {
      refs: [
        {
          _source: {
            source: "faq",
            title: "title1",
            slug: "slug1"
          }
        }
      ],
      theme: "theme1",
      title: "title1",
      variants: ["known-query1", "known-query2"]
    },
    {
      refs: [
        {
          _source: {
            anchor: "#anchor2",
            source: "source2",
            title: "title2",
            slug: "slug2",
            url: "url2"
          }
        },
        {
          _source: {
            title: "title3",
            url: "url3",
            source: "source3",
            slug: "slug3"
          }
        }
      ],
      theme: "theme2",
      title: "title4",
      answer: "answer1",
      variants: ["known-query3", "known-query4"]
    }
  ],
  { virtual: true }
);

const getSavedResult = require("../search/search.getSavedResult");

it("should return result for some variant", () => {
  expect(getSavedResult("known-query4")).toMatchSnapshot();
});

it("should not return when no match", () => {
  expect(getSavedResult("unknown-query")).toMatchSnapshot();
});

it("should exclude sources", () => {
  expect(getSavedResult("known-query3", ["source3"])).toMatchSnapshot();
});
