# code-du-travail-ui [![CircleCI](https://circleci.com/gh/SocialGouv/code-du-travail-ui.svg?style=svg)](https://circleci.com/gh/SocialGouv/code-du-travail-ui)

[![npm package][npm-badge]][npm]

Démo & Documentation : https://socialgouv.github.io/code-du-travail-ui

Composants [ReactJS](http://reactjs.org/) du site du [Code du travail numérique](https://codedutravail.num.social.gouv.fr).

Le CSS utilisé est celui de [code-du-travail-css](https://github.com/SocialGouv/code-du-travail-css), que vous devez importer séparément.

## Usage

```js
import "@socialgouv/code-du-travail-css"

import { Container, Alert } "@socialgouv/code-du-travail-ui"

const App = (
  <Container>
    <Alert primary>Primary alert message</Alert>
    <Alert secondary>Secondary alert message</Alert>
  </Container>
)
```

[npm-badge]: https://img.shields.io/npm/v/@socialgouv/code-du-travail-ui.png?style=flat-square
[npm]: https://www.npmjs.org/package/@socialgouv/code-du-travail-ui
