# code-du-travail-ui

[![npm package][npm-badge]][npm]

Démo & Documentation : https://socialgouv.github.io/code-du-travail-ui

Composants [React](http://reactjs.org/) du site du [Code du travail numérique](https://codedutravail.num.social.gouv.fr).

Le CSS utilisé est celui de [code-du-travail-css](https://github.com/SocialGouv/code-du-travail-css), que vous devez importer séparément.

Contribuez au projet ici : [code-du-travail-ui](https://github.com/SocialGouv/code-du-travail-ui).

## Usage

```js
import "@SocialGouv/code-du-travail-css"
import { Container, Alert } "@SocialGouv/code-du-travail-ui"

const App = (
  <Container>
    <Alert primary>Primary alert message</Alert>
    <Alert secondary>Secondary alert message</Alert>
  </Container>
)
```

[npm-badge]: https://img.shields.io/npm/v/code-du-travail-ui.png?style=flat-square
[npm]: https://www.npmjs.org/package/code-du-travail-ui
