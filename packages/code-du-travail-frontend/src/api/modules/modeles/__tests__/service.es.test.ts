/** @jest-environment node */

import { getAllModeles, getByIdsModeles } from "../service";

describe("Modeles", () => {
  it("getAllModeles", async () => {
    const result = await getAllModeles();
    expect(result).toMatchSnapshot();
  });
  it("getByIdsModeles", async () => {
    const result = await getByIdsModeles(["a712ecb976"]);
    expect(result).toMatchSnapshot();
  });
});
