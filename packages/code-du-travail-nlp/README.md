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
:bulb: voir [Data](#Data) pour l'ajout des données

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

La donnée indexée dans l'api search est crée au moment du build de l'image de base:
in root directory:

`docker build . -t cdtn_base`

puis dans le package nlp:

`docker build --build-arg BASE_IMAGE=cdtn_base --build-arg SUGGEST_DATA_URL="https://gist.githubusercontent.com/ArmandGiraud/aaa65ed694e6b8d46918d44e41bae9e4/raw/2b5fa5ff67d87bbf08b33fecfe2fb98e15c73a06/data-test.txt" . -t nlp --no-cache`

Pour lancer le container nlp:

`docker run -e NLP_PORT=5000 -p 5000:5000 nlp`

Le script pour télécharger les données est exéctuté avant de lancer le container nlp
