/** @jest-environment node */

import { searchWithQuery } from "../service";

describe("Search", () => {
  it("searchWithQuery", async () => {
    const result = await searchWithQuery("démission", 25, true);
    expect(result).toMatchSnapshot();
  });
});
