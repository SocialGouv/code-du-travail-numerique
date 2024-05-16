# Code du travail numérique

![Quality Status](https://github.com/SocialGouv/code-du-travail-numerique/actions/workflows/quality.yml/badge.svg)

- Consulter le [site internet code.travail.gouv.fr](https://code.travail.gouv.fr)
- À propos du code du travail numérique : [https://code.travail.gouv.fr/a-propos](https://code.travail.gouv.fr/a-propos)
- L'[histoire du projet](https://incubateur.social.gouv.fr/startups/code-du-travail-numerique)

## Contributions

- Pour remonter un problème à l'équipe, envoyez un email à [codedutravailnumerique@travail.gouv.fr](mailto:codedutravailnumerique@travail.gouv.fr).
- Pour remonter un bug technique, [ouvrez un ticket](https://github.com/SocialGouv/code-du-travail-numerique/issues/new/choose).

## Développement

### Architecture



![schema](./schema.png)

### Installation

```sh
# Install all the packages
yarn
yarn build
```

### Packages

| Package                                                         | description                                                                  |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [code-du-travail-frontend](./packages/code-du-travail-frontend) | Application Next.js                                                          |
| [code-du-travail-modeles](./packages/code-du-travail-modeles)   | Implémentation [publicodes](https://publi.codes) des conventions collectives |
| [react-ui](./packages/react-ui)                                 | Librairie de composant                                                       |

### Frontend

Pour lancer l'application en se basant sur l'API de pre-production :

```sh
yarn dev:frontend:preprod-api
```

Notre bibliothèque de composants UI est disponible en démo [ici](https://socialgouv.github.io/code-du-travail-numerique/).

### Testing

```sh
yarn test:e2e # To run e2e test without any UI
yarn test:e2e:ui # To run e2e test with Cypress UI
```

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FSocialGouv%2Fcode-du-travail-numerique?ref=badge_large)

