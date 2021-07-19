import { act, renderHook } from "@testing-library/react-hooks";

import { useTOCReducer } from "./useTOCReducer.js";

describe("TableOfContent reducer", () => {
  const initialState = {
    titles: [
      {
        active: false,
        element: null,
        id: "ok",
      },
      {
        active: false,
        element: null,
        id: "okok",
      },
    ],
  };

  it("setActive correctly", () => {
    const { result } = renderHook(() => useTOCReducer(initialState));
    expect(result.current.titles.length).toBe(2);
    expect(result.current.titles[0].active).toBe(false);
    act(() => {
      result.current.observerCallback([
        { intersectionRatio: 1, target: { id: "ok" } },
        { intersectionRatio: 0.5, target: { id: "okok" } },
      ]);
    });
    expect(result.current.titles.length).toBe(2);
    expect(result.current.titles[0].active).toBe(true);
    expect(result.current.titles[1].active).toBe(false);
  });
  it("setTitles correctly", () => {
    const { result } = renderHook(() => useTOCReducer(initialState));
    const newTitles = [
      { active: false, element: null, id: "ok-1" },
      { active: true, element: null, id: "ok-2" },
      { active: false, element: null, id: "ok-3" },
    ];
    act(() => {
      result.current.setTitles(newTitles);
    });
    expect(result.current.titles).toEqual(newTitles);
  });
});
