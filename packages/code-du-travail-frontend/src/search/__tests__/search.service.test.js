import fetch from "isomorphic-unfetch";
import { fetchSearchResults, fetchSuggestResults } from "../search.service";

import { fetchResponse } from "../../../test/mockFetch";

jest.mock("isomorphic-unfetch");

const results = ["test", "doesn't matter"];
const query = "foo";

fetch.mockImplementation(() => {
  return Promise.resolve(fetchResponse(results));
});

describe("suggest service", () => {
  it("should not make a request until debounce time is ellapsed", () => {
    fetchSuggestResults("bar");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("should make a request unless debounce time is ellapsed", async () => {
    const fetchResults = await fetchSuggestResults(query);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch("suggest.url/suggest?q=foo");
    expect(fetchResults).toEqual(results);
  });
  it("should make a request once", async () => {
    await fetchSuggestResults(query);
    const fetchResults = await fetchSuggestResults(query);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch("suggest.url/suggest?q=foo");
    expect(fetchResults).toEqual(results);
  });
});
describe("search service", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it("should make a request once", async () => {
    fetchSearchResults(query);
    const fetchResults = await fetchSearchResults(query);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /api\.url\/search\?q=foo&excludeSources=$/
    );
    expect(fetchResults).toEqual(results);
  });
});
