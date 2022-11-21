# Bonnes pratiques de dev

## Nommage des fichiers et répertoires

Nous utilisons `hyphen-case` (`kebab-case`) par défaut et du `PascalCase` si c'est composant react (même pour les tests) pour le nommage des fichiers et répertoires.

## La règle de l'index.ts

Pour chaque dossier, on va placer un `index.ts` à la racine qui indique les fonctions disponibles dans ce dossier.

Cette organisation dispose de deux avantages :

1. Exposer les fonctions d'un dossier vers d'autres dossiers parents/voisins

Exemple :

```
|_ Feature1
  |_ Components
    |_ generateIntro.tsx
    |_ Intro.tsx
    |_ Card.tsx
    |_ index.tsx
  |_ Feature1.tsx
  |_ index.tsx
|_ Feature2
  |_ Feature2.tsx
  |_ index.tsx
```

On a les composants `Intro.tsx` et `Card.tsx` qui sont exportés dans l'`index.tsx` : 

```js
// Feature1/Components/index.tsx
export { default as Intro } from "./Intro";
export { default as Card } from "./Card";

// Ceci est la même chose que :

import Intro from "./Intro";
import Card from "./Card";

export { Intro, Card };
```

Note : Nous préférons la première écriture qui est plus minimaliste.

Les deux composants sont donc accessibles à partir d'autres composants dans l'app, là où `generateIntro.tsx` n'est disponible que pour les composants dans le même dossier. 

*Note : Ceci est une convention et il n'est pas possible d'empêcher l'import `generateIntro.tsx` ailleurs dans le code en javascript.*

2. Simplifier les imports

Dans l'exemple ci-dessus, l'import des composants pour la feature 1 se fait donc sur une ligne :

```js
import { Intro, Card } from "./Components";

// si on n'avait pas utiliser d'index.tsx, on aurait eu

import Intro from "./Components/Intro";
import Card from "./Components/Card";
```

Note : Nous n'appliquons pas le `Folder Components` qui consiste à placer tous les composants dans un dossier avec un fichier `index.tsx`. 
Si le composant est simple, nous allons créer directement le fichier avec le nom du composant dans le dossier comme dans l'exemple ci-dessus.

## Tests

- Les tests d'une même famille sont regroupés dans un describe

```typescript
describe("Départ à la retraite", () => {
  test("Pour un employé possédant 4 mois d'ancienneté, son préavis devrait être 2 mois",
  [...]
  test("Pour un employé possédant 18 mois d'ancienneté, son préavis devrait être 2 mois",
  [...]
});
```
