import { searchAddress } from "../adresse.service";

const data = {
  features: [
    {
      properties: { name: "foo", city: "bar", postcode: 42 }
    }
  ]
};
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(data)
});

describe("adresse service", () => {
  it("should make a request", async () => {
    const results = await searchAddress("foo");
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /api-adresse\.data\.gouv\.fr\/search\/\?q=foo&type=housenumber&limit=5$/
    );
    expect(results).toMatchSnapshot();
  });
});
