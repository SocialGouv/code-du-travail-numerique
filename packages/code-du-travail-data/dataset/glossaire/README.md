# Glossary

This project extracts glossary terms from a [google spreadsheet](https://docs.google.com/spreadsheets/d/1WrmotMiu4kBxRTKW47Q3CzNjxc0GycfAilSHcXH_hfA/edit#gid=0) and transform the result into a json file.

## Generate the glossary file

```bash
$ yarn start
```

## Sample content
```json
[
  {
    "term": "Accord interentreprises",
    "definition_cdtn": "Accord collectif conclu au niveau de plusieurs entreprises n'appartenant pas au même groupe."
  },
  {
    "term": "accord national interprofessionnel",
    "abbrev": "ANI",
    "synonym": "accords de grenelle \naccords matignon \naccords parodi",
    "definition": "Accord collectif négocié au niveau national, couvrant l’ensemble des secteurs d’activités professionnelles et validé selon des modalités précisées par l’article L. 2232-2 du code du travail",
    "definition_cdtn": "Accord collectif conclu au niveau national qui s'applique à plusieurs branches professionnelles. "
  },
  {
    "term": "protocole d'accord préélectoral",
    "abbrev": "PAP",
    "synonym": "protocole préélectoral\naccord préélectoral",
    "definition_cdtn": " Accord spécifique négocié entre l'employeur et les syndicats pour organiser les élections professionnelles des représentants du personnel (modalités d'organisation et de déroulement des élections, répartition des sièges...)"
  }
]
```
