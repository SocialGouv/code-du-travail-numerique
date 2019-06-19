# Code-du-travail - Frontend (@cdt/frontend)

Ce dépôt de code contient le frontend du site web du Code du Travail Numérique.

- Prototype dispo sur : https://codedutravail-dev.num.social.gouv.fr

## Installation de l'environnement de développement

**Important** : pour tourner en local ce projet nécessite les serveurs actifs des dépôts de code [`code-du-travail-data`](https://github.com/SocialGouv/code-du-travail-numerique/tree/master/packages/code-du-travail-data) (serveur Elasticsearch) et [`code-du-travail-api`](https://github.com/SocialGouv/code-du-travail-api) (serveur API).

Créez un fichier `.env` :

```shell
NODE_ENV=development
API_URL=https://127.0.0.1:1337/api/v1
SENTRY_PUBLIC_DSN=https://path/to/sentry
PORT=3000
```

Puis :

```bash
$ npm install
$ npm run dev
```

## Build de production

- éditer `.env`
- éditer `docker-compose.override.yml`

puis `docker-compose up`
