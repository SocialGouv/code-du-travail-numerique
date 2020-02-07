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

Cette API a besoin d'un fichier `data/dump.json` produit par l'image docker du monorepo.

Vous pouvez la récupérer ici :

```sh
$ CDTN_REGISTRY=registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique
$ docker run \
        --rm \
        --entrypoint cat $CDTN_REGISTRY:$(git rev-parse origin/master) /app/packages/code-du-travail-data/dist/dump.data.json \
        > ./data/dump.json
```

## Démarer l'api python

L'api utise Flask et tourne sur le port 5000.

```sh
. venv/bin/activate
FLASK_ENV=development FLASK_APP=api flask run
```
