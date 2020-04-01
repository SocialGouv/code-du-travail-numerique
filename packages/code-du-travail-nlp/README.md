# API NLP

Cette api en python est utilisée pour transformer une requete en vecteur pour la recherche sémantique.

## Pré-requis

Vous devez avoir python 3.7 installé en local sur votre machine

## Installation en local

```sh
python -m venv venv
. venv/bin/activate
pip install -r requirements.txt
```

## Démarer l'api python

L'api utise Flask et tourne sur le port 5000.

```sh
. venv/bin/activate
FLASK_ENV=development FLASK_APP=api flask run
```

## Image Docker

Contruire l'image nlp

```sh
$ docker build -t cdtn_nlp:local .
```

lancer l'image nlp localement

```sh
$ docker run --rm --name cdtn-nlp -p 5000:5000 cdtn_nlp:local
```
