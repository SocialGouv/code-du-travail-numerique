/** @jest-environment node */

import { fetchHighLights } from "../queries";

describe("Highlights", () => {
  it("fetchHighLights", async () => {
    const result = await fetchHighLights();
    expect(result).toMatchSnapshot();
  });
});
