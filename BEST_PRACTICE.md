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

_Note : Ceci est une convention et il n'est pas possible d'empêcher l'import `generateIntro.tsx` ailleurs dans le code en javascript._

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

## Changement d'URL ou suppression de page (SEO)

Les migrations et suppressions de pages ont coûté beaucoup de trafic. Le passage des pages « congés pour événements familiaux » au nouveau format d'URL, avec une double redirection, a fait perdre 155 000 à 190 000 clics (audit SEO, septembre 2026). Toute mise en production qui **change ou supprime une URL** doit donc remplir cette checklist. Elle fait partie de la définition de « terminé » et se retrouve dans le template de PR.

- [ ] **Redirection 301 en un seul saut** : chaque ancienne URL arrive directement sur l'URL finale.
  - Ajouter l'entrée dans `packages/code-du-travail-frontend/redirects.json` avec `"statusCode": 301`, et non `"permanent": true` qui produit une 308.
  - La destination est l'URL **finale**. Elle ne doit pas être la source d'une autre redirection, ni une page qui redirige à son tour (`permanentRedirect`/`redirect` côté page, par exemple pour ajouter un slug). Le test `scripts/__tests__/redirects.test.ts` détecte les chaînes internes à `redirects.json`. Les redirections faites par une page sont à vérifier à la main :

    ```sh
    curl -sI https://code.travail.gouv.fr/<ancienne-url> | grep -iE "^HTTP|^location"
    # attendu : un seul 301, puis un 200 sur la location
    ```

  - Une page supprimée sans équivalent redirige vers la page la plus proche (thème, page parente) plutôt que de renvoyer une 404.

- [ ] **Sitemap à jour** : `/sitemap.xml` est servi depuis le bucket, il est généré à l'export des contenus. Après l'export, vérifier que l'ancienne URL n'y figure plus et que la nouvelle y est.
- [ ] **Liens internes mis à jour** : rechercher l'ancien chemin dans le code (`grep -rn "<ancien-chemin>" packages/`) et dans les contenus de l'admin, qui ne doivent plus pointer vers l'ancienne URL.
- [ ] **Demande d'indexation dans la Google Search Console** pour les nouvelles URL, juste après la mise en production.
- [ ] **Suivi des clics** sur les requêtes concernées dans la Search Console, chaque mois pendant au moins trois mois.
