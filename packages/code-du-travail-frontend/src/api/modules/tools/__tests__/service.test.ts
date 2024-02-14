import {
  getAllTools,
  getBySlugTools,
  getToolsByIds,
  getToolsByIdsAndSlugs,
  getToolsBySlugs,
} from "../service";

describe("Tools", () => {
  it("getAllTools", async () => {
    const result = await getAllTools();
    expect(result).toMatchSnapshot();
  });
  it("getToolsBySlugs", async () => {
    const result = await getToolsBySlugs(["preavis-demission"]);
    expect(result).toMatchSnapshot();
  });

  it("getToolsByIds", async () => {
    const result = await getToolsByIds(["1eea193273"]);
    expect(result).toMatchSnapshot();
  });

  it("getBySlugTools", async () => {
    const result = await getBySlugTools("indemnite-licenciement");
    expect(result).toMatchSnapshot();
  });
  it("getToolsByIdsAndSlugs", async () => {
    const result = await getToolsByIdsAndSlugs();
    expect(result).toMatchSnapshot();
  });
});
