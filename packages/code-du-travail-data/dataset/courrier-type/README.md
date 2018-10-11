# Indexation des courrier type

Afin de pouvoir proposer à l'utilisateur des courriers type en fonction de sa recherche,
Il faut pouvoir indexer les differents courriers disponibles. 

Les courriers sont stockés dans le dossier `/dataset/courrier-type/docx`. Afin de pouvoir qualifier chaque courrier, un fichier json (`/dataset/courrier-type/courriers.json`) permet de faire le lien entre un fichier de courrier type et ses métadonnées.

Pour générer le fichier qui servira à l'indexation, la commande
```
$ npm start
``` 
va générer le fichier `/dataset/export-courriers.json` qui sera ensuite indexé par ElasticSearch.

**Important**: Le contenu des fichiers n'est pas indéxé. Seules les metadonnée présentent dans le fichier `/dataset/courriers-type/courriers.json` sont utilisées.
