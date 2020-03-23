import React, { useState, useContext, useEffect, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "@socialgouv/react-ui";

import { useLocalStorage } from "../lib/useLocalStorage";

export const BLACK_AND_WHITE_STORAGE_KEY = "blackAndWhiteTheme";

const { colors, blackAndWhiteColors } = theme;

const ThemeContext = React.createContext({
  currentTheme: colors,
  toggleTheme: () => {},
});

export const ThemeProvider = (props) => {
  const [isBlackAndWhiteTheme, setBlackAndWhiteTheme] = useLocalStorage(
    BLACK_AND_WHITE_STORAGE_KEY,
    false
  );
  const [currentTheme, setCurrentTheme] = useState(colors);

  useEffect(() => {
    if (isBlackAndWhiteTheme) {
      setCurrentTheme(blackAndWhiteColors);
    }
  }, [isBlackAndWhiteTheme]);

  const api = useMemo(
    () => ({
      currentTheme,
      toggleTheme: () => {
        if (currentTheme === colors) {
          setCurrentTheme(blackAndWhiteColors);
          setBlackAndWhiteTheme(true);
        } else {
          setCurrentTheme(colors);
          setBlackAndWhiteTheme(false);
        }
      },
    }),
    [currentTheme, setBlackAndWhiteTheme]
  );

  return (
    <StyledThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={api} {...props} />
    </StyledThemeProvider>
  );
};

export const useTheme = () => useContext(ThemeContext);
