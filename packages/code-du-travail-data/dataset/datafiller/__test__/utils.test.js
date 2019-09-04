const {
  slimify,
  isFixableUrl,
  getVariants,
  sortByKey,
  sortRefs
} = require("../utils");

describe("isFixableUrl", () => {
  it("should try to fix fiches SP url", () => {
    expect(isFixableUrl("/fiche-service-public/hello")).toEqual(true);
  });

  it("should try to fix fiches MT url", () => {
    expect(isFixableUrl("/fiche-ministere-travail/hello")).toEqual(true);
  });

  it("should not try to fix random url", () => {
    expect(isFixableUrl("/hello/world")).toEqual(false);
  });

  it("should not try to fix cdt url", () => {
    expect(isFixableUrl("/code-du-travail/l1134-4")).toEqual(false);
  });
});

describe("getVariants", () => {
  it("should split lines", () => {
    expect(
      getVariants({
        title: "title",
        variants: `line1
line2
line3`
      })
    ).toEqual(["title", "line1", "line2", "line3"]);
  });

  it("should handle no variants", () => {
    expect(
      getVariants({
        title: "title",
        variants: null
      })
    ).toEqual(["title"]);
  });

  it("should handle no variants 1", () => {
    expect(
      getVariants({
        title: "title",
        variants: ""
      })
    ).toEqual(["title"]);
  });

  it("should trim texts", () => {
    expect(
      getVariants({
        title: " title ",
        variants: `     page
          page2 `
      })
    ).toEqual(["title", "page", "page2"]);
  });

  it("should handle no variants 2", () => {
    expect(
      getVariants({
        title: "",
        variants: ""
      })
    ).toEqual([]);
  });

  it("should handle no variants 3", () => {
    expect(
      getVariants({
        title: null,
        variants: null
      })
    ).toEqual([]);
  });

  it("should handle no variants 4", () => {
    expect(
      getVariants({
        title: null,
        variants: null
      })
    ).toEqual([]);
  });
});

describe("sortByKey", () => {
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

  it("should sort by integer key", () => {
    expect(dict1.sort(sortByKey("a"))).toMatchSnapshot();
  });

  it("should sort by integer key 2", () => {
    expect(dict1.sort(sortByKey("b"))).toMatchSnapshot();
  });

  it("should sort by string key", () => {
    expect(dict1.sort(sortByKey("c"))).toMatchSnapshot();
  });
});

describe("sortRefs", () => {
  const refs = [
    {
      id: 1,
      url: "/code-du-travail/1",
      relevance: 2
    },
    {
      id: 2,
      url: "/fiche-service-public/2",
      relevance: 2
    },
    {
      id: 3,
      url: "/fiche-service-public/3",
      relevance: 3
    },
    {
      id: 4,
      url: "/code-du-travail/4",
      relevance: 5
    },
    {
      id: 5,
      url: "/code-du-travail/5",
      relevance: 2
    },
    {
      id: 6,
      url: "/external/6",
      relevance: 2
    },
    {
      id: 7,
      url: "/fiche-ministere-travail/7",
      relevance: 5
    }
  ];

  it("sort refs by relevance and source type", () => {
    expect(refs.sort(sortRefs)).toMatchSnapshot();
  });
});

describe("slimify", () => {
  it("should slimify object", () => {
    expect(slimify({ a: 1, b: 2, c: 3, d: 4 }, ["b", "c"])).toEqual({
      b: 2,
      c: 3
    });
  });
});
