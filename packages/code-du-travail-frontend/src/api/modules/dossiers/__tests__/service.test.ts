import { getDossiers } from "../service";

describe("Dossiers", () => {
  it("getDossiers", async () => {
    const result = await getDossiers(
      "ministere-du-travail-notre-dossier-sur-le-coronavirus"
    );
    expect(result).toMatchSnapshot();
  });
});
