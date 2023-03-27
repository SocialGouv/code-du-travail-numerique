import { getDossiers } from "../service";

describe("Dossiers", () => {
  it("getDossiers", async () => {
    const result = await getDossiers(
      "aides-et-accompagnement-embauche-et-perennisation-des-emplois"
    );
    expect(result).toMatchSnapshot();
  });
});
