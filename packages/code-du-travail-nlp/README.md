# API NLP

Cette api en python est appellée par frontend afin de proposer des suggestion de recherche en fonction de la requete de l'utilisateur. L'api est aussi utilisé pour transformer une requete en vecteur pour la recherche sémantique.

## Pré-requis

Vous devez avoir python 3.7 installé en local sur votre machine

## Données utilisée

Les données de suggestions sont hébergés sur des plusieurs gist.
Le point d'entrés est un gist qui référence les gist du dataset.
Pour spliter un fichier texte en plusieur fichier.
```sh
split -l 300000 data_raw.txt data-part.
```

Vous pouvez modifier l'url des données au moment du build de l'image en définissant l'argument
`--build-arg SUGGEST_DATA_URL=http//gist.url`.

## Installation en local

```sh
python -m venv venv
. venv/bin/activate
pip install -r requirements.txt
```

## Démarer l'api python

L'api utise Flask et tourne sur le port 5000.
:bulb: voir [Data](#Data) pour l'ajout des données. 

```sh
. venv/bin/activate
FLASK_ENV=development FLASK_APP=api flask run
```

## Desactiver venv

```sh
deactivate
```

## Docker

L'image docker NLP contient un dump des documents ainsi que leur vecteur associé.
Un premier fichier de dump (provenant de l'image monorepo) et copié dans l'image.
L'image continer un deuxieme fichier de dump où les documents (sauf les articles du code du travail) sont enrichis d'un vecteur qui servira pour la recherche sémantique.  
Ce travail est réalisé par le script `scripts/dump.py`. Il est possible de spécifier le chemin du fichier source via la variable d'environement `DUMP_PATH`
Ce dump est par la suite utilisé par le container [DATA](../code_du_travail_nlp/README.md) pour réaliser l'indexation.

Pour cela, il faut d'abord une image du monorepo.

```sh
# Creation d'une image locale
# Depuis le dossier racine
$ docker build . -t cdtn_master:local
```

ou 

```sh
# Récuperation d'une image depuis l'annuaire gitlab
$ docker pull registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash>

$ docker tag registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash> cdtn_master:local
```

## Démarer l'api nlp en local via docker

```sh
# Creation de l'image nlp
$ docker build -t cdtn_nlp:local --build-arg BASE_IMAGE=cdtn_master:local .
# Démarrage en local
$ docker run --rm \
    --name cdtn_nlp
    -p 5000:5000
    -e NLP_PORT=5000
    cdtn_nlp:local
```

## Démarer l'api nlp en local via docker-compose

Copier la configuration `docker-compose.override.dev.yml dans le docker-compose.override.yml

```sh
$ docker-compose up elasticsearch nlp_api
```
