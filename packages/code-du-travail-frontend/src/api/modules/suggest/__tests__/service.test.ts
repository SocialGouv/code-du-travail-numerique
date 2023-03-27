import { getSuggestions } from "../service";

describe("Suggestions", () => {
  it("getSuggestions", async () => {
    const result = await getSuggestions("ré");
    expect(result).toMatchSnapshot();
  });
});
