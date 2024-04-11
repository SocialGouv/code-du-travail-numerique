import {
  getAllInternalTools,
  getToolsBySlugs,
  getToolsByIds,
  getAllTools,
} from "../service";

describe("Tools", () => {
  it("getAllTools", async () => {
    const result = await getAllInternalTools();
    expect(result).toMatchSnapshot();
  });

  it("getToolsByIds", async () => {
    const result = await getToolsByIds(["1eea193273"]);
    expect(result).toMatchSnapshot();
  });

  it("getBySlugTools", async () => {
    const result = await getToolsBySlugs("indemnite-licenciement");
    expect(result).toMatchSnapshot();
  });
  it("getToolsByIdsAndSlugs", async () => {
    const result = await getAllTools();
    expect(result).toMatchSnapshot();
  });
});
