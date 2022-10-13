# code-du-travail-frontend-e2e

## Cypress E2E tests
We're moving from Gherkin to [Cypress](https://docs.cypress.io).

## Gherkin E2E tests

The end to end tests are written in Gherkin.  
You can find them in the [features](codecept/features) folder.

### [Codecept runners](https://codecept.io/bdd/#gherkin)

You can run the Gherkin tests with through the different [Codecept](https://codecept.io) runners.  
Each of them are individual packages that should be separately install and run (see each `README.md`).

### Setup & run tests

See the [Gherkin | Codeceptjs | Puppeteer documentation](runners/puppeteer).

### Adding a new test

> As example, we are going to add a test for the `konami code`

1. Create a `konami-code.feature` file
2. Write your Gherkin
3. Run `yarn codeceptjs gherkin:snippets` in each codeceptjs runners
4. Implement the missing snippets
5. Remove unnecessary comments
6. Test in both headed and headless mode.

```sh
yarn test:e2e && CODECEPT_HEADED=1 yarn test:e2e
```

#### [Gherkin in french](https://cucumber.io/docs/gherkin/reference/#spoken-languages)

As the website is native french, the Gherkin tests are native french too.  
We use the `#language: fr` to tell Codecept that the file has french Gherkin syntax in it.
To ensure that Codecept is compatible with the french syntax, we added a local `step_definitions/_fr.js` with what is needed to be translated.

## Install

```sh
# In this directory
$ yarn
```

## Usage

In order not to get false negative make sure you wait for the page title to appear before you test a page.
`"j'attends que le titre de page {string} apparaisse"`

```sh
# Test the http://localhost:3000
$ yarn test:e2e
# alias to `yarn codeceptjs run --features`
```

By default the test will run in headless mode.  
If you what to see the browser define the `CODECEPT_HEADED` env variable.

```sh
$ export CODECEPT_HEADED=true
$ yarn test:e2e
```

You can change the tested URL by setting the CODECEPT_BASEURL

```sh
$ export CODECEPT_BASEURL=http://master-code-travail.dev.fabrique.social.gouv.fr
# Test the http://master-code-travail.dev.fabrique.social.gouv.fr
$ yarn test:e2e
```

[Check the Puppeteer configuration and method list](https://codecept.io/helpers/Puppeteer)

## Debug

```sh
# To run one test in debug mode
$ yarn test:e2e --steps --verbose --grep "@apropos" -p pauseOnFail
```

Another way to debug is by pausing the tests at some point

```feature
@my_test
Fonctionnalité: Mon test

  Scénario:
    Soit un navigateur web sur le site
    Quand je pause le test
    Alors je vois "foo"
```

`Quand je pause le test` means that the browser will pause there

## Practices

We follow the following rules to write idiomatics tests

- Initial Situation use "Soit" or "Given"
- Actions use "Quand" or ("When"
- Assertions use "Alors" or "Then"

[Check Codecept documentation](https://codecept.io/advanced/#debug)
