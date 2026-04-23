# @cdt/metabase

Dashboards Metabase, vues materialisees SQL et configuration MCP pour le CDTN.

## Sommaire

- [Installation](#installation)
- [Serveur MCP](#serveur-mcp)
- [Structure des fichiers](#structure-des-fichiers)
- [Dashboards et cartes](#dashboards-et-cartes)
- [Refresh des MV](#refresh-des-mv)
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

| Fichier                      | Description                                                          |
| ---------------------------- | -------------------------------------------------------------------- |
| `CLAUDE.md`                  | **Hub IA complet** : process cards, SQL, dashboards, refresh         |
| `../../.mcp.json`            | Config MCP locale, **a la racine du repo** (gitignore)               |
| `../../.mcp.example.json`    | Template de config MCP, **a la racine du repo**                      |
| `.env`                       | Variables `METABASE_URL` / `METABASE_API_KEY` (gitignore)            |
| `docs/schema.md`             | Schema de la base OVH PG CDTN (`matomo_partitioned`, etc.)           |
| `docs/materialized-views.md` | Definitions et patterns d'usage des vues materialisees               |
| `docs/models.md`             | Modeles Metabase et patterns SQL optimises                           |
| `docs/dashboards.md`         | Reference de tous les dashboards et cartes                           |
| `sql/`                       | SQL DDL des MV custom (source de verite git-tracked)                 |

## Dashboards et cartes

La liste des dashboards et cartes maintenus vit dans [`docs/dashboards.md`](docs/dashboards.md). Pour l'etat en direct, interroger l'API :

```bash
source .env
curl -s -H "X-API-Key: $METABASE_API_KEY" "$METABASE_URL/api/dashboard" | jq '.[] | {id, name, collection_id, archived}'
```

## Refresh des MV

- Commandes detaillees et ordre de refresh : [`docs/materialized-views.md`](docs/materialized-views.md) §"Ordre de refresh des MV".
- Consignes de process et regles d'archivage des cartes : [`CLAUDE.md`](CLAUDE.md) §"Refresh des MV".
- Le cron lui-meme est gere cote infra (Kubernetes CronJob / `pg_cron`).

## Issues

- [#7199](https://github.com/SocialGouv/code-du-travail-numerique/issues/7199) - Personnalisation des contenus
- [#7202](https://github.com/SocialGouv/code-du-travail-numerique/issues/7202) - Funnel IL/IRC
- [#7136](https://github.com/SocialGouv/code-du-travail-numerique/issues/7136) - Taux de rebond contributions
