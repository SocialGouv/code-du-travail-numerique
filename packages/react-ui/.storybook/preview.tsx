import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/GlobalStyles";
import { Wrapper } from "../src/layout/Wrapper/index.js";
import { blackAndWhiteColors, colors } from "../src/theme.js";
import type { Preview } from "@storybook/react";

export const globalTypes = {
  colors: {
    name: "Color toggle",
    description: "Change Color theme",
    defaultValue: colors,
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: colors, title: "Default" },
        { value: blackAndWhiteColors, title: "High contrast" },
      ],
    },
  },
};

const withThemeProvider = (Story) => {
  return (
    <ThemeProvider theme={colors}>
      <GlobalStyles />
      <Wrapper>
        <Story />
      </Wrapper>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
