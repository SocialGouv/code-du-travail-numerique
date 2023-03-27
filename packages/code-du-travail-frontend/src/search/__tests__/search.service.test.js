import { fetchSearchResults, fetchSuggestResults } from "../search.service";

jest.useFakeTimers();
global.fetch = jest.fn();

fetch.mockResolvedValue({
  json: () => Promise.resolve(results),
  ok: true,
});

const results = {
  foo: "bar",
};
const query = "foo";

describe("suggest service", () => {
  it("should not make a request until debounce time is ellapsed", () => {
    fetchSuggestResults("bar");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("should make a request unless debounce time is ellapsed", () => {
    fetchSuggestResults(query);
    jest.runAllTimers();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch("api.url/api/suggest?q=foo");
    expect(results).toMatchSnapshot();
  });
  it("should make a request once", () => {
    fetchSuggestResults(query);
    fetchSuggestResults(query);
    jest.runAllTimers();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch("api.url/api/suggest?q=foo");
    expect(results).toMatchSnapshot();
  });
});
describe("search service", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it("should make a request once", () => {
    fetchSearchResults(query);
    fetchSearchResults(query);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /api\.url\/api\/search\?q=foo&excludeSources=$/
    );
    expect(results).toMatchSnapshot();
  });
});
