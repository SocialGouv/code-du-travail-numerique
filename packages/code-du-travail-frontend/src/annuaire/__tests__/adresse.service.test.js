import { searchAddress } from "../adresse.service";

const results = {
  features: [
    {
      properties: { name: "foo", city: "bar", postcode: 42 }
    }
  ]
};
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(results)
});

const query = "foo";

describe("adresse service", () => {
  it("should make a request", async () => {
    const results = await searchAddress(query);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /api-adresse\.data\.gouv\.fr\/search\/\?q=foo&type=housenumber&limit=5$/
    );
    expect(results).toMatchSnapshot();
  });
});
