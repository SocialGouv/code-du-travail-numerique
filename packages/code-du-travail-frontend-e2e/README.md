# code-du-travail-frontend-e2e

Les tests E2E (end to end) sont réalisés avec [Cypress](https://docs.cypress.io).  
Vous pouvez les trouver dans le dossier [e2e](e2e).

## Installation

```sh
$ yarn
```

## Usage

```sh
# Ne pas oublier de lancer le projet frontend en amont
# Test http://localhost:3000
$ yarn workspace @cdt/e2e test:e2e
```

Par défaut les tests seront lancés en mode headless.
Vous pouvez utiliser l'UI de cypress pour voir l'éxécution des tests :

```sh
$ yarn workspace @cdt/e2e test:e2e:ui
```

Vous pouvez changer l'URL testé en définissant la variable `TEST_BASEURL`

```sh
$ export TEST_BASEURL=https://code-du-travail-numerique-preprod.dev.fabrique.social.gouv.fr
$ yarn workspace @cdt/e2e test:e2e
# ou avec l'UI
$ yarn workspace @cdt/e2e test:e2e:ui
```
