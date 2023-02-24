import { getBySlugHighlights } from "../service";

describe("Highlights", () => {
  it("getBySlugHighlights", async () => {
    const result = await getBySlugHighlights("homepage");
    expect(result).toMatchSnapshot();
  });
});
