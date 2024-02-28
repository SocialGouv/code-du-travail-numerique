import { getAll, getBySourceAndSlugItems } from "../service";

describe("Items", () => {
  it("getBySourceAndSlugItems", async () => {
    const result = await getBySourceAndSlugItems(
      "fiches_service_public",
      "demission-dun-salarie"
    );
    expect(result).toMatchSnapshot();
  });

  it("getAll", async () => {
    const result = await getAll(
      "https://www.service-public.fr/particuliers/vosdroits/F2883"
    );
    expect(result).toMatchSnapshot();
  });
});
