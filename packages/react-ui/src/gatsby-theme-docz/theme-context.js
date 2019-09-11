import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { theme as fullTheme } from "@socialgouv/react-ui";
const { theme } = fullTheme;

export const ThemeContext = React.createContext({
  theme: theme,
  toggleColors: () => {}
});
