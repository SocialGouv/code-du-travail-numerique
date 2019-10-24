import { recapSituation } from "../situation";

describe("situations", () => {
  describe("recapSituation", () => {
    it("should render formated criteria", () => {
      const criteria = {
        ancienneté: "23| moins de un an",
        catégorie: "15| Agents de maîtrise"
      };
      expect(recapSituation(criteria)).toMatchSnapshot();
    });
  });
});
