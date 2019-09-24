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

## Démarer l'api en local

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

$ docker tag registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash> ctdn_master:local
```

## Démarer l'api nlp en local via docker

```sh
# Creation de l'image nlp
$ docker build -t cdtn_nlp:local --build-arg BASE_IMAGE=ctdn_master:local .
# Démarrage en local
$ docker run --rm \
    --name cdtn_nlp
    -p 5000:5000
    -e NLP_PORT=5000  nlp
    cdtn_nlp:local
```

## Démarer l'api nlp en local via docker-compose

Copier la configuration `docker-compose.override.dev.yml dans le docker-compose.override.yml

```sh
$ docker-compose up elasticsearch nlp_api
```


Le script pour télécharger les données est exéctuté avant de lancer le container nlp
