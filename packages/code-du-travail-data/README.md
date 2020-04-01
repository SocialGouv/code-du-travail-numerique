# code-du-travail-data

L'image docker DATA contient un dump des documents ainsi que les vecteurs associés à chaque document pour réaliser l'indexation.

## Données

Par defaut, le script d'indexation va chercher les données dans `/packages/code-du-travail-nlp/data/dist/dump.data.json` mais il possible de changer ce chemin avec la variable d'environnement `DUMP_PATH`.

### Génération en local

Une premiere version du dump (sans les vecteurs) peut être générée via la commande.

```sh
$ yarn workspace @cdt/data dump-dev
```

Pour réaliser un dump avec les vecteurs semantiques, il est necessaire de spécifier la variable d'environnement `NLP_URL`. Reporter vous au [README.md du projet nlp](../code-du-travail-nlp/README.md) pour voir comment démarrer une instance le service

```sh
$ NLP_URL=http://localhost:5000 yarn workspace @cdt/data dump-dev
```

### Récupération depuis l'image master

Si vous disposez d'une image nlp sur votre machine vous pouvez copier le fichier de dump complet
via la commande docker suivante.

```sh
docker run \
   --rm --entrypoint cat \
   registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique/data:$(git rev-parse origin/master) \
   /app/dist/dump.data.json \
   >! packages/code-du-travail-data/dist/dump.tf.json
```

## Related

- [fiches-vdd](https://github.com/SocialGouv/fiches-vdd)
- [legi-data](https://github.com/SocialGouv/legi-data)
- [kali-data](https://github.com/SocialGouv/kali-data)

## Schéma

[![Schema](./data-diagram.svg)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbkZFLS0-U0lSRU5FW0FQSSBTSVJFTkVdXG5ERkMtLT5GRVxuU2lyZXQySWRjY1tBUEkgU2lyZXQySWRjY11cbkZFLS0-U2lyZXQySWRjY1xuQVBJW0FQSSBOb2RlSlMgQ0RUTl1cbkNbQVBJIENvbnRyaWJ1dGlvbnNdXG5zdWJncmFwaCBBUEkgRElMQVxuRElMQVtBUEkgRElMQSBBSUZFXVxua2FsaS1kYXRhXG5sZWdpLWRhdGFcbmVuZFxuRVNbZGF0YSBidWlsZF1cbkVTLS0-fHBvcHVsYXRlLmpzfEVsYXN0aWNTZWFyY2hcbkRJTEEtLT5rYWxpLWRhdGFcbkRJTEEtLT5sZWdpLWRhdGFcbk1UMi0tPk1UMjJcbk1UMjItLT5FU1xuU0RSLS0-RkVcbkNPVVJSSUVSUy0tPkVTXG5PVVRJTFMtLT5FU1xuT1VUSUxTMi0tPkVTXG5GRVtGcm9udGVuZCBDRFROXVxuUFJFQVZJUzItLT5GRVxuUFJFQ0FSSVRFMi0tPkZFXG5MSUNFTkNJRU1FTlQyLS0-RkVcbkMyLS0-RVNcbkMtLT5DMlxuc3ViZ3JhcGggR0lUIENEVE5cbkMyW2NvbnRyaWJ1dGlvbnMuZGF0YS5qc29uXVxuc3ViZ3JhcGggZ2RvY1xuUFJFQVZJUzJbcHJlYXZpcy5kYXRhLmpzb25dXG5QUkVDQVJJVEUyW3ByZWNhcml0ZS5kYXRhLmpzb25dXG5MSUNFTkNJRU1FTlQyW2xpZW5jaWVtZW50LmRhdGEuanNvbl1cbmVuZFxuTVQyW2ZpY2hlcy1tdC5qc29uXVxuTVQyMltmaWNoZXMtbXQtc3BsaXQuanNvbl1cbnN1YmdyYXBoIG1hbnVlbFxuU0RSW3NlcnZpY2VzLWRlLXJlbnNlaWduZW1lbnQuanNvbl1cbkNPVVJSSUVSU1tjb3VycmllcnMuanNvbl1cbk9VVElMU1tvdXRpbHMuanNvbl1cbk9VVElMUzJbZXh0ZXJuYWxzLmpzb25dXG5TWU5bc3lub255bWVzLmpzb25dXG5TVFBbc3RvcHdvcmRzLmpzb25dXG5lbmRcbnN1YmdyYXBoIGRhdGFmaWxsZXJcbkRGQVtwcmVxdWFsaWZpZWQuZGF0YS5qc29uXVxuREZCW3RoZW1lcy5kYXRhLmpzb25dXG5ERkNbZ2xvc3NhcnkuZGF0YS5qc29uXVxuREZEW2FncmVlbWVudHMuZGF0YS5qc29uXVxuZW5kXG5lbmRcbkRGQS0tPkFQSVxuREZELS0-RVNcbkRGQi0tPkVTXG5rYWxpLWRhdGFba2FsaS1kYXRhXS0tPkVTXG5sZWdpLWRhdGFbbGVnaS1kYXRhXS0tPkVTXG5TUFtmaWNoZXMtdmRkXS0tPkVTXG5NVFtTaXRlIE1UXS0tPnxzY3JhcGluZ3xNVDJcbkVTLS0-fGR1bXAuanN8RHVtcFtkdW1wLmRhdGEuanNvbl1cbkR1bXAtLT5OTFBbQXBpIE5MUF1cbkVTLS0-RkVcbnN1Z2dlc3Rlci5kYXRhLnR4dC0tPkVsYXN0aWNTZWFyY2hcbkVsYXN0aWNTZWFyY2gtLT5BUElcbk5MUC0tPkFQSVxuRkUtLT5BUElcblNZTi0tPkVTXG5TVFAtLT5FUyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)
