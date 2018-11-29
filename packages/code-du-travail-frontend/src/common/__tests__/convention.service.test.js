import { searchIdcc } from "../convention.service";

const results = {
  hits: {
    hits: [{ title: "foo", url: "bar.url" }]
  }
};
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(results)
});

const query = "foo";

describe("feedback service", () => {
  it("should make a request", async () => {
    const results = await searchIdcc(query);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/api\.url\/idcc\?q=foo$/);
    expect(results).toMatchSnapshot();
  });
});
