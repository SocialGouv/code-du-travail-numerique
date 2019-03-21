# API NLP

Cette api en python est appellée par frontend afin de proposer des suggestion de recherche en fonction de la requete de l'utilisateur.

## Pré-requis

Vous devez avoir python 3.7 installé en local sur votre machine

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
