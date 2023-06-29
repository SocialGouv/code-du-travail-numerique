import { render } from "@testing-library/react";
import React, { useEffect } from "react";

import {
  BLACK_AND_WHITE_STORAGE_KEY,
  ThemeProvider,
  useTheme,
} from "./ThemeProvider";

const checkFunction = jest.fn();

const DummyComponent = () => {
  const { currentTheme, toggleTheme } = useTheme();
  useEffect(() => {
    if (typeof currentTheme === "object" && typeof toggleTheme === "function") {
      checkFunction();
      toggleTheme();
    }
  }, []);
  return null;
};

describe("<ThemeProvider />", () => {
  it("make sure the correct context is passed to wrapped component", () => {
    expect(checkFunction).not.toHaveBeenCalled();
    render(
      <ThemeProvider>
        <DummyComponent />
      </ThemeProvider>
    );
    expect(checkFunction).toHaveBeenCalled();
    expect(localStorage.getItem(BLACK_AND_WHITE_STORAGE_KEY)).toBe("true");
  });
});
