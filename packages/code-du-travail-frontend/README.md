# Code-du-travail - Frontend (@cdt/frontend)

Frontend du site web du Code du Travail Numérique.

Prototype disponible sur : [https://code-du-travail-numerique-master.dev.fabrique.social.gouv.fr/](https://code-du-travail-numerique-master.dev.fabrique.social.gouv.fr/)

## Lancer l'environnement de développement

**Important** : pour tourner en local, ce projet nécessite les services api et elasticsearch. Par défaut on va utiliser l'API publique de dev.

```sh
yarn dev:frontend:preprod-api
```

## Lancer la version build du frontend

```sh
yarn build:ui && yarn workspace @cdt/frontend start
```
