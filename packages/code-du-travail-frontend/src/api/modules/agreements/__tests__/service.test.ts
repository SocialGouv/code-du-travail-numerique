import {
  getAllAgreements,
  getByIdsAgreements,
  getBySlugAgreements,
  getBySlugsAgreements,
} from "../service";

describe("Agreements", () => {
  it("getAllAgreements", async () => {
    const result = await getAllAgreements();
    expect(result).toMatchSnapshot();
  });
  it("getBySlugsAgreements", async () => {
    const result = await getBySlugsAgreements([
      "843-boulangerie-patisserie-entreprises-artisanales",
    ]);
    expect(result).toMatchSnapshot();
  });

  it("getByIdsAgreements", async () => {
    const result = await getByIdsAgreements(["647c224c9b"]);
    expect(result).toMatchSnapshot();
  });

  it("getBySlugAgreements", async () => {
    const result = await getBySlugAgreements(
      "843-boulangerie-patisserie-entreprises-artisanales"
    );
    expect(result).toMatchSnapshot();
  });
});
