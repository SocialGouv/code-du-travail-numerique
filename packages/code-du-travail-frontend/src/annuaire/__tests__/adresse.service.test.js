import { searchAddress } from "../adresse.service";
import getConfig from "next/config";

import fetch from "isomorphic-unfetch";
import { fetchResponse } from "../../../test/mockFetch";

jest.mock("isomorphic-unfetch");

const {
  publicRuntimeConfig: { API_ADDRESS }
} = getConfig();

const addressData = {
  features: [
    {
      properties: { name: "foo", city: "bar", postcode: 42 }
    }
  ]
};

const query = "foo";

describe("adresse service", () => {
  test("searchAddress: should make a request on api-adresse", async () => {
    fetch.mockResolvedValue(fetchResponse(addressData));
    const results = await searchAddress(query);
    const apiMatcher = new RegExp(
      `${API_ADDRESS}\\/\\?q=${query}&type=housenumber&limit=5$`
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(apiMatcher);
    expect(results).toMatchSnapshot();
  });
});
