# Sources de données

Ces fichiers sont utilisés pour créer les indexes Elastic Search.

| Fichier                                                                              | Source                                                                                                                      |   Date   | Usage                                       |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | :------: | ------------------------------------------- |
| [faq.json](./faq.json)                                                               | DGT                                                                                                                         |    -     | FAQ                                         |
| [faq-conventions-collectives.json](./faq-conventions-collectives.json)               | DGT                                                                                                                         |    -     | FAQ spécifiques aux conventions collectives |
| [code-du-travail-2018-01-01.json](./code-du-travail/code-du-travail-2018-01-01.json) | DILA - Extrait legilibre                                                                                                    | 01/01/18 | Texte des articles                          |
| [themes.csv](./code-du-travail/themes.csv)                                           | ePoseidon                                                                                                                   |    -     | Liens articles/tags                         |
| [fiches-sp-travail.json](./fiches_service_public/fiches-sp-travail.json)             | [data.gouv](https://data.gouv.fr/fr/datasets/service-public-fr-guide-vos-droits-et-demarches-professionnels-entreprises/#_) | 19/10/18 | FAQ service-public travail                  |
| [fiches-min-travail.json](./fiches_ministere_travail/fiches-min-travail.json)        | Scrap https://travail-emploi.gouv.fr/                                                                                       | 20/07/18 | Fiches ministère du travail                 |
| [kali.json](./kali.json)                                                             | Scrap page LegiFrance                                                                                                       | 05/04/18 | Liens conventions collectives               |
| [idcc.json](./idcc.json)                                                             | Scrap page LegiFrance                                                                                                       | 05/04/18 | Liens conventions collectives               |
| [export-courriers.json](./export-courriers.json)                                     | -                                                                                                                           |    -     | Liste des modèles de courrier               |
| [outils.json](./outils.json)                                                         | -                                                                                                                           |    -     | Liste des outils disponibles                |
| [synonyms.json](./synonyms.json)                                                     | -                                                                                                                           |    -     | Synonymes                                   |
| [TESS.json](./thesaurus/TESS.json)                                                   | -                                                                                                                           | 05/07/18 | Synonymes                                   |

# Génération des fichiers JSON

## Obtenir un fichier JSON depuis un XML ePoseidon

Vérifier le chemin du XML dans la constante `INPUT_XML` du fichier `code_du_travail/eposeidon_script/index.js`, puis :

```
$ cd dataset/code_du_travail/eposeidon_script
$ npm --version
5.10.0
$ node --version
v9.11.2
$ npm install
$ node index.js > ../nomenclatures-`date +%Y%m%d`.json
```

## Obtenir un fichier JSON des fiches du ministère du travail

```
$ cd dataset/fiches_ministere_travail
$ node ministere-travail-extract-fiches.js > fiches-min-travail.json
```

## Obtenir un fichier JSON des fiches du service public

Recupérer les archives

- https://www.data.gouv.fr/fr/datasets/service-public-fr-guide-vos-droits-et-demarches-particuliers/
- https://www.data.gouv.fr/fr/datasets/service-public-fr-guide-vos-droits-et-demarches-professionnels-entreprises/
  et extraire les fichiers dans le dossiers `dataset/fiches_service_public/data`

```
$ cd dataset/fiches_service_public
$ node service-public-extract-fiches.js > fiches-sp-travail.json
```

## Schema des donnees outils.json, courriers-type.json

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Contenu rédigés du code du travail",
  "description": "A code-du-travail-content-FF",
  "type": "object",
  "properties": {
    "questions": {
      "description": "une liste de questions à laquelle le contenu répond",
      "type": "Array",
      "items": {
        "type": "string"
      }
    },
    "tags": {
      "theme": {
        "description": "le theme (theme-front) correspondant au contenu",
        "type": "string"
      },
      "sousTheme": {
        "description": "le sousTheme (theme-front) correspondant au contenu",
        "type": "string"
      },
      "branche": {
        "description": "la branche qui s'applique pour cette question",
        "type": "string"
      },
      "profil": {
        "description": "Les profil (employeur / salarié) auquels le contenu correspond",
        "type": "string"
      },
      "type_de_contrat": {
        "description": "Les types de contrat auquels le contenu correspond",
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "type_entreprise": {
        "description": "Les types d'entreprise auquels le contenu correspond",
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "travailleur_particulier": {
        "description": "Les cas de travailleur particuliers auquels le contenu correspond",
        "type": "string"
      },
      "catégorie": {
        "description": "Les catégorie de salarié auquels le contenu correspond",
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "critere_niveau": {
        "description": "Le niveau (grade / echelon) correspondant au contenu ",
        "type": "string"
      }
    },
    "themes": {
      "description": "une liste d'identifiant eposeidon auquel le contenu correspond",
      "type": "array",
      "items": {
        "type": "number"
      }
    },
    "source": {
      "description": "le service qui a fourni cette information",
      "type": "string"
    },
    "date": {
      "description": "la date de publication de cette information",
      "type": "string"
    }
  },
  "required": ["date", "theme", "themes"]
}
```
