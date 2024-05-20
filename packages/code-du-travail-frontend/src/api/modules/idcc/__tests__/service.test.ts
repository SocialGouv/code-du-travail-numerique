/** @jest-environment node */

import { getIdccByQuery } from "../service";

describe("IDCC", () => {
  it("getIdccByQuery", async () => {
    const result = await getIdccByQuery("banque");
    expect(result).toMatchSnapshot();
  });
});
