/** @jest-environment node */

import { getBySourceAndSlugItems } from "../service";

describe("Items", () => {
  it("getBySourceAndSlugItems", async () => {
    const result = await getBySourceAndSlugItems(
      "fiches_service_public",
      "demission-dun-salarie",
    );
    expect(result).toMatchSnapshot();
  });
});
