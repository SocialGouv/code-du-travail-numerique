# Bonnes pratiques pour le dev des modèles

## Tests

Nous avons :

- Un dossier par CC avec dedans un dossier par simulateur
- Un dossier `legal` pour la code du travail

Exemple :

```txt
___test___
/legal
 /preavis.retraite
   references.spec.ts
   depart.mise.specs.ts // test léger, on a un seul fichier
 /batiment.etam
   /preavis.retraite
     references.spec.ts
     depart.specs.ts // test plus lourd, on divise
     mise.specs.ts
 /batiment.etam
   /preavis.retraite
     references.spec.ts
     depart.cadre.specs.ts // test vraiment lourd !
     depart.etam.specs.ts
     mise.specs.ts
```
