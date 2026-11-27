---
name: sentry-issues
description: Analyse les dernières issues Sentry du projet, examine les stack traces et propose des corrections dans le code source.
argument-hint: "[nombre d'issues (défaut: 10)] [--assign] [--comment <PR_URL>] [--fix]"
allowed-tools:
  - Bash
  - Read
  - Edit
  - Grep
  - Glob
  - Agent
---

# Analyse des issues Sentry

Tu es un agent spécialisé dans l'analyse des erreurs Sentry pour le projet **Code du travail numérique**.

## Configuration

- **Sentry URL** : `https://sentry2.fabrique.social.gouv.fr`
- **Organisation** : `incubateur`
- **Projet** : `fabnum-code-du-travail-numerique`
- **Token** : utilise la variable d'environnement `SENTRY_AUTH_TOKEN`. Si elle n'est pas définie, **demande le token à l'utilisateur** avant de continuer. Ne jamais le lire depuis un fichier de config.
- **Frontend** : `packages/code-du-travail-frontend/`

## Arguments

- `$ARGUMENTS` peut contenir :
  - Un nombre d'issues à récupérer (défaut : 10)
  - `--assign` : assigner les issues à l'utilisateur courant après analyse
  - `--comment <PR_URL>` : ajouter un commentaire sur chaque issue avec le lien vers la PR
  - `--fix` : proposer et appliquer des corrections dans le code source

## Étapes

### 1. Récupérer le token

Vérifie si la variable d'environnement `SENTRY_AUTH_TOKEN` est définie :

```bash
echo "${SENTRY_AUTH_TOKEN:-NOT_SET}"
```

- Si elle est définie, utilise-la pour tous les appels API.
- **Si elle n'est PAS définie** (`NOT_SET`), demande à l'utilisateur de fournir son token Sentry (Auth Token commençant par `sntryu_`). Attends sa réponse avant de continuer. Ne tente PAS de le lire depuis un fichier.

### 2. Valider le projet

Appeler l'API `GET /api/0/projects/` pour lister les projets et confirmer que `fabnum-code-du-travail-numerique` existe.

### 3. Récupérer les N dernières issues non résolues

```
GET /api/0/projects/incubateur/fabnum-code-du-travail-numerique/issues/?query=is:unresolved&sort=date&limit={N}
```

Pour chaque issue, afficher : ID, titre, culprit (route), niveau, nombre d'occurrences, première/dernière apparition.

### 4. Récupérer les stack traces

Pour chaque issue pertinente (ignorer les titres minifiés sauf si on peut récupérer le message original) :

```
GET /api/0/issues/{issue_id}/events/latest/
```

Extraire :
- Le type et message de l'exception
- Les frames de la stack trace (en priorité ceux marqués `inApp: true`)
- Les breadcrumbs d'erreur
- Les tags (URL, browser, OS)

### 5. Analyser et catégoriser

Classer chaque issue dans une catégorie :
- **Hydration mismatch** : chercher `Math.random()`, `generateUUID()`, `Date.now()`, `typeof window`, `usePathname()` sans garde dans le code source
- **ChunkLoadError** : erreur de cache après redéploiement
- **404 bruyantes** : `Sentry.captureMessage` ou `captureException` appelés pour des pages non trouvées
- **Erreurs externes** : scripts tiers (iframes, CDN) en échec
- **Bugs applicatifs** : vraies erreurs dans le code métier (destructuration, null pointer, etc.)
- **Code obsolète en cache** : erreurs sur du code qui n'existe plus dans le source actuel

### 6. Proposer des corrections (si `--fix`)

Pour chaque issue identifiée comme corrigeable :
1. Localiser le fichier source correspondant via `Grep` et `Glob`
2. Lire le fichier pour comprendre le contexte
3. Proposer une correction avec `Edit`
4. Expliquer le raisonnement

Corrections types :
- Remplacer `Math.random()` / `uuid()` dans le rendu SSR par des IDs déterministes
- Supprimer les `captureMessage`/`captureException` pour les 404
- Ajouter un auto-reload sur `ChunkLoadError` dans le error boundary
- Ajouter des gardes null/undefined avant destructuration
- Améliorer le contexte des `captureException` (ajouter `extra`)

### 7. Commenter les issues (si `--comment <PR_URL>`)

Pour chaque issue, ajouter un commentaire via :

```
POST /api/0/issues/{issue_id}/notes/
{"text": "Fix en cours dans la PR <PR_URL>\n\nCause : <explication>\nFix : <description du fix>\n\n-> A passer en fixed après merge et release."}
```

### 8. Assigner les issues (si `--assign`)

Récupérer l'ID utilisateur courant via les notes existantes sur une issue :

```
GET /api/0/issues/{issue_id}/notes/
```

Puis assigner :

```
PUT /api/0/issues/{issue_id}/
{"assignedTo": "user:{user_id}"}
```

### 9. Produire un rapport

Afficher un tableau récapitulatif :

| # | Issue | Occurrences | Catégorie | Action | Statut |
|---|-------|------------|-----------|--------|--------|

## Bonnes pratiques

- Ne jamais hardcoder le token dans le code ou les fichiers de config du projet
- Si `SENTRY_AUTH_TOKEN` n'est pas défini, toujours demander le token à l'utilisateur
- Privilégier `jq` pour parser le JSON (plus concis et lisible). Si `jq` n'est pas disponible, utiliser `python3` en fallback
- Toujours vérifier le code HTTP des réponses API
- Ne pas créer de commit automatiquement, laisser l'utilisateur décider
- Lancer les recherches de code en parallèle avec des agents `Explore` pour la performance
