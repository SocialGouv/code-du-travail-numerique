import {
  searchAddress,
  searchAnnuaireByQuery,
  searchAnnuaireByCoord
} from "../adresse.service";
import getConfig from "next/config";
import { mockFetch } from "../../../test/mockFetch";

const {
  publicRuntimeConfig: { API_ADDRESS, API_URL }
} = getConfig();

const addressData = {
  features: [
    {
      properties: { name: "foo", city: "bar", postcode: 42 }
    }
  ]
};
const apiData = {
  hits: {
    hits: [
      {
        _source: {
          title: "han yolo"
        }
      }
    ]
  }
};

const query = "foo";
const lon = "lon";
const lat = "lat";
const coord = {
  lon,
  lat
};

describe("adresse service", () => {
  test("searchAddress: should make a request on api-adresse", async () => {
    mockFetch(Promise.resolve(addressData));
    const results = await searchAddress(query);
    const apiMatcher = new RegExp(
      `${API_ADDRESS}\\/\\?q=${query}&type=housenumber&limit=5$`
    );
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(apiMatcher);
    expect(results).toMatchSnapshot();
  });
  test("searchAnnuaireByQuery: should make a request on api with query", async () => {
    mockFetch(Promise.resolve(apiData));
    const results = await searchAnnuaireByQuery(query);
    const apiMatcher = new RegExp(
      `${API_URL}\\/annuaire\\/search\\?q=${query}$`
    );
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(apiMatcher);
    expect(results).toMatchSnapshot();
  });
  test("searchAnnuaireByCoord: should make a request on api with coord", async () => {
    mockFetch(Promise.resolve(apiData));
    const results = await searchAnnuaireByCoord(coord);
    const apiMatcher = new RegExp(
      `${API_URL}\\/annuaire\\/search\\?coord=${lon}:${lat}$`
    );
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(apiMatcher);
    expect(results).toMatchSnapshot();
  });
});
