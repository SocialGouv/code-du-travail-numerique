# Indexing data from datafiller

We extract a bunch of datasets from [datafiller](https://datafiller.num.social.gouv.fr)

### Generate the data files

```sh
$ DATAFILLER_URL="https://path/to/datafiller" yarn start
```

va générer :

- le fichier `prequalified.data.json` qui sera ensuite utilisé par [l'API](../../../code-du-travail-api/routes/search/search.prequalified.js).
- le fichier `themes.data.json` qui sera ensuite utilisé par [l'API](../../../code-du-travail-api/routes/themes/index.js).
- le fichier `glossary.data.json` qui sera ensuite utilisé par [le frontend](../../../code-du-travail-frontend).
