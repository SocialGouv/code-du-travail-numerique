# Annuaire

les données de l'annuaire sont téléchargeables depuis datagouv [](https://www.data.gouv.fr/fr/datasets/service-public-fr-annuaire-de-l-administration-base-de-donnees-locales/)

Ce jeux de données, contient un ensemble de fiches au format xml.

## Créer un export des données au format json

```
$ yarn start
```

la commande va créer (ou mettre à jour) le ficher annuaire.data.json qui sera ensuite utilisé pour remplir un index dans elastic search.
