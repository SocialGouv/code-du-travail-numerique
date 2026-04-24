import {
  clearSearchSnapshot,
  consumeSearchSnapshot,
  peekSearchSnapshot,
  saveSearchSnapshot,
  SEARCH_SNAPSHOT_MAX_AGE_MS,
  SEARCH_SNAPSHOT_STORAGE_KEY,
} from "../searchSnapshot";
import { PresearchClass } from "src/api/modules/search/service/types";

const baseSnapshot = {
  origin: "home" as const,
  query: "congés payés",
  results: [
    {
      cdtnId: "abc",
      title: "Congés payés",
      source: "themes",
      slug: "conges-payes",
      algo: "exact",
    },
  ] as never,
  queryClass: PresearchClass.THEME,
  lastPresearchQuery: "congés payés",
  focusTarget: { kind: "see-all" as const },
};

describe("searchSnapshot", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.useRealTimers();
  });

  it("round-trips through session storage", () => {
    saveSearchSnapshot(baseSnapshot);
    const read = peekSearchSnapshot();
    expect(read).toMatchObject({
      origin: "home",
      query: "congés payés",
    });
    expect(typeof read?.savedAt).toBe("number");
  });

  it("clearSearchSnapshot removes the stored entry", () => {
    saveSearchSnapshot(baseSnapshot);
    clearSearchSnapshot();
    expect(window.sessionStorage.getItem(SEARCH_SNAPSHOT_STORAGE_KEY)).toBeNull();
    expect(peekSearchSnapshot()).toBeNull();
  });

  it("drops snapshots that have passed the max age", () => {
    const old = {
      ...baseSnapshot,
      savedAt: Date.now() - (SEARCH_SNAPSHOT_MAX_AGE_MS + 1000),
    };
    window.sessionStorage.setItem(
      SEARCH_SNAPSHOT_STORAGE_KEY,
      JSON.stringify(old)
    );
    expect(peekSearchSnapshot()).toBeNull();
    expect(window.sessionStorage.getItem(SEARCH_SNAPSHOT_STORAGE_KEY)).toBeNull();
  });

  it("returns null when the payload is malformed", () => {
    window.sessionStorage.setItem(SEARCH_SNAPSHOT_STORAGE_KEY, "{not json");
    expect(peekSearchSnapshot()).toBeNull();
  });

  it("consumeSearchSnapshot only deletes when predicate passes", () => {
    saveSearchSnapshot(baseSnapshot);
    const miss = consumeSearchSnapshot((s) => s.origin === "modal");
    expect(miss).toBeNull();
    expect(peekSearchSnapshot()).not.toBeNull();

    const hit = consumeSearchSnapshot((s) => s.origin === "home");
    expect(hit?.query).toBe("congés payés");
    expect(peekSearchSnapshot()).toBeNull();
  });

  it("save does not throw when JSON.stringify fails", () => {
    const circular: any = {};
    circular.self = circular;
    expect(() =>
      saveSearchSnapshot({
        ...baseSnapshot,
        results: circular,
      })
    ).not.toThrow();
  });
});
