# Synonyms

Ce projet permet de générer un fichier de synonymes utilisé par ElasticSearch
Il contient les synonymes crées spécialement `cdtn_synonyms.json` et de synonymes provenant
d'une extraction du fichier pdf `TESS_liste hiérarchique_2014.pdf`

le package [pdf-table-extractor](https://www.npmjs.com/package/pdf-table-extractor) permet de générer le fichier `extract.json`

## Générer le fichier TESS.json

```bash
$ node extract-TESS.js > TESS.json
```

## Générer le fichier synonyms.json

```bash
$ yarn start
```
