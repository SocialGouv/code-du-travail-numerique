# Bonnes pratiques de dev

## Nommage des fichiers et répartoires

Nous utilisons `hyphen-case` (`kebab-case`) par défaut et du `PascalCase` si c'est composant react (même pour les tests) pour le nommage des fichiers et répertoires.

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


