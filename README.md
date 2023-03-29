# Code du travail numérique

![Quality Status](https://github.com/SocialGouv/code-du-travail-numerique/actions/workflows/quality.yml/badge.svg)

> Ce dépôt de code regroupe les informations techniques du projet Code du travail numérique

<br/>

- Consulter le [site internet code.travail.gouv.fr](https://code.travail.gouv.fr)
- À propos du code du travail numérique : [https://code.travail.gouv.fr/a-propos](https://code.travail.gouv.fr/a-propos)
- L'[histoire du projet](https://incubateur.social.gouv.fr/startups/code-du-travail-numerique)

## Contributions

- Pour remonter un problème à l'équipe, envoyez un email à [codedutravailnumerique@travail.gouv.fr](mailto:codedutravailnumerique@travail.gouv.fr).
- Pour remonter un bug technique, [ouvrez un ticket](https://github.com/SocialGouv/code-du-travail-numerique/issues/new/choose).

## Développement

Notre bibliothèque de composants UI est disponible en démo [ici](https://socialgouv.github.io/code-du-travail-numerique/).

### Architecture

![schema](./schema.png)

### Installation

Make sure you're using NodeJS 14.17.4+.

```sh
# Install all the packages
yarn
yarn build
```

### Packages

| Package                                                         | description                     |
| --------------------------------------------------------------- | ------------------------------- |
| [code-du-travail-frontend](./packages/code-du-travail-frontend) | Next.js frontend application    |
| [react-ui](./packages/react-ui)                                 | React components and styleguide |

### Frontend

Run the frontend with our online latest API :

```sh
yarn dev:frontend:preprod-api
```

The React components are defined in the [react-ui](./packages/react-ui) package and showcased here: <https://socialgouv.github.io/code-du-travail-numerique/>

### Testing

If you want to run e2e test, you have to run the frontend in a dedicated tab before running the tests.

```sh
yarn test:e2e # To run e2e test without any UI
yarn test:e2e:ui # To run e2e test with CodeceptJS UI
```

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique?ref=badge_large)
