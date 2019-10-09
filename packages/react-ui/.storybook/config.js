import { configure, addDecorator } from "@storybook/react";
import { withContexts } from "@storybook/addon-contexts/react";
import { withA11y } from "@storybook/addon-a11y";
import { ThemeProvider } from "styled-components";
import { invert } from "polished";
import { colors } from "../src/theme";

const invertedColors = Object.keys(colors).reduce((invertedColors, color) => {
  invertedColors[color] = invert(colors[color]);
  return invertedColors;
}, {});

addDecorator(
  withContexts([
    {
      icon: "switchalt",
      title: "Color toggle",
      components: [ThemeProvider],
      params: [
        { name: "Default Theme", props: { theme: colors }, default: true },
        { name: "Inverted Theme", props: { theme: invertedColors } }
      ]
    }
  ])
);
addDecorator(withA11y);
// https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure
// addParameters({
//   a11y: {
//     // ... axe options
//     element: '#root', // optional selector which element to inspect
//     config: {}, // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
//     options: {} // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
//   },
// });

configure(require.context("../src", true, /story\.js$/), module);
