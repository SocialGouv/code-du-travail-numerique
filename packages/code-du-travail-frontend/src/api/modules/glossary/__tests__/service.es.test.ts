/** @jest-environment node */

import { getGlossary } from "../service";

describe("Glossary", () => {
  it("getGlossary", async () => {
    const result = await getGlossary();
    expect(result).toMatchSnapshot();
  });
});
