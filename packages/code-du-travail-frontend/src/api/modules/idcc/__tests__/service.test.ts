import { getCCByIdcc, getIdccByQuery } from "../service";

describe("IDCC", () => {
  it("getIdccByQuery", async () => {
    const result = await getIdccByQuery("banque");
    expect(result).toMatchSnapshot();
  });

  describe("getCCByIdcc",  () => {
    it("returns nothing is does not exists", async () => {
      const result = await getCCByIdcc("9999");
      expect(result).toEqual(undefined);
    });
    it("returns the matching CC", async () => {
      const result = await getCCByIdcc("0044");
      expect(result.num).toEqual(44);
      expect(result.title).toEqual("Convention collective nationale des industries chimiques et connexes du 30 décembre 1952. Étendue par arrêté du 13 novembre 1956 JONC 12 décembre 1956");
      expect(result.shortTitle).toEqual("Industries chimiques et connexes");
    });
  });
});
