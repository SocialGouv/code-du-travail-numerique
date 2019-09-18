jest.mock(
  "@cdt/data...datafiller/prequalified.data.json",
  () => [
    {
      refs: [
        {
          title: "title1",
          url: "/faq/slug1"
        }
      ],
      theme: "theme1",
      title: "title1",
      variants: ["known-query1", "known-query2"]
    },
    {
      refs: [
        {
          title: "title2",
          url: "/fiche-service-public/slug2"
        },
        {
          title: "title3",
          url: "/code-du-travail/url3"
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

it("should return result for some variant", async () => {
  expect(await getSavedResult("known-query4")).toMatchSnapshot();
});

it("should not return when no match", async () => {
  expect(await getSavedResult("unknown-query")).toMatchSnapshot();
});

it("should exclude sources", async () => {
  expect(await getSavedResult("known-query3", ["source3"])).toMatchSnapshot();
});
