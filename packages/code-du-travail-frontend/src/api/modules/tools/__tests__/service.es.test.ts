/** @jest-environment node */

import { getBySlugTools } from "../service";

describe("Tools", () => {
  it("getBySlugTools", async () => {
    const result = await getBySlugTools("indemnite-licenciement");
    expect(result).toMatchSnapshot();
  });
});
