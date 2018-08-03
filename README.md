# Code-du-travail Explorer [![CircleCI](https://circleci.com/gh/SocialGouv/code-du-travail-explorer.svg?style=svg)](https://circleci.com/gh/SocialGouv/code-du-travail-explorer)

Demo : https://socialgouv.github.io/code-du-travail-explorer/

## Installation de l'environnement de développement

### Paramétrage du fichier `.env`

    NODE_ENV=development

### Création de l'instance Docker

```bash
$ docker-compose up
```

## Navigation par thèmes

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

Les résultats sont affichés par `src/Result.js` qui contient tous les "blocs".

⚠ La mise à jour de la branche `master` déclenche une mise à jour sur la démo. (ajouter `[skip ci]` au message de commit pour ne pas deploy)

Pour aller sur une fiche thème directement, ajouter`/#/themes/6100` à l'url de base.

## Todo

### Data
 - Completer les fichiers dans [data](./data)
 - enrichir les datas pour anticiper des tests de rechecrhe
 - contacts : se procurer liste des contacts par theme/région
 - liens/outils : se procurer liste des contacts par theme/région
 - form feedback

### Tech
 - futur : articles.js : remplacer par une API pour requeter par ID de code/article car +10k articles. voir quelle source de données on utilise pour ça ?
 - connecter les données à une API + ElasticSearch
 - elastic search :
  - importer les différentes sources
  - deployer une version + https://github.com/appbaseio/mirage ?

### Divers
 - documenter [src/Articulation.js](./src/Articulation.js)
 - documenter les [règles](https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcblxudGhlbWUtLT5Ye0wyMjUzID99XG5YLS0-MVtMMjI1My0xIDogMTMgdGhlbWVzXVxuWC0tPjJbTDIyNTMtMiA6IDQgdGhlbWVzXVxuWC0tPkF1dHJlXG5cbjEtLT5BMShNZXNzYWdlIEFydGljdWxhdGlvbiAxKVxuMi0tPkEyKE1lc3NhZ2UgQXJ0aWN1bGF0aW9uIDIpXG5BdXRyZS0tPkEzKE1lc3NhZ2UgQXJ0aWN1bGF0aW9uIDMpIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0) ?

### Ideas
 - enrichissement de la FAQ via discourse ou autre outil collaboratif ?
 - analyse des textes de loi :
    - https://github.com/digitalbazaar/jsonld.js ?

## Intégration Elastic :

A priori Elastic devrait à terme remplacer toutes les sources de données statiques.

### Tags

 - la navigation de tags devrait être "intelligente"
    - proposer en plus des tags/sujets connexes
    - améliorer les suggestions avec ML Invenis + activité sur le site (questions fréquentes, actu...)
