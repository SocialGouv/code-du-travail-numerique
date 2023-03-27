import { getIdccByQuery } from "../service";

describe("IDCC", () => {
  it("getIdccByQuery", async () => {
    const result = await getIdccByQuery("27");
    expect(result).toMatchSnapshot();
  });
});
