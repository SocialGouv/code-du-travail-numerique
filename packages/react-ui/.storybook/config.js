import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withContexts } from "@storybook/addon-contexts/react";
import { withA11y } from "@storybook/addon-a11y";
import { ThemeProvider } from "styled-components";
import { invert } from "polished";
import { colors } from "../src/theme";
import { GlobalStyles } from "../src/GlobalStyles";
import { Wrapper } from "../src/layout/Wrapper";

const CustomThemeWrapper = ({ theme, children }) => (<>
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Wrapper>
      { children }
    </Wrapper>
  </ThemeProvider>
</>);

const invertedColors = Object.keys(colors).reduce((invertedColors, color) => {
  invertedColors[color] = invert(colors[color]);
  return invertedColors;
}, {});

addDecorator(
  withContexts([
    {
      icon: "switchalt",
      title: "Color toggle",
      components: [CustomThemeWrapper],
      params: [
        { name: "Default Theme", props: { theme: colors }, default: true },
        { name: "Inverted Theme", props: { theme: invertedColors } }
      ]
    }
  ])
);
addDecorator(withA11y);

configure(require.context("../src", true, /story\.js$/), module);
