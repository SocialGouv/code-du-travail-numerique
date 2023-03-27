import { getIdccByQuery } from "../service";

describe("IDCC", () => {
  it("getIdccByQuery", async () => {
    const result = await getIdccByQuery("1234");
    expect(result).toMatchSnapshot();
  });
});
