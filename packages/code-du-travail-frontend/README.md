# Code-du-travail - Frontend (@cdt/frontend)

Ce dépôt de code contient le frontend du site web du Code du Travail Numérique.

- Prototype dispo sur : http://master.code-du-travail-numerique.dev.factory.social.gouv.fr/

## Lancer l'environnement de développement

**Important** : pour tourner en local, ce projet nécessite les services api et elasticsearch  

```sh
# for local dev
$ yarn workspace @cdt/frontend dev
```
Par default, en developpement l'api nlp est remplacée par un endpoint du service api
Toutefois, vous pouvez lancer l'application front sans le le mock de l'api nlp.

```sh
# for local dev
$ yarn workspace @cdt/frontend dev-with-nlp
```

## Lancer la version build du frontend

```sh
$ yarn workspace @cdt/frontend build && yarn workspace @cdt/frontend start
```
