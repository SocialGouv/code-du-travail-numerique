import { rootReducer } from "./useTOCReducer";

describe("TableOfContent reducer", () => {
  const initialState = {
    titles: [
      {
        active: false,
        element: null,
        id: "ok",
      },
    ],
  };
  it("setTiltes correctly", () => {
    const newState = rootReducer(initialState, {
      type: "setActive",
      payload: "ok",
    });
    expect(newState.titles.length).toBe(1);
    expect(newState.titles[0].active).toBe(true);
  });
  it("setActive correctly", () => {
    const newTitles = [
      { active: false, element: null, id: "ok-1" },
      { active: true, element: null, id: "ok-2" },
      { active: false, element: null, id: "ok-3" },
    ];
    const newState = rootReducer(initialState, {
      type: "setTitles",
      payload: newTitles,
    });
    expect(newState.titles).toEqual(newTitles);
  });
});
