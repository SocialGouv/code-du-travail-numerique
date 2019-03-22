# API NLP

Cette api en python est appellée par frontend afin de proposer des suggestion de recherche en fonction de la requete de l'utilisateur.

## Pré-requis

Vous devez avoir python 3.7 installé en local sur votre machine

## Données utilisée.

L'api de suggestion utilise des données pour faire des suggestions
Ces données sont montées sur un volume docker. Lors du premier lancement ou pour mettre à jour
le jeu de donnée, vous pouvez modifier la variable d'environnement `SUGGEST_DATA_URL` et
lancer le script `scripts download-nlp-data.sh` pour récupérer d'autres données.
Les données sont stockéss sur un gist et il faut récupérer l'adresse de l'archive.

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
FLASK_ENV=development FLASK_APP=api/app flask run
```

## Desactiver venv

```
deactivate
```
