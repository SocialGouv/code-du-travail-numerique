# code-du-travail-data

L'image docker DATA contient un dump des documents ainsi que les vecteurs associés à chaque documents.
Ce fichier est récupéré de l'image [NLP](../code_du_travail_nlp/README.md#Docker)
Ce document est par la suite utilisé par le container data pour réaliser l'indexation.

## Données

Par defaut, le script d'indexation va chercher les données dans l'arborescence `/packages/code-du-travail-nlp/data` 
mais il possible de changer ce chemin avec la variable d'environnement `DUMP_PATH`.

### Génération en local

Une premiere version du dump (sans les vecteurs) peut être générée via la commande.

```sh
$ yarn workspace @cdt/data -s dump > cdtn.data.json
```

Dans cette version du dump, les documents ne contiennent pas les vecteurs pour la recherche sémantique.
Il faut ensuite lancer le script de dump de l'api nlp pour rajouter les vecteurs.

### Récupération depuis une image

Si vous disposez d'une image nlp sur votre machine vous pouvez copier le fichier de dump complet 
via la commande docker suivante.

```sh
$ docker run --rm --entrypoint cat cdtn_nlp:local  /app/data/dump.tf.json  > dump.data.json
```

## Schéma

[![Schema](./data-diagram.svg)](https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbkZFLS0-U0lSRU5FW0FQSSBTSVJFTkVdXG5TaXJldDJJZGNjW0FQSSBTaXJldDJJZGNjXVxuRkUtLT5TaXJldDJJZGNjXG5ERltkYXRhZmlsbGVyXVxuQVBJW0FQSSBOb2RlSlMgQ0RUTl1cbkNbQVBJIENvbnRyaWJ1dGlvbnNdXG5ESUxBW0FQSSBESUxBIEFJRkVdXG5rYWxpLWRhdGFcbkVTW2RhdGEgYnVpbGRdXG5FUy0tPnxwb3B1bGF0ZS5qc3xFbGFzdGljU2VhcmNoXG5ESUxBLS0-a2FsaS1kYXRhXG5ESUxBLS0-bGVnaS1kYXRhXG5NVDItLT5FU1xuU1AyLS0-RVNcblNEUi0tPkZFXG5DT1VSUklFUlMtLT5FU1xuT1VUSUxTLS0-RVNcbkZFW0Zyb250ZW5kIENEVE5dXG5QUkVBVklTLS0-UFJFQVZJUzJcbkMtLT5FU1xuc3ViZ3JhcGggR0lUIENEVE5cblBSRUFWSVMyW3ByZWF2aXMuZGF0YS5qc29uXVxuQ09VUlJJRVJTW2V4cG9ydC1jb3VycmllcnMuanNvbl1cbk9VVElMU1tvdXRpbHMuanNvbl1cblNQMltmaWNoZXMtc3AuanNvbl1cbk1UMltmaWNoZXMtbXQuanNvbl1cblNEUltzZXJ2aWNlcy1kZS1yZW5zZWlnbmVtZW50Lmpzb25dXG5ERkFbZGF0YWZpbGxlci9wcmVxdWFsaWZpZWQuZGF0YS5qc29uXVxuREZCW2RhdGFmaWxsZXIvdGhlbWVzLmRhdGEuanNvbl1cbkRGQ1tkYXRhZmlsbGVyL2dsb3NzYXJ5LmRhdGEuanNvbl1cblNZTltzeW5vbnltZXMuanNvbl1cblNUUFtzdG9wd29yZHMuanNvbl1cbmVuZFxuREYtLT58cmVxdWV0ZXN8REZBXG5ERi0tPnx0aGVtZXN8REZCXG5ERi0tPnxnbG9zc2FpcmV8REZDXG5QUkVBVklTW0dEb2MgcHLDqWF2aXMgZMOpbWlzc2lvbl1cbkRGQS0tPkFQSVxuREZCLS0-RVNcbmthbGktZGF0YVtzb2NpYWxnb3V2L2thbGktZGF0YV0tLT5FU1xubGVnaS1kYXRhW3NvY2lhbGdvdXYvbGVnaS1kYXRhXS0tPkVTXG5TUFtzb2NpYWxnb3V2L2ZpY2hlcy12ZGRdLS0-U1AyXG5NVFtTaXRlIE1UXS0tPnxzY3JhcGluZ3xNVDJcbkVTLS0-fGR1bXAuanN8RHVtcFtkdW1wLmRhdGEuanNvbl1cbkR1bXAtLT5OTFBbQXBpIE5MUF1cbkVTLS0-RkVcbnN1Z2dlc3Rlci5kYXRhLnR4dC0tPkVsYXN0aWNTZWFyY2hcbkVsYXN0aWNTZWFyY2gtLT5BUElcblNZTi0tPkVsYXN0aWNTZWFyY2hcblNUUC0tPkVsYXN0aWNTZWFyY2hcbk5MUC0tPkFQSVxuRkUtLT5BUEkiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)
