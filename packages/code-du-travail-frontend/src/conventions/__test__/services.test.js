import { searchIdcc } from "../services";

describe("convention service", () => {
  it("can search IDCCs", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          hits: {
            hits: [
              {
                title: "Convention des Boulangeries",
                idcc: "3844",
                slug: "3844-convention-des-boulangeries",
                url: "https://legifrance.com/boulangerie"
              }
            ]
          }
        })
    });
    const results = await searchIdcc("foo");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/api\.url\/idcc\?q=foo$/);
    expect(results).toMatchSnapshot();
  });
});
