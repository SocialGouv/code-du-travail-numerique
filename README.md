# Code du travail numérique

![Quality Status](https://github.com/SocialGouv/code-du-travail-numerique/actions/workflows/quality.yml/badge.svg)

- Consulter le [site internet code.travail.gouv.fr](https://code.travail.gouv.fr)
- À propos du code du travail numérique : [https://code.travail.gouv.fr/a-propos](https://code.travail.gouv.fr/a-propos)

## Contributions

- Pour remonter un problème à l'équipe, envoyez un email à [codedutravailnumerique@travail.gouv.fr](mailto:codedutravailnumerique@travail.gouv.fr).
- Pour remonter un bug technique, [ouvrez un ticket](https://github.com/SocialGouv/code-du-travail-numerique/issues/new).

## Développement

### Installation

```sh
# Install all the packages
pnpm install
pnpm build
```

### Tests

```sh
pnpm test:frontend # To run frontend tests
TEST_MODE=heavy-and-light pnpm test:e2e # To run e2e test without any UI
TEST_MODE=heavy-and-light pnpm test:e2e:ui # To run e2e test with Cypress UI
# TEST_MODE can be : light, heavy, heavy-and-light or html-validation
```

## Packages

| Package                                                         | description                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [code-du-travail-frontend](./packages/code-du-travail-frontend) | Application Next.js                                                            |
| [code-du-travail-modeles](./packages/code-du-travail-modeles)   | Implémentation [publicodes](https://publi.codes) des conventions collectives   |
| [code-du-travail-utils](./packages/code-du-travail-utils)       | Utilitaires partagés entre les différents projets du code du travail numérique |

### code-du-travail-frontend

```sh
# Pour lancer l'application en se basant sur l'API de pre-production :
cp packages/code-du-travail-frontend/.env.sample packages/code-du-travail-frontend/.env # Setter les bonnes variables
pnpm dev:frontend

# Pour lancer l'application en se basant sur un container docker en local
NEXT_PUBLIC_ES_INDEX_PREFIX=cdtn ELASTICSEARCH_URL=http://localhost:9200 pnpm --filter @cdt/frontend dev
```

### code-du-travail-modeles

Ce package contient les modèles [publicodes](https://publi.codes/) pour les simulateurs du code du travail numérique.

#### Organisation

Le package contient les modèles publicodes dans le dossier 'src/modeles' dans le format YAML.
Le découpage des modèles n'est pas encore finalisé.
A l'heure actuelle, on place les informations du code du travail dans le fichier `contrat-salarie.yaml`
puis les informations de chaque convention collective dans le dossier `src/modeles/conventions`
où chaque convention possède son fichier.

Une classe `MergeModele` dans le dossier `src/utils` permet de fusionner l'ensemble des fichiers YAML présent dans le dossier `modeles` pour alimenter le moteur de publicodes.

Enfin le dossier `src/__test__` contient les tests permettant de valider les règles dans le modèle YAML.
Le but étant de pouvoir fonctionner en mode TDD pour rédiger nos règles.
