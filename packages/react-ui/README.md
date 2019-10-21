# REACT UI (@socialgouv/react-ui)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a6e5ebcd-e0bc-4eda-b416-fc8ddf217310/deploy-status)](https://app.netlify.com/sites/socialgouv-react-ui/deploys)
https://socialgouv-react-ui.netlify.com/

Build is automatically triggered by netlify everytime a changed is pushed to the master branch.

## Usage

```js

import { Component, AnotherComponent } "@socialgouv/react-ui"

const App = (
  <Component>
    <AnotherComponent>With a children</AnotherComponent>
  </Component>
)
```

## Theming

When you wish to set a color, please do not use the color variable from the theme in the `@socialgouv/react-ui` package.
Use the `theme` prop provided by styled-components.

e.g.<br />
Not OK: ~~`color: ${theme.colors.blueDark};`~~
OK: `color: ${({theme }) => theme.blueDark};`

Otherwise, the color won't change when the theme is dynamically modified. For eveything else, using the `themr.js` file is always the right thing to do: <br />
``` js
  import { box, spacing } from "../theme";
  const P = styled.p`
    margin: ${spacing.large};
    color: ${({theme}) => theme.darkBlue};
    border: ${box.border};
  `;
```

