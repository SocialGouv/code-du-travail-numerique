import React, { useState, useContext, useEffect, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { blackAndWhiteColors, colors } from "./theme";

export const BLACK_AND_WHITE_STORAGE_KEY = "blackAndWhiteTheme";

const ThemeContext = React.createContext({
  currentTheme: colors,
  toggleTheme: () => {},
});

const isBlackAndWhiteTheme = () => {
  if (typeof window !== "undefined") {
    return (
      window.localStorage &&
      Boolean(
        window.localStorage.getItem(BLACK_AND_WHITE_STORAGE_KEY) === "true"
      )
    );
  }
  return false;
};

const setBlackAndWhiteTheme = (value) => {
  if (typeof window !== "undefined") {
    window.localStorage &&
      window.localStorage.setItem(BLACK_AND_WHITE_STORAGE_KEY, value);
  }
};

export const ThemeProvider = (props) => {
  const [currentTheme, setCurrentTheme] = useState(colors);

  useEffect(() => {
    if (isBlackAndWhiteTheme()) {
      setCurrentTheme(blackAndWhiteColors);
    }
  }, [currentTheme]);

  const api = useMemo(
    () => ({
      currentTheme,
      toggleTheme: () => {
        if (currentTheme === colors) {
          setCurrentTheme(blackAndWhiteColors);
          setBlackAndWhiteTheme("true");
        } else {
          setCurrentTheme(colors);
          setBlackAndWhiteTheme("false");
        }
      },
    }),
    [currentTheme]
  );

  return (
    <StyledThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={api} {...props} />
    </StyledThemeProvider>
  );
};

export const useTheme = () => useContext(ThemeContext);
