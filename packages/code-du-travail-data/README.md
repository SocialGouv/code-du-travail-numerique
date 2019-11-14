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

[![Schema](./data-diagram.svg)](https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbkZFLS0-U0lSRU5FW0FQSSBTSVJFTkVdXG5XZWV6LmNzdi0tPlNpcmV0MklkY2NbQVBJIFNpcmV0MklkY2NdXG5GRS0tPlNpcmV0MklkY2NcblxuREZbZGF0YWZpbGxlcl1cbkFQSVtBUEkgTm9kZUpTIENEVE5dXG5DW0FQSSBDb250cmlidXRpb25zXVxuRElMQVtBUEkgRElMQSBBSUZFXVxua2FsaS1kYXRhXG5FU1tkYXRhIGJ1aWxkXVxuRVMtLT58cG9wdWxhdGUuanN8RWxhc3RpY1NlYXJjaFxuRElMQS0tPmthbGktZGF0YVxuRElMQS0tPmxlZ2ktZGF0YVxuTVQyLS0-RVNcblNQMi0tPkVTXG5TRFItLT5GRVxuQ09VUlJJRVJTLS0-RVNcbk9VVElMUy0tPkVTXG5GRVtGcm9udGVuZCBDRFROXVxuUFJFQVZJUy0tPlBSRUFWSVMyXG5DLS0-RVNcbnN1YmdyYXBoIEdJVCBDRFROXG5QUkVBVklTMltwcmVhdmlzLmRhdGEuanNvbl1cbkNPVVJSSUVSU1tleHBvcnQtY291cnJpZXJzLmpzb25dXG5PVVRJTFNbb3V0aWxzLmpzb25dXG5TUDJbZmljaGVzLXNwLmpzb25dXG5NVDJbZmljaGVzLW10Lmpzb25dXG5TRFJbc2VydmljZXMtZGUtcmVuc2VpZ25lbWVudC5qc29uXVxuREZBW2RhdGFmaWxsZXIvcHJlcXVhbGlmaWVkLmRhdGEuanNvbl1cbkRGQltkYXRhZmlsbGVyL3RoZW1lcy5kYXRhLmpzb25dXG5ERkNbZGF0YWZpbGxlci9nbG9zc2FyeS5kYXRhLmpzb25dXG5TWU5bc3lub255bWVzLmpzb25dXG5TVFBbc3RvcHdvcmRzLmpzb25dXG5lbmRcbkRGLS0-fHJlcXVldGVzfERGQVxuREYtLT58dGhlbWVzfERGQlxuREYtLT58Z2xvc3NhaXJlfERGQ1xuUFJFQVZJU1tHRG9jIHByw6lhdmlzIGTDqW1pc3Npb25dXG5ERkEtLT5BUElcbkRGQi0tPkVTXG5rYWxpLWRhdGFbc29jaWFsZ291di9rYWxpLWRhdGFdLS0-RVNcbmxlZ2ktZGF0YVtzb2NpYWxnb3V2L2xlZ2ktZGF0YV0tLT5FU1xuU1Bbc29jaWFsZ291di9maWNoZXMtdmRkXS0tPlNQMlxuTVRbU2l0ZSBNVF0tLT58c2NyYXBpbmd8TVQyXG5FUy0tPnxkdW1wLmpzfER1bXBbZHVtcC5kYXRhLmpzb25dXG5EdW1wLS0-TkxQW0FwaSBOTFBdXG5FUy0tPkZFXG5zdWdnZXN0ZXIuZGF0YS50eHQtLT5FbGFzdGljU2VhcmNoXG5FbGFzdGljU2VhcmNoLS0-QVBJXG5TWU4tLT5FbGFzdGljU2VhcmNoXG5TVFAtLT5FbGFzdGljU2VhcmNoXG5OTFAtLT5BUEkiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)
