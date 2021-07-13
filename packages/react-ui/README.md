# CDTN REACT UI (@socialgouv/cdtn-ui)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a6e5ebcd-e0bc-4eda-b416-fc8ddf217310/deploy-status)](https://app.netlify.com/sites/socialgouv-react-ui/deploys)
https://socialgouv-react-ui.netlify.com/

Build is automatically triggered by netlify everytime a changed is pushed to the master branch.

## Using components

This one is pretty straightforward

```js
import { Component, AnotherComponent } from "@socialgouv/cdtn-ui";

const App = (
  <Component>
    <AnotherComponent>With a children</AnotherComponent>
  </Component>
);
```

## Providing a theme

React UI is a themed UI. In order to make it work in your project, you must provide it with a theme.

### Basic option

```js
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/theme.js";

const { colors } = theme;

export default class MyApp extends App {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={colors}>
        <>{children}</>
      </ThemeProvider>
    );
  }
}
```

All you need is to wrap your root component inside the styled component's theme provider and give is a set of colors.

Here, colors are React UI ones, but you can pick others. Simply follow the structure of the exported `colors` item here: [./src/theme.js](https://github.com/SocialGouv/code-du-travail-numerique/blob/master/packages/react-ui/src/theme.js)

### Simpler option

If you don't wish to use you own colors, you can also do:

```js
import { ThemeProvider } from "@socialgouv/cdtn-ui";

// This is an example for next.js
export default class MyApp extends App {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider>
        <>{children}</>
      </ThemeProvider>
    );
  }
}
```

With this approach, you also benefit from the theme hook which implements a theme swap feature. You will toggle from the basic theme to the black and white one. Simply do the following:

```js
import { useTheme } from "@socialgouv/cdtn-ui";

...

const { currentTheme, toggleTheme } = useTheme();

...

toggleTheme();
```

Make sure you don't call `toggleTheme` inside the render of a component otherwise you'll get the dreaded infinite rendering loop.

## Using colors and variables

When you wish to set a color, please do not use the color variable from the theme in the `@socialgouv/cdtn-ui` package.
Use the `theme` prop provided by styled-components.

Not OK: ~~`color: ${theme.colors.paragraph};`~~<br />
OK: `color: ${({theme }) => theme.paragraph};`

Otherwise, the color won't change when the theme is dynamically modified. For eveything else, using the `theme.js` file is always the right thing to do.

While contributing to the project, for example, you should do:

```js
import { box, spacings } from "../theme.js";
const P = styled.p`
  margin: ${spacings.large};
  color: ${({ theme }) => theme.darkBlue};
  border: ${({ theme }) => box.border(theme.border)};
`;
```
