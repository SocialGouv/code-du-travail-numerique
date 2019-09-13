import React, { useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { invert } from "polished";
// eslint-disable-next-line import/no-extraneous-dependencies
import { theme as fullTheme } from "@socialgouv/react-ui";
import { ThemeContext } from "./theme-context";

const { colors: initialTheme } = fullTheme;

console.log("full theme is :", fullTheme);
console.log("initial theme is :", initialTheme);

const RootWrapper = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);
  console.log("Theme is :", theme);
  const toggleColors = () => {
    setTheme(
      Object.keys(theme).reduce((newTheme, key) => {
        newTheme[key] = invert(theme[key]);
        return newTheme;
      }, {})
    );
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleColors }}>
      <ThemeProvider theme={theme}>
        <>{children}</>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

RootWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default RootWrapper;
