# Gherkin | Codeceptjs | Puppeteer

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
$ yarn test
# alias to `yarn codeceptjs run --features`
```

By default the test will run in headless mode.  
If you what to see the browser define the `CODECEPT_HEADED` env variable.

```sh
$ export CODECEPT_HEADED=true
$ yarn test
```

You can change the tested URL by setting the CODECEPT_BASEURL

```sh
$ export CODECEPT_BASEURL=http://master.code-du-travail-numerique.dev.factory.social.gouv.fr
# Test the http://master.code-du-travail-numerique.dev.factory.social.gouv.fr
$ yarn test
```

[Check the Puppeteer configuration and method list](https://codecept.io/helpers/Puppeteer)

## Debug

```sh
# To run one test in debug mode
$ yarn test --steps --verbose --grep "@apropos" -p pauseOnFail
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
