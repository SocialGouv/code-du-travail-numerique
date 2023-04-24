import {
  getGenericContributions,
  getBySlugsContributions,
  getByIdsContributions,
  getAllContributions,
} from "../service";

describe("Contributions", () => {
  it("getGenericContributions", async () => {
    const result = await getGenericContributions();
    expect(result).toMatchSnapshot();
  });
  it("getBySlugsContributions", async () => {
    const result = await getBySlugsContributions([
      "les-conges-pour-evenements-familiaux",
    ]);
    expect(result).toMatchSnapshot();
  });

  it("getByIdsContributions", async () => {
    const result = await getByIdsContributions(["eba7a4592f"]);
    expect(result).toMatchSnapshot();
  });

  it("getAllContributions", async () => {
    const result = await getAllContributions();
    expect(result).toMatchSnapshot();
  });
});
