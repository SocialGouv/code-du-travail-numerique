import { act, renderHook, waitFor } from "@testing-library/react";
import { fetchHints } from "../../api/fetchHints";
import {
  HINTS_REVALIDATE_AFTER_MS,
  resetHintsCache,
  useHints,
} from "../useHints";

jest.mock("../../api/fetchHints", () => ({
  fetchHints: jest.fn(),
}));

const mockedFetchHints = fetchHints as jest.Mock;

const hints = (title: string) => ({
  actualites: [{ id: title, title, slug: `/actualite/${title}` }],
  suggestions: [],
});

const titles = (result: { current: ReturnType<typeof useHints> }) =>
  result.current.actualites.map((a) => a.title);

describe("useHints", () => {
  let now: number;

  beforeEach(() => {
    resetHintsCache();
    mockedFetchHints.mockReset();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    now = new Date("2026-11-13T10:00:00Z").getTime();
    jest.spyOn(Date, "now").mockImplementation(() => now);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows a loader on the first fetch only", async () => {
    mockedFetchHints.mockResolvedValue(hints("premiere"));
    const { result } = renderHook(() => useHints());

    act(() => {
      result.current.fetchHintsData();
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(titles(result)).toEqual(["premiere"]));
    expect(result.current.isLoading).toBe(false);
  });

  it("serves known hints instantly to a remounted component, without fetching", async () => {
    mockedFetchHints.mockResolvedValue(hints("premiere"));
    const first = renderHook(() => useHints());
    await act(() => first.result.current.fetchHintsData());
    first.unmount();

    const { result } = renderHook(() => useHints());
    expect(titles(result)).toEqual(["premiere"]);
    await act(() => result.current.fetchHintsData());
    expect(result.current.isLoading).toBe(false);
    expect(mockedFetchHints).toHaveBeenCalledTimes(1);
  });

  it("refreshes stale hints in the background, keeping the known ones displayed", async () => {
    mockedFetchHints.mockResolvedValue(hints("premiere"));
    const { result } = renderHook(() => useHints());
    await act(() => result.current.fetchHintsData());

    now += HINTS_REVALIDATE_AFTER_MS + 1;
    let resolve!: (value: unknown) => void;
    mockedFetchHints.mockReturnValue(new Promise((r) => (resolve = r)));
    act(() => {
      result.current.fetchHintsData();
    });
    expect(result.current.isLoading).toBe(false);
    expect(titles(result)).toEqual(["premiere"]);

    await act(async () => resolve(hints("nouvelle")));
    expect(titles(result)).toEqual(["nouvelle"]);
  });

  it("never fetches twice at the same time", async () => {
    mockedFetchHints.mockResolvedValue(hints("premiere"));
    const { result } = renderHook(() => useHints());

    await act(() =>
      Promise.all([
        result.current.fetchHintsData(),
        result.current.fetchHintsData(),
      ])
    );
    expect(mockedFetchHints).toHaveBeenCalledTimes(1);
  });

  it("keeps the known hints when a refresh fails", async () => {
    mockedFetchHints.mockResolvedValue(hints("premiere"));
    const { result } = renderHook(() => useHints());
    await act(() => result.current.fetchHintsData());

    now += HINTS_REVALIDATE_AFTER_MS + 1;
    mockedFetchHints.mockRejectedValue(new Error("network"));
    await act(() => result.current.fetchHintsData());

    expect(titles(result)).toEqual(["premiere"]);
    expect(result.current.error).toEqual(new Error("network"));
  });
});
