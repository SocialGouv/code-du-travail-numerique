# AccordionWithAnchor

Composant d'accordéon avec support optionnel pour l'ancrage par hash d'URL.

## Composants disponibles

### `AccordionWithAnchor` (Server-side)

Composant principal qui peut être rendu côté serveur. N'inclut pas la fonctionnalité d'ancrage par défaut.

```tsx
import { AccordionWithAnchor } from "./AccordionWithAnchor";

<AccordionWithAnchor
  items={[
    {
      id: "section-1", // optionnel, sera généré depuis le titre si absent
      title: "Ma section",
      content: <div>Contenu de la section</div>,
    },
  ]}
  titleAs="h3"
  className="custom-class"
/>;
```

### `AccordionWithAnchorClient` (Client-side)

Version client qui inclut automatiquement la fonctionnalité d'ancrage. À utiliser quand vous avez besoin de l'ancrage par hash d'URL.

```tsx
import { AccordionWithAnchorClient } from "./AccordionWithAnchorClient";

// Utilisation identique au composant server-side
<AccordionWithAnchorClient items={items} titleAs="h3" />;
```

### `handleAccordionAnchoring` (Utilitaire)

Fonction utilitaire pour gérer l'ancrage manuellement.

```tsx
import { handleAccordionAnchoring } from "./accordion-anchoring";

useEffect(() => {
  const cleanup = handleAccordionAnchoring();
  return cleanup; // Important pour le nettoyage
}, []);
```

## Migration depuis l'ancienne version

L'ancienne version avec `"use client"` et `setItemsToDisplay` peut être remplacée par :

- Utilisez `AccordionWithAnchor` pour un rendu côté serveur sans ancrage
- Utilisez `AccordionWithAnchorClient` pour conserver la fonctionnalité d'ancrage existante

## Avantages

1. **Server-side rendering** : Le composant principal peut être rendu côté serveur
2. **Pas de state management** : Plus besoin de `useState` et `setItemsToDisplay`
3. **Flexibilité** : Choisissez entre version serveur ou client selon vos besoins
4. **Performance** : Calcul direct des IDs sans état intermédiaire
