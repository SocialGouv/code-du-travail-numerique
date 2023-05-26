import type { Preview } from "@storybook/react";

const preview: Preview = {
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

// import React from "react";
// import { ThemeProvider } from "styled-components";
// import { GlobalStyles } from "../src/GlobalStyles";
// import { Wrapper } from "../src/layout/Wrapper/index.js";
// import { blackAndWhiteColors, colors } from "../src/theme.js";

// export const globalTypes = {
//   colors: {
//     name: "Color toggle",
//     description: "Change Color theme",
//     defaultValue: colors,
//     toolbar: {
//       icon: "circlehollow",
//       items: [
//         { value: colors, title: "Default" },
//         { value: blackAndWhiteColors, title: "High contrast" },
//       ],
//     },
//   },
// };

// const withThemeProvider = (Story, context) => {
//   const theme = context.globals.colors;
//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyles />
//       <Wrapper>
//         <Story {...context} />
//       </Wrapper>
//     </ThemeProvider>
//   );
// };

// export const decorators = [withThemeProvider];
