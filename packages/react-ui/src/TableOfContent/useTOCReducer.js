import { useReducer, useCallback } from "react";

export const rootReducer = (state, action) => {
  switch (action.type) {
    case "setTitles":
      return { titles: action.payload.map((title) => ({ ...title })) };
    case "setActive":
      return {
        titles: state.titles.map((title) => ({
          ...title,
          active: title.id === action.payload,
        })),
      };
  }
};

export const useTOCReducer = (initialState) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio === 1) {
        dispatch({ type: "setActive", payload: entry.target.id });
      }
    });
  }, []);
  const setTitles = useCallback((titles) => {
    dispatch({ type: "setTitles", payload: titles });
  }, []);
  return { observerCallback, setTitles, titles: state.titles };
};
