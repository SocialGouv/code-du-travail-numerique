import { searchWithQuery } from "../service";

describe("Search", () => {
  it("searchWithQuery", async () => {
    const result = await searchWithQuery("démission", false);
    expect(result).toMatchSnapshot();
  });
});
