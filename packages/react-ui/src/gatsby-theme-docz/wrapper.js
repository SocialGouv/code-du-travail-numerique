import React, { useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { invert } from "polished";
// eslint-disable-next-line import/no-extraneous-dependencies
import { theme as fullTheme } from "@socialgouv/react-ui";
import { ThemeContext } from "./theme-context";

const { theme: initialTheme, variants } = fullTheme;

const RootWrapper = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);
  const toggleColors = () => {
    setTheme({
      ...theme,
      colors: {
        black: invert(theme.colors.black),
        grey: {
          dark: invert(theme.colors.grey.dark),
          light: invert(theme.colors.grey.light)
        },
        white: invert(theme.colors.white),
        text: {
          dark: invert(theme.colors.text.dark),
          alt: invert(theme.colors.text.alt),
          light: invert(theme.colors.text.light)
        },
        ...variants.reduce((acc, variant) => {
          acc[variant] = { ...theme.colors[variant] };
          Object.keys(acc[variant]).map(key => {
            acc[variant][key] = invert(acc[variant][key]);
          });
          return acc;
        }, {})
      }
    });
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleColors }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

RootWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default RootWrapper;
