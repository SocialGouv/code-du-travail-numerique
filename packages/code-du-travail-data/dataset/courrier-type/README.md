# Indexation des courrier type

Afin de pouvoir proposer à l'utilisateur des courriers type en fonction de sa recherche,
Il faut pouvoir indexer les differents courriers disponibles.

Les courriers sont stockés dans le dossier [`./docx`](./docx). Afin de pouvoir qualifier chaque courrier, un fichier json [`./courriers.json`](./courriers.json) permet de faire le lien entre un fichier de courrier type et ses métadonnées.

Un fichier `export-courriers.json` contenant une version HTML des modèles et leur metadonnées est créé avant l'indexation dans Elastic.

