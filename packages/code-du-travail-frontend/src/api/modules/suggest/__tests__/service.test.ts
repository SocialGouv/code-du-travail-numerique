import { getSuggestions } from "../service";

describe("Suggestions", () => {
  describe("getSuggestions", () => {
    it("should return an empty array if query is too short", async () => {
      const result = await getSuggestions("r");
      expect(result).toMatchSnapshot();
    });
    it("should work with re", async () => {
      const result = await getSuggestions("re");
      expect(result).toMatchSnapshot();
    });

    it("should return the same with ré", async () => {
      const result = await getSuggestions("ré");
      expect(result).toMatchSnapshot();
    });
  });
});
