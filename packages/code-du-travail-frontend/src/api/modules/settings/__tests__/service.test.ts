/** @jest-environment node */

const mockSearch = jest.fn();

jest.mock("../../../utils", () => ({
  elasticDocumentsIndex: "cdtn_test_documents",
  elasticsearchClient: { search: (...args: unknown[]) => mockSearch(...args) },
}));

const hitsWith = (sources: unknown[]) => ({
  hits: { hits: sources.map((_source) => ({ _source })) },
});

describe("isNpsEnabled", () => {
  let isNpsEnabled: () => Promise<boolean>;

  beforeEach(async () => {
    // Fresh module per test: the settings are memoized at module level.
    jest.resetModules();
    mockSearch.mockReset();
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    ({ isNpsEnabled } = await import("../service"));
  });

  it("returns true when the settings document enables the NPS", async () => {
    mockSearch.mockResolvedValue(hitsWith([{ npsEnabled: true }]));
    await expect(isNpsEnabled()).resolves.toBe(true);
    expect(mockSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        index: "cdtn_test_documents",
        query: { bool: { filter: { term: { source: "settings" } } } },
      })
    );
  });

  it("returns false when the NPS is disabled", async () => {
    mockSearch.mockResolvedValue(hitsWith([{ npsEnabled: false }]));
    await expect(isNpsEnabled()).resolves.toBe(false);
  });

  it("returns false when no settings document has been published", async () => {
    mockSearch.mockResolvedValue(hitsWith([]));
    await expect(isNpsEnabled()).resolves.toBe(false);
  });

  it("returns false and does not cache when Elasticsearch fails", async () => {
    mockSearch.mockRejectedValueOnce(new Error("es down"));
    await expect(isNpsEnabled()).resolves.toBe(false);
    // memoizee purges a rejected promise on the next tick.
    await new Promise((resolve) => setImmediate(resolve));

    mockSearch.mockResolvedValue(hitsWith([{ npsEnabled: true }]));
    await expect(isNpsEnabled()).resolves.toBe(true);
  });

  it("caches the settings between calls", async () => {
    mockSearch.mockResolvedValue(hitsWith([{ npsEnabled: true }]));
    await isNpsEnabled();
    await isNpsEnabled();
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });
});
