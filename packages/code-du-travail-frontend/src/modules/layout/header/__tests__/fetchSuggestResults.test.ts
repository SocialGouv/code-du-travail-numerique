import { fetchSuggestResults } from "../fetchSuggestResults";

jest.useFakeTimers();
global.fetch = jest.fn();

(fetch as any).mockResolvedValue({
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
    expect((fetch as any).mock.calls[0][0]).toMatch(
      "api.url/api/suggest?q=foo"
    );
    expect(results).toStrictEqual(results);
  });
});
