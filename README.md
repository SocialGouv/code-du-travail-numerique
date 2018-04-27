# Code-du-travail Explorer [![CircleCI](https://circleci.com/gh/SocialGouv/code-du-travail-explorer.svg?style=svg)](https://circleci.com/gh/SocialGouv/code-du-travail-explorer)

Demo : https://socialgouv.github.io/code-du-travail-explorer/

 - Actuellement les datas sont en dur dans `/src/data` et ce sera sûrement remplacé par Elastic Search à un moment
    - Les IDs poseidon servent de lien
    - eposeidon-articles : extrait des articles eposeidon.json
    - faq.json : FAQ avec en plus un lien vers IDs poseidon
    - idcc.json : extrait de legifrance ?
    - themes.js : table qui definit les IDs eposeidon, arborescence, articles associés
    - fiches.js : fiches pratiques
    - L2253.js : referentiel articulation
    - kali.js : extrait du site legifrance https://www.legifrance.gouv.fr/rechConvColl.do

Les résultats sont affichés par `src/Result.js` qui contient tous les "blocs".

⚠ La mise à jour de la branche `master` déclenche une mise à jour sur la démo. (ajouter `[skip ci]` au message de commit pour ne pas deploy)

## Todo

### Data
 - Completer les fichiers dans [data](./data)
 - enrichir les datas pour anticiper des tests de rechecrhe
 - contacts : se procurer liste des contacts par theme/région
 - liens/outils : se procurer liste des contacts par theme/région
 - form feedback

### Tech
 - futur : eposeidon-articles.js : remplacer par une API pour requeter par ID de code/article car +10k articles. voir quelle source de données on utilise pour ça ?

### Divers
 - documenter [src/Articulation.js](./src/Articulation.js)
 - documenter les [règles](https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcblxudGhlbWUtLT5Ye0wyMjUzID99XG5YLS0-MVtMMjI1My0xIDogMTMgdGhlbWVzXVxuWC0tPjJbTDIyNTMtMiA6IDQgdGhlbWVzXVxuWC0tPkF1dHJlXG5cbjEtLT5BMShNZXNzYWdlIEFydGljdWxhdGlvbiAxKVxuMi0tPkEyKE1lc3NhZ2UgQXJ0aWN1bGF0aW9uIDIpXG5BdXRyZS0tPkEzKE1lc3NhZ2UgQXJ0aWN1bGF0aW9uIDMpIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0) ?

### Ideas
 - enrichissement de la FAQ via discourse ou autre outil collaboratif ?

## Intégration Elastic :

A priori Elastic devrait à terme remplacer toutes les sources de données statiques.

### Tags

 - la navigation de tags devrait être "intelligente"
    - proposer en plus des tags/sujets connexes
    - améliorer les suggestions avec ML Invenis + activité sur le site (questions fréquentes, actu...)

### Contenu

 - API code/numero article
 - FAQ : a terme, discourse ou autre outil de federation des questions réponses dans les UD

### Articulation

[TODO : corriger/compléter]

Si un des 13 themes du L2253-1

Accord branche prime sur AE -> afficher article de l'accord de branche (sur theme en question)
⚠ sauf si accord entreprise dispose de garanties au - équivalentes -> afficher article de l'accord de l'entreprise (sur theme en question)

Si un des 4 themes du L2253-2

  - penibilité
  - travailleurs handicapés
  - délégués syndicaux
  - primes travaux dangeureux et insalubres

Si la branche dit qu'elle verouille l'un des 4 themes -> afficher article de l'accord de branche (sur theme en question)

⚠ sauf si accord entreprise dispose de garanties au - équivalentes et a été signé posterieurement à la date d'entrée en vigueur de l'AB -> afficher article de l'accord de l'entreprise (sur theme en question)

Sinon l'AE s'applique même si - favorable -> afficher article de l'accord d'entreprise (sur theme en question)

Si doute : afficher AE+AB et rappeler la regle

Sinon: L2253-3

Si l'AE aborde le thème : -> affiche l'article de l'AE

Si pas d'AE ou n'abord pas le theme et si l'AB l'aborde : -> affiche l'article de l'AB

