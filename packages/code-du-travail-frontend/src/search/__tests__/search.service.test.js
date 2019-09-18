import { fetchSearchResults, fetchSuggestResults } from "../search.service";

jest.useFakeTimers();

const results = {
  foo: "bar"
};
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(results)
});

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
    expect(fetch.mock.calls[0][0]).toMatch("suggest.url/suggest?q=foo");
    expect(results).toMatchSnapshot();
  });
  it("should make a request once", () => {
    fetchSuggestResults(query);
    fetchSuggestResults(query);
    jest.runAllTimers();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch("suggest.url/suggest?q=foo");
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
      /api\.url\/search\?q=foo&excludeSources=$/
    );
    expect(results).toMatchSnapshot();
  });
});
