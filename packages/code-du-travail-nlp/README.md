# API NLP

Cette api en python est appellée par frontend afin de proposer des suggestion de recherche en fonction de la requete de l'utilisateur.

## Pré-requis

Vous devez avoir python 3.7 installé en local sur votre machine

## Données utilisée.

L'api de suggestion utilise des données pour faire des suggestions
Ces données sont montées sur un volume docker. Lors du premier lancement ou pour mettre à jour
le jeu de donnée, vous pouvez modifier la variable d'environnement `SUGGEST_DATA_URL` et
lancer le script `scripts download-nlp-data.sh` pour récupérer d'autres données.
`SUGGEST_DATA_URL` contient l'url d'un gist qui liste plusieurs gist de données,
ceux-ci sont ensuite ré-assemblé dans un seul fichier.
Les données sont stockéss sur plusieurs gist car les documents sont volumineux.
Pour exemple, l'url

Pour spliter un fichier texte en plusieur fichier.

```
split -l 300000 data_raw.txt data-part.
```

## Installation en local

```
python -m venv venv
. venv/bin/activate
pip install -r requirements.txt
```

## Démarer l'api en local

L'api utise Flask et tourne sur le port 5000.

```
. venv/bin/activate
FLASK_ENV=development FLASK_APP=api flask run
```

## Desactiver venv

```
deactivate
```

## Data

Pour l'instant, on héberge les données dans des hébergées dans gist anonymes. 
Le script pour télécharger les données est exéctuté avant de lancer le container nlp



