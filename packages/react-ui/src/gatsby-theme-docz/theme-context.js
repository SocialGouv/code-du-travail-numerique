import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { theme as fullTheme } from "@socialgouv/react-ui";
const { colors } = fullTheme;

export const ThemeContext = React.createContext({
  theme: colors,
  toggleColors: () => {}
});
