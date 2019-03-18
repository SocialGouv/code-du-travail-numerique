import {
  buildIndexMap,
  getIndexesFromIds,
  buildNestedAccessor
} from "../indexMaps";

const rootNode = {
  data: { id: "KALISCTA344" },
  children: [
    {
      data: { id: "KALISCTA455" },
      children: [
        { data: { id: "KALIARTI344" } },
        { data: { id: "KALIARTI999" } }
      ]
    },
    {
      data: { id: "KALISCTA959" },
      children: [{ data: { id: "KALIARTI999" } }]
    },
    { data: { id: "KALIARTI877" } }
  ]
};

const expectedIndexMap = {
  children: {
    KALISCTA455: {
      index: 0,
      children: {
        KALIARTI344: { index: 0 },
        KALIARTI999: { index: 1 }
      }
    },
    KALISCTA959: {
      index: 1,
      children: {
        KALIARTI999: { index: 0 }
      }
    },
    KALIARTI877: { index: 2 }
  }
};

describe("buildIndexMap", () => {
  it("should reformat the rootNode", () => {
    const res = buildIndexMap(rootNode);
    expect(res).toEqual(expectedIndexMap);
  });
});

describe("getIndexesFromIds", () => {
  it("work for nested levels", () => {
    expect(
      getIndexesFromIds(["KALISCTA455", "KALIARTI344"], expectedIndexMap)
    ).toEqual([0, 0]);

    expect(
      getIndexesFromIds(["KALISCTA959", "KALIARTI999"], expectedIndexMap)
    ).toEqual([1, 0]);
  });
  it("should work for first level", () => {
    expect(getIndexesFromIds(["KALIARTI877"], expectedIndexMap)).toEqual([2]);
  });
});

describe("buildNestedAccessor", () => {
  it("works for top level", () => {
    expect(buildNestedAccessor({ visible: true }, [3])).toEqual({
      children: { 3: { visible: true } }
    });
  });
  it("works for nested levels", () => {
    expect(buildNestedAccessor({ visible: true }, [4, 40, 39])).toEqual({
      children: {
        4: {
          children: {
            40: {
              children: {
                39: { visible: true }
              }
            }
          }
        }
      }
    });
  });
});
