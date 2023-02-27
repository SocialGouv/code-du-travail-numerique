import {
  getAllModeles,
  getByIdsModeles,
  getBySlugModeles,
  getBySlugsModeles,
} from "../service";

describe("Modeles", () => {
  it("getAllModeles", async () => {
    const result = await getAllModeles();
    expect(result).toMatchSnapshot();
  });
  it("getBySlugsModeles", async () => {
    const result = await getBySlugsModeles([
      "demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle",
    ]);
    expect(result).toMatchSnapshot();
  });

  it("getByIdsModeles", async () => {
    const result = await getByIdsModeles(["a712ecb976"]);
    expect(result).toMatchSnapshot();
  });

  it("getBySlugModeles", async () => {
    const result = await getBySlugModeles(
      "demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle"
    );
    expect(result).toMatchSnapshot();
  });
});
