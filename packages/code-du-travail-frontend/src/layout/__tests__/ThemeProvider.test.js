import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeProvider";

const checkFunction = jest.fn();

const DummyComponent = ({ checkFunction }) => {
  const { currentTheme, toggleTheme } = useTheme();
  if (typeof currentTheme === "object" && typeof toggleTheme === "function") {
    checkFunction();
  }
  return null;
};

describe("<ThemeProvider />", () => {
  it("make sure the correct context is passed to wrapped component", () => {
    render(
      <ThemeProvider>
        <DummyComponent checkFunction={checkFunction} />
      </ThemeProvider>
    );
    expect(checkFunction).toHaveBeenCalled();
  });
});
