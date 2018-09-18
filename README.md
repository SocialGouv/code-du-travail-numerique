# Code-du-travail Explorer [![CircleCI](https://circleci.com/gh/SocialGouv/code-du-travail-explorer.svg?style=svg)](https://circleci.com/gh/SocialGouv/code-du-travail-explorer)

Ce dépôt de code contient le site web du prototype du Code du Travail Numérique.

- Démo de l'ancien design : https://code-du-travail.beta.gouv.fr (hébergé sur Github Pages)
- Démo du nouveau design : https://codedutravail.num.social.gouv.fr

## Installation de l'environnement de développement

**Important** : pour tourner en local ce projet nécessite les serveurs actifs des dépôts de code [`code-du-travail-data`](https://github.com/SocialGouv/code-du-travail-data) (serveur Elasticsearch) et [`code-du-travail-api`](https://github.com/SocialGouv/code-du-travail-api) (serveur API).

Créez un fichier `.env` (utilisé par Docker) :

```shell
NODE_ENV=development
API_URL=https://127.0.0.1:1337
```

Puis :

```bash
$ docker-compose up
```

Mémo :

```
# Pour lancer un shell dans le conteneur
$ docker exec -ti code-du-travail-explorer /bin/sh
```

## Intégration HTML/CSS

L'intégration HTML/CSS est réalisée et documentée dans un autre dépôt de code : [code-du-travail-html](https://github.com/SocialGouv/code-du-travail-html).

Le fichier CSS et certains assets du dépôt de code de l'intégration sont copiés dans le répertoire `static` de ce dépôt de code.

## Divers

⚠ La mise à jour de la branche `master` déclenche une mise à jour sur la démo. (ajouter `[skip ci]` au message de commit pour ne pas deploy) => **Cette fonctionnalité est désactivée pour le moment en paramétrant une branche `toto` bidon dans la configuration `.circleci/config.yml` car le projet est déployée sur un autre serveur**.

## Navigation par thèmes

Le prototype initial était basé sur une navigation par thèmes alors que la version actuelle est centrée sur un champ de recherche. La navigation par thèmes est toujours accessible via un lien dans le footer.

À propos de la navigation par thèmes :

- Actuellement, une partie des datas sont en dur dans `/src/data` :
  - Les IDs poseidon servent de lien
  - articles.js : extrait des articles eposeidon.json
  - faq.json : FAQ avec en plus un lien vers IDs poseidon
  - idcc.json : extrait de legifrance ?
  - themes.js : table qui definit les IDs eposeidon, arborescence, articles associés
  - fiches.js : fiches pratiques
  - L2253.js : referentiel articulation
  - suppletives.js : liste dispositions supplétives
  - kali.js : extrait du site legifrance https://www.legifrance.gouv.fr/rechConvColl.do

Les résultats sont affichés par `src/explorer/Result.js` qui contient tous les "blocs".

TODO :

- documenter [src/explorer/Articulation.js](./src/explorer/Articulation.js)
- documenter les [règles](https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcblxudGhlbWUtLT5Ye0wyMjUzID99XG5YLS0-MVtMMjI1My0xIDogMTMgdGhlbWVzXVxuWC0tPjJbTDIyNTMtMiA6IDQgdGhlbWVzXVxuWC0tPkF1dHJlXG5cbjEtLT5BMShNZXNzYWdlIEFydGljdWxhdGlvbiAxKVxuMi0tPkEyKE1lc3NhZ2UgQXJ0aWN1bGF0aW9uIDIpXG5BdXRyZS0tPkEzKE1lc3NhZ2UgQXJ0aWN1bGF0aW9uIDMpIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0) ?

### Ideas

- enrichissement de la FAQ via discourse ou autre outil collaboratif ?
- analyse des textes de loi :
  - https://github.com/digitalbazaar/jsonld.js ?

### Tags

- la navigation de tags devrait être "intelligente"
  - proposer en plus des tags/sujets connexes
  - améliorer les suggestions avec ML Invenis + activité sur le site (questions fréquentes, actu...)
