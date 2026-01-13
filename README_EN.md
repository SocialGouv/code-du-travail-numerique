# Code du travail numérique

![Quality Status](https://github.com/SocialGouv/code-du-travail-numerique/actions/workflows/quality.yml/badge.svg)

- Visit the [website code.travail.gouv.fr](https://code.travail.gouv.fr)
- About the Digital Labour Code: [https://code.travail.gouv.fr/a-propos](https://code.travail.gouv.fr/a-propos)


## Contributions

- To report a problem to the team, send an email to [codedutravailnumerique@travail.gouv.fr](mailto:codedutravailnumerique@travail.gouv.fr).
- To report a technical bug, [open an issue](https://github.com/SocialGouv/code-du-travail-numerique/issues/new).


## Developement

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
| [code-du-travail-modeles](./packages/code-du-travail-modeles)   | Implementation of [publicodes](https://publi.codes) for collective agreements   |
| [code-du-travail-utils](./packages/code-du-travail-utils)       | Shared utilities between the different Digital Labour Code projects |

### code-du-travail-frontend

```sh
# To run the application using the pre-production API:
cp packages/code-du-travail-frontend/.env.sample packages/code-du-travail-frontend/.env # Set the proper variables
pnpm dev:frontend

# To run the application using a local Docker container
NEXT_PUBLIC_ES_INDEX_PREFIX=cdtn ELASTICSEARCH_URL=http://localhost:9200 pnpm --filter @cdt/frontend dev
```

### code-du-travail-modeles

This package contains the [publicodes](https://publi.codes/) models for the Digital Labour Code simulators.

#### Organisation

The package contains the publicodes models in the 'src/modeles' folder in YAML format.
The structure of the models is not yet finalized.
Currently, the labour code information is placed in the file `contrat-salarie.yaml`
and the information for each collective agreement is placed in the folder `src/modeles/conventions`
where each agreement has its own file.

A `MergeModele` class in the `src/utils` folder allows merging all YAML files in the `modeles` folder to feed the publicodes engine.

Finally, the `src/__test__` folder contains tests to validate the rules in the YAML model.
The goal is to enable TDD (Test Driven Development) when writing our rules.
