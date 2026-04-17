# @cdt/metabase

Dashboards Metabase et configuration MCP pour le CDTN.

## Sommaire

- [Installation](#installation)
- [Serveur MCP](#serveur-mcp)
- [Structure des fichiers](#structure-des-fichiers)
- [Pipeline events Matomo](#pipeline-events-matomo)
- [Dashboards et cartes maintenues](#dashboards-et-cartes-maintenues)
- [Refresh des donnees](#refresh-des-donnees)
- [Issues](#issues)

## Installation

```bash
pnpm install
```

## Serveur MCP

Ce package fournit une integration MCP (Model Context Protocol) pour interroger l'instance Metabase CDTN depuis les agents IA (Claude Code, Claude Desktop, Cursor, Windsurf, etc.). Le serveur utilise [`@easecloudio/mcp-metabase-server`](https://www.npmjs.com/package/@easecloudio/mcp-metabase-server) pilote par `npx`.

### Configuration locale

Le fichier `.mcp.json` vit **a la racine du monorepo** (et pas dans `packages/metabase/`) pour que Claude Code et les autres outils MCP le detectent automatiquement. Il est **gitignore** au niveau racine (`.gitignore`, ligne `.mcp.json`). Chaque dev maintient sa propre copie.

Si tu n'as pas encore de `.mcp.json` :

```bash
# depuis la racine du monorepo
cp .mcp.example.json .mcp.json
```

Puis edite `.mcp.json` (racine) et remplace `your_api_key_here` par ta cle API Metabase. La cle se genere depuis Metabase : **Admin > Settings > Authentication > API Keys > Create API Key**.

Structure attendue de `.mcp.json` :

```json
{
  "$schema": "https://modelcontextprotocol.io/schema/mcp.json",
  "mcpServers": {
    "metabase": {
      "command": "npx",
      "args": ["@easecloudio/mcp-metabase-server"],
      "env": {
        "METABASE_URL": "https://metabase-cdtn.fabrique.social.gouv.fr",
        "METABASE_API_KEY": "mb_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

> **Ne JAMAIS commiter `.mcp.json`** : il contient la cle API. Si tu vois `.mcp.json` apparaitre dans `git status`, verifie le `.gitignore` racine.

### Activation

`.mcp.json` est au format standard MCP, automatiquement detecte par les outils compatibles (Claude Code, Claude Desktop, Cursor, Windsurf). Aucune action manuelle n'est requise apres `cp` + edition.

Si l'auto-detection ne fonctionne pas avec Claude Code :

```bash
claude mcp add metabase \
  -e METABASE_URL=https://metabase-cdtn.fabrique.social.gouv.fr \
  -e METABASE_API_KEY=ta_cle_api \
  -- npx @easecloudio/mcp-metabase-server
```

### Variables d'environnement (alternative)

Pour les scripts CLI directs (sans MCP), `.env` est lu via `source` :

```bash
source .env
echo $METABASE_API_KEY
```

`.env` contient :

```env
METABASE_URL=https://metabase-cdtn.fabrique.social.gouv.fr
METABASE_API_KEY=mb_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`.env` est aussi gitignore au niveau du repo racine.

### Interroger l'API directement (sans MCP)

```bash
source .env

# Lister les dashboards
curl -H "X-API-Key: $METABASE_API_KEY" \
  "$METABASE_URL/api/dashboard"

# Consulter une carte
curl -H "X-API-Key: $METABASE_API_KEY" \
  "$METABASE_URL/api/card/170"

# Executer la requete d'une carte
curl -X POST -H "X-API-Key: $METABASE_API_KEY" \
  "$METABASE_URL/api/card/170/query"

# Executer une requete native ad-hoc (incl. DDL DROP/CREATE - voir CLAUDE.md §Tips API Metabase)
curl -X POST -H "X-API-Key: $METABASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"native","database":4,"native":{"query":"SELECT 1"}}' \
  "$METABASE_URL/api/dataset"
```

## Structure des fichiers

| Fichier                          | Description                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| `CLAUDE.md`                      | **Hub IA complet** : process cards, SQL, dashboards, events, refresh                 |
| `../../.mcp.json`                | Config MCP locale, **a la racine du repo** (gitignore)                               |
| `../../.mcp.example.json`        | Template de config MCP, **a la racine du repo**                                      |
| `.env`                           | Variables `METABASE_URL` / `METABASE_API_KEY` (gitignore)                            |
| `docs/schema.md`                 | Schema de la base OVH PG CDTN (`matomo_partitioned`, etc.)                           |
| `docs/materialized-views.md`     | Definitions et patterns d'usage des vues materialisees                               |
| `docs/events.md`                 | **Glossaire exhaustif des events Matomo (AUTO-GENERE)**                              |
| `docs/models.md`                 | Modeles Metabase et patterns SQL optimises                                           |
| `docs/dashboards.md`             | Reference de tous les dashboards et cartes                                           |
| `events/events.metadata.yaml`    | Description **metier** des events (label, trigger, KPI, dashboards)                  |
| `events/events.extracted.json`   | Ground truth technique extraite depuis le code (auto)                                |
| `events/events.schema.ts`        | Types TS partages du pipeline events                                                 |
| `events/extract-events.ts`       | AST scan des `tracking.ts` → `events.extracted.json`                                 |
| `events/generate-events-doc.ts`  | Join extracted + metadata → `docs/events.md`                                         |
| `events/check-events-drift.ts`   | Exit 1 si `docs/events.md` est desynchronise (utilise en precommit + CI)             |
| `sql/`                           | SQL DDL des MV custom (source de verite git-tracked)                                 |
| `backup/`                        | Backups des SQL des cartes avant modification (gitignore)                            |

## Pipeline events Matomo

Le package centralise le glossaire des events Matomo emis par le frontend CDTN. `docs/events.md` est **genere automatiquement** et ne doit jamais etre edite a la main.

### Fonctionnement

```text
packages/code-du-travail-frontend/src/modules/**/*.{ts,tsx}  (sauf __tests__/)
  |
  |  events/extract-events.ts (AST via ts-morph)
  |  detecte sendEvent(), push(["trackEvent"|"trackSiteSearch"|...]), _paq.push()
  v
events/events.extracted.json  (61 callsites events + matomo_config_calls)
  +
events/events.metadata.yaml   (description metier a maintenir a la main)
  |
  |  events/generate-events-doc.ts
  v
docs/events.md (groupe par feature_group, + sections Orphelins / Metadata orpheline / Commandes Matomo)
```

### Commandes

```bash
# Installer les deps (ts-morph, tsx, yaml)
pnpm install

# Regenerer docs/events.md
pnpm -F @cdt/metabase events:docs

# Verifier que docs/events.md est a jour (CI + precommit)
pnpm -F @cdt/metabase events:check
```

### Workflow dev

1. Dev ajoute un `sendEvent({ category, action, name? })` dans un `tracking.ts` du frontend.
2. `pnpm -F @cdt/metabase events:docs` → l'event apparait dans `docs/events.md`, section "Orphelins".
3. Dev documente l'event dans `events/events.metadata.yaml` (cle `"<category>:<action>"`).
4. Relance → l'event passe dans sa section metier.
5. Le commit est bloque par husky si `events:check` echoue.

Voir `events/CLAUDE.md` pour les details (schema + metadata + scripts du pipeline sont colocalises).

## Dashboards et cartes maintenues

| ID       | Type | Nom                                       | Collection                 | Source                  |
| -------- | ---- | ----------------------------------------- | -------------------------- | ----------------------- |
| 36       | Dash | Personnalisation des contenus             | General (29)               | mv_kpi_personnalisation |
| 37       | Dash | Funnel IL/IRC avant/apres refonte         | General (29)               | mv_funnel_il_irc        |
| 170      | Card | IL - Taux completion (bar)                | 56 (IL Taux completion)    | mv_funnel_il_irc_visits |
| 448      | Card | IL - Taux completion (funnel)             | 56 (IL Taux completion)    | mv_funnel_il_irc_visits |
| 107      | Card | IRC - Taux completion (bar)               | 53 (IRC Taux completion)   | mv_funnel_il_irc_visits |
| 449      | Card | IRC - Taux completion (funnel)            | 53 (IRC Taux completion)   | mv_funnel_il_irc_visits |
| 450      | Card | Contributions - Taux de rebond global     | 88 (Taux de rebond)        | mv_bounce_contributions |
| 451      | Card | Contributions - Taux de rebond par page   | 88 (Taux de rebond)        | mv_bounce_contributions |

Les cards 170, 107, 448, 449 sont parametrees (`date_debut`, `date_fin`, defaut = 30 derniers jours) et utilisent une logique de **funnel cumulatif** (cf. `docs/materialized-views.md` §7).

Les cards 450 et 451 (taux de rebond contributions, issue #7136) sont egalement parametrees avec `date_debut` / `date_fin`. Voir `docs/materialized-views.md` §8 pour la definition du rebond.

Le dashboard 36 utilise aussi `mv_perso_weekly` (KPI 2) et `mv_cc_non_traitees` (KPI 5).

## Refresh des donnees

Voir **`CLAUDE.md` §Refresh des MV** et **`docs/materialized-views.md` §Ordre de refresh** pour les commandes et dependances. Le cron lui-meme est gere cote infra (Kubernetes CronJob / `pg_cron`).

Resume :

- `mv_funnel_il_irc_visits` -> a planifier en cron quotidien independamment (cards 170/107/448/449)
- `mv_bounce_contributions` -> a planifier en cron quotidien independamment (cards 450/451)
- `metabase_model_106` -> source de verite, lent, planification cote infra
- Les autres MV (`visites_uniques`, `mv_perso_weekly`, `mv_funnel_il_irc`, `commentaires_utilisateurs`) -> a refresh **apres** `metabase_model_106`
- `mv_kpi_personnalisation` -> DROP + CREATE manuel (schema fixe)
- `mv_cc_non_traitees` -> statique, jamais refresh

## Issues

- [#7199](https://github.com/SocialGouv/code-du-travail-numerique/issues/7199) - Personnalisation des contenus
- [#7202](https://github.com/SocialGouv/code-du-travail-numerique/issues/7202) - Funnel IL/IRC
- [#7136](https://github.com/SocialGouv/code-du-travail-numerique/issues/7136) - Taux de rebond contributions
