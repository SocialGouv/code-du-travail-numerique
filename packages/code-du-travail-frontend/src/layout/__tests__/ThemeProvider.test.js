import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeProvider";

const checkFunction = jest.fn();

const DummyComponent = () => {
  const { currentTheme, toggleTheme } = useTheme();
  if (typeof currentTheme === "object" && typeof toggleTheme === "function") {
    checkFunction();
  }
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
  });
});
