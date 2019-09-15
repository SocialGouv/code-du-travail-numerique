# Indexation des données du datafiller

Afin de pouvoir proposer à l'utilisateur des réponses pré-qualifiées issues du [datafiller](https://github.com/SocialGouv/datafiller/), il faut récupérer ces données pour les mettre [à disposition de l'API](../code-du-travail-api/routes/search/search.prequalified.js).

Pour générer le fichier qui servira à l'indexation, la commande

```sh
$ yarn start
```

va générer :

- le fichier `prequalified.data.json` qui sera ensuite utilisé par [l'API](../code-du-travail-api/routes/search/search.prequalified.js).
- le fichier `themes.data.json` qui sera ensuite utilisé par [l'API](../code-du-travail-api/routes/themes/index.js).

Le serveur elastic peut être configuré avec `process.env.ELASTICSEARCH_URL` et utilise `http://127.0.0.1:9200` par défaut.
