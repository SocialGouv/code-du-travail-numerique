# code-du-travail-data

L'image docker DATA contient un dump des documents ainsi que les vecteurs associés à chaque document pour réaliser l'indexation.

## Données

L'ensemble des documents et données utilisés par l'api est stocké dans une base elasticsearch et peut être mis à jour en lançant le script d'indexation sans avoir à re-déployer l'api ou le frontend. Cela à l'exception de la liste des courriers qui fait toujours parti du dataset et des mots du glossaire qui sont importés dans le frontend pour permettre d'afficher des tooltips dynamiques.

Le processus de mise à jour des données est composé de 2 etapes.

### Exportation

Les données utilisées par le site sont issues de packages de données (@socialgouv/*-data). Ces données sont compilées dans un fichier de dump dans un format pret pour l'indexation. Pour créer ce fichier, on utilise la commande.

```sh
$ yarn workspace @cdt/data dump-dev
```

Pour chaque document, il possible aussi de rajouter une représentation vectorielle qui servira à la recherche semantique. Pour cela, il faut que la variable d'environnement NLP_URL soit fournie et pointe vers une instance du service NLP. Reportez-vous au [README.md du projet serving-ml](https://github.com/SocialGouv/serving-ml) pour voir comment démarrer une instance locale du service. Une instance est également accessible à cette URL : https://preprod-serving-ml.dev2.fabrique.social.gouv.fr/ 

```sh
# Exporter les données vers elacticsearch avec leur representation vectorielle (title_vector)
$ NLP_URL=https://preprod-serving-ml.dev2.fabrique.social.gouv.fr yarn workspace @cdt/data dump-dev
```

### Importation dans elasticsearh

Une fois le fichier de dump généré, on utilise la commande 

```sh
$ yarn workspace @cdt/data populate-dev
```
pour créer 2 index elasticsearch( un dédié aux documents, l'autre aux suggestions).


Par defaut, le script d'import va chercher les données dans `/packages/code-du-travail-data/dist/dump.data.json` mais il possible de changer ce chemin avec la variable d'environnement `DUMP_PATH`.


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

Les données provenant de packages externes sont désormais mis à jour de manière automatique via le bot renovate qui maintient les versions de nos dépendances à jour, seuls les outils et les modèles nécessitent une mise à jour des deploiement de l'api et du frontend.

## Related

- [fiches-vdd](https://github.com/SocialGouv/fiches-vdd)
- [legi-data](https://github.com/SocialGouv/legi-data)
- [kali-data](https://github.com/SocialGouv/kali-data)
- [contributions-data](https://github.com/SocialGouv/contributions-data)

## Schéma

[![Schema](./data-diagram.svg)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbkZFLS0-U0lSRU5FW0FQSSBTSVJFTkVdXG5ERkMtLT5GRVxuU2lyZXQySWRjY1tBUEkgU2lyZXQySWRjY11cbkZFLS0-U2lyZXQySWRjY1xuQVBJW0FQSSBOb2RlSlMgQ0RUTl1cbkNbQVBJIENvbnRyaWJ1dGlvbnNdXG5zdWJncmFwaCBBUEkgRElMQVxuRElMQVtBUEkgRElMQSBBSUZFXVxua2FsaS1kYXRhXG5sZWdpLWRhdGFcbmVuZFxuRVNbZGF0YSBidWlsZF1cbkVTLS0-fHBvcHVsYXRlLmpzfEVsYXN0aWNTZWFyY2hcbkRJTEEtLT5rYWxpLWRhdGFcbkRJTEEtLT5sZWdpLWRhdGFcbk1UMi0tPk1UMjJcbk1UMjItLT5FU1xuU0RSLS0-RkVcbkNPVVJSSUVSUy0tPkVTXG5PVVRJTFMtLT5FU1xuT1VUSUxTMi0tPkVTXG5GRVtGcm9udGVuZCBDRFROXVxuUFJFQVZJUzItLT5GRVxuUFJFQ0FSSVRFMi0tPkZFXG5MSUNFTkNJRU1FTlQyLS0-RkVcbkMyLS0-RVNcbkMtLT5DMlxuc3ViZ3JhcGggR0lUIENEVE5cbkMyW2NvbnRyaWJ1dGlvbnMuZGF0YS5qc29uXVxuc3ViZ3JhcGggZ2RvY1xuUFJFQVZJUzJbcHJlYXZpcy5kYXRhLmpzb25dXG5QUkVDQVJJVEUyW3ByZWNhcml0ZS5kYXRhLmpzb25dXG5MSUNFTkNJRU1FTlQyW2xpZW5jaWVtZW50LmRhdGEuanNvbl1cbmVuZFxuTVQyW2ZpY2hlcy1tdC5qc29uXVxuTVQyMltmaWNoZXMtbXQtc3BsaXQuanNvbl1cbnN1YmdyYXBoIG1hbnVlbFxuU0RSW3NlcnZpY2VzLWRlLXJlbnNlaWduZW1lbnQuanNvbl1cbkNPVVJSSUVSU1tjb3VycmllcnMuanNvbl1cbk9VVElMU1tvdXRpbHMuanNvbl1cbk9VVElMUzJbZXh0ZXJuYWxzLmpzb25dXG5TWU5bc3lub255bWVzLmpzb25dXG5TVFBbc3RvcHdvcmRzLmpzb25dXG5lbmRcbnN1YmdyYXBoIGRhdGFmaWxsZXJcbkRGQVtwcmVxdWFsaWZpZWQuZGF0YS5qc29uXVxuREZCW3RoZW1lcy5kYXRhLmpzb25dXG5ERkNbZ2xvc3NhcnkuZGF0YS5qc29uXVxuREZEW2FncmVlbWVudHMuZGF0YS5qc29uXVxuZW5kXG5lbmRcbkRGQS0tPkFQSVxuREZELS0-RVNcbkRGQi0tPkVTXG5rYWxpLWRhdGFba2FsaS1kYXRhXS0tPkVTXG5sZWdpLWRhdGFbbGVnaS1kYXRhXS0tPkVTXG5TUFtmaWNoZXMtdmRkXS0tPkVTXG5NVFtTaXRlIE1UXS0tPnxzY3JhcGluZ3xNVDJcbkVTLS0-fGR1bXAuanN8RHVtcFtkdW1wLmRhdGEuanNvbl1cbkR1bXAtLT5OTFBbQXBpIE5MUF1cbkVTLS0-RkVcbnN1Z2dlc3Rlci5kYXRhLnR4dC0tPkVsYXN0aWNTZWFyY2hcbkVsYXN0aWNTZWFyY2gtLT5BUElcbk5MUC0tPkFQSVxuRkUtLT5BUElcblNZTi0tPkVTXG5TVFAtLT5FUyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)
