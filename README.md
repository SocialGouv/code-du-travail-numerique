# Code-du-travail Explorer [![CircleCI](https://circleci.com/gh/SocialGouv/code-du-travail-explorer.svg?style=svg)](https://circleci.com/gh/SocialGouv/code-du-travail-explorer)

Ce dépôt de code contient le site web du prototype du Code du Travail Numérique.

- Prototype dispo sur : https://codedutravail-dev.num.social.gouv.fr

## Installation de l'environnement de développement

**Important** : pour tourner en local ce projet nécessite les serveurs actifs des dépôts de code [`code-du-travail-data`](https://github.com/SocialGouv/code-du-travail-data) (serveur Elasticsearch) et [`code-du-travail-api`](https://github.com/SocialGouv/code-du-travail-api) (serveur API).

Créez un fichier `.env` :

```shell
NODE_ENV=development
API_URL=https://127.0.0.1:1337
```

Puis :

```bash
$ npm install
$ npm run dev
```

## Intégration HTML/CSS

L'intégration HTML/CSS est réalisée et documentée dans un autre dépôt de code : [code-du-travail-css](https://github.com/SocialGouv/code-du-travail-css).

Le fichier CSS et certains assets du dépôt de code de l'intégration sont copiés dans le répertoire `static` de ce dépôt de code.

