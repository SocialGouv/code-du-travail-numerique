import { searchResults, suggestResults } from "../search.service";

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
    suggestResults("bar");
    expect(fetch).not.toBeCalled();
  });
  it("should make a request unless debounce time is ellapsed", () => {
    suggestResults(query);
    jest.runAllTimers();
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /api\.url\/suggest\?q=foo&excludeSources=$/
    );
    expect(results).toMatchSnapshot();
  });
  it("should make a request once", () => {
    suggestResults(query);
    suggestResults(query);
    jest.runAllTimers();
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /api\.url\/suggest\?q=foo&excludeSources=$/
    );
    expect(results).toMatchSnapshot();
  });
});
describe("search service", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it("should make a request once", () => {
    searchResults(query);
    searchResults(query);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /api\.url\/search\?q=foo&excludeSources=$/
    );
    expect(results).toMatchSnapshot();
  });
});
