import React, { useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { blackAndWhiteColors, colors } from "./theme.js";

export const BLACK_AND_WHITE_STORAGE_KEY = "blackAndWhiteTheme";

const ThemeContext = React.createContext({
  currentTheme: colors,
  toggleTheme: () => {},
});

const isBlackAndWhiteTheme = () => {
  if (typeof window !== "undefined") {
    try {
      return (
        window.localStorage &&
        Boolean(
          window.localStorage.getItem(BLACK_AND_WHITE_STORAGE_KEY) === "true"
        )
      );
    } catch (error) {
      return false;
    }
  }
  return false;
};

const setBlackAndWhiteTheme = (value) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage &&
        window.localStorage.setItem(BLACK_AND_WHITE_STORAGE_KEY, value);
    } catch (error) {
      console.error(error);
    }
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
        if (currentTheme.noColors) {
          setCurrentTheme(colors);
          setBlackAndWhiteTheme("false");
        } else {
          setCurrentTheme(blackAndWhiteColors);
          setBlackAndWhiteTheme("true");
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
