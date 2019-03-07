# API NLP

Cette api en python est appellée par l'api nodejs avant de faire la requete elasticsearch
pour nettoyer la requete en amont.

## Pré-requis

Vous devez avoir python 3.7 installé en local sur votre machine

## Installation en local

```
python -m venv venv
. venv/bin/activate
pip install -r requirements.txt
python -m spacy download fr_core_news_md
```

## Démarer l'api

L'api utise Flask et tourne sur le port 5000.

```
. venv/bin/activate && FLASK_ENV=development FLASK_APP=api/app flask run
```

## Desactiver venv

```
deactivate
```
