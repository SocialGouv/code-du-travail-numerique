---
name: tracking-plan
description: Rédige/actualise le plan de tracking Matomo métier (events/TRACKING_PLAN.md) sous forme de document explicatif (prose + tableaux commentés), à partir du catalogue events.extracted.json et du code frontend. À lancer après toute évolution du tracking.
argument-hint: "[--skip-extract]"
allowed-tools:
  - Bash
  - Read
  - Write
  - Grep
  - Glob
  - Agent
---

# Plan de tracking Matomo — génération du document métier

Tu es un agent spécialisé dans la rédaction du **plan de tracking Matomo** du projet
**Code du travail numérique**, à destination du **métier** (non technique).

Ton livrable est un **document explicatif rédigé** — pas un simple listing. Tu combines :

1. le **catalogue exact** des events extraits du code (`events.extracted.json`, source de
   vérité machine), et
2. la **lecture du code frontend** (simulateurs et leurs étapes, parcours convention
   collective, recherche entreprise) pour expliquer **quand** et **pourquoi** chaque event
   est envoyé, avec les vrais titres et étapes.

Un algorithme ne peut produire ce document : il faut comprendre le domaine. C'est ton rôle.

## Configuration

- **Package stats** : `packages/code-du-travail-stats`
  - Catalogue (entrée) : `packages/code-du-travail-stats/events/events.extracted.json`
  - Document (sortie) : `packages/code-du-travail-stats/events/TRACKING_PLAN.md`
- **Frontend** : `packages/code-du-travail-frontend/src/modules`
- **Fichiers d'ancrage à lire** (le socle d'abord, puis les émetteurs) :
  - `analytics/events/categories.ts` — `PageCategory` : la liste FERMÉE des types de page,
    seules valeurs possibles de `category`.
  - `analytics/events/actions.ts` — `EventAction` : la liste FERMÉE des actions. C'est la
    table des matières du plan de tracking : toute action documentée en vient.
  - `analytics/events/payload.ts` — pourquoi le `name` est toujours une enveloppe JSON.
  - `outils/common/components/SimulatorLayout/tracking.ts` — events génériques des
    simulateurs (`view_step`, `click_previous_step`, `print_result`).
  - `outils/common/events/pushAgreementEvents.ts` + `convention-collective/tracking.ts` +
    `enterprise/EnterpriseAgreementSearch/**` — parcours convention collective (p1/p2/p3).
  - `api/modules/nps/service.ts` et `api/modules/contribution-rating/service.ts` — les deux
    events relayés **côté serveur** : ils n'apparaissent pas (ou seulement sous forme
    générique) dans le catalogue, qui ne voit que les appels client. À documenter depuis
    ces fichiers.
  - Étapes par simulateur : `outils/<simulateur>/steps/**` (noms de dossiers = étapes) et le
    composant `outils/<simulateur>/*Simulator.tsx`.

## Arguments

`$ARGUMENTS` peut contenir :
- `--skip-extract` : ne relance pas l'extraction du catalogue (utilise le
  `events.extracted.json` déjà committé). Par défaut, on régénère d'abord le catalogue.

## Étapes

### 1. Rafraîchir le catalogue (sauf `--skip-extract`)

```bash
pnpm -F @socialgouv/cdtn-stats events:extract
```

Puis lis `packages/code-du-travail-stats/events/events.extracted.json`. Ce fichier fait
autorité : **tout event mentionné dans le document doit exister dans ce catalogue**. Ne jamais
inventer une `category`/`action`/`name` absente du catalogue.

Structure d'un event (cf. `events.schema.ts`) :
- `category` — vaut `<PageCategory>` pour tout event du socle normalisé : la catégorie est
  déduite de la route au runtime, donc **non résoluble statiquement, par construction**. Les
  valeurs réelles possibles sont l'enum `PageCategory`.
- `action` — l'identité de l'event, littérale, tirée de l'union `EventAction`.
- `name_pattern` — la **forme du payload** (`{path, simulator, step}`), pas ses valeurs.
- `has_value` — l'event renseigne-t-il la `value` numérique Matomo.
- `resolution` : `"literal"` (📌) | `"enum-param"` (📌) | `"dynamic"` (🔀). Pour le socle,
  elle porte sur l'**action**, la catégorie étant dérivée par construction.
- `file`, `line` (pour le lien source), `tracking_method` (`track`, `sendPageEvent`,
  `sendEvent` ou `push:<cmd>`).
- Racine : `total_events`, `unique_events`, `matomo_config_calls` (commandes de config, pas
  des events → **ne pas documenter**), `unresolved` (à signaler si non vide).

### 2. Comprendre le domaine (lecture du frontend)

Lis les fichiers d'ancrage listés en Configuration pour reconstituer, **avec les vraies
valeurs du code** :

- **La liste des simulateurs** et **leurs étapes** : pour chaque dossier `outils/<simulateur>`
  qui a un `*Simulator.tsx`, récupère le titre affiché (celui qui voyage dans la clé
  `simulator` du payload) et l'ordre des étapes (dossiers sous `steps/` et/ou tableau
  d'étapes du composant, valeurs de la clé `step`).
- **Les events génériques des simulateurs** (arrivée, étape suivante, étape précédente,
  impression) depuis `SimulatorLayout/tracking.ts`.
- **L'étape convention collective** (parcours p1/p2/p3 et sous-events) depuis
  `pushAgreementEvents.ts` + `convention-collective/tracking.ts` + `enterprise/**`.

Lance ces lectures en parallèle avec des agents `Explore` si utile (performance).

### 3. Rédiger `events/TRACKING_PLAN.md`

Écris le fichier en suivant la structure décrite plus bas (« Sortie attendue »). Le ton est
**métier**, en français, pédagogique.
Le document doit être **explicatif** : pour **chaque** event, donne une explication
**« quand / pourquoi »** (le déclencheur : clic, chargement, erreur, action utilisateur vs clic
« suivant » ; et l'intérêt métier de la mesure). Dans les tableaux par feature, réserve une
colonne **« Quand / pourquoi »**. Ne te contente jamais de lister l'event sans l'expliquer.

Contraintes de rendu (le fichier finit sur le wiki GitHub) :
- **Pas de titre H1** en tête (la page wiki fournit le titre). Commence par le commentaire
  HTML de génération puis `## Liste des events de tracking:`.
- Les valeurs contenant `<…>` (placeholders dynamiques) **doivent** être en code-span
  (`` `<url>` ``), sinon GitHub les masque comme des balises HTML.
- Échappe les `|` à l'intérieur des cellules de tableau (`\|`).
- Repère **📌** = valeur fixe, **🔀** = valeur variable (d'après `resolution`).
- **Ne documente pas** les `matomo_config_calls` (push de configuration : consentement, heatmap,
  referrer) — ce ne sont pas des events de suivi, on ne les liste pas dans ce plan métier.
- Si `unresolved` est non vide, signale-le en note (« callsites non résolus » à revoir).

### 4. Vérifier

- Relis ton document : chaque tableau d'event correspond bien à une entrée du catalogue ;
  les simulateurs et étapes correspondent au code ; aucun event inventé.
- Rappelle à l'utilisateur que la sync wiki se fait automatiquement au merge sur `dev` (le
  workflow `stats-events-wiki.yml` met à jour le bloc entre marqueurs de la page wiki).
- Ne crée **pas** de commit automatiquement ; laisse l'utilisateur relire puis committer.

## Sortie attendue (structure canonique)

Le document déjà écrit dans `events/TRACKING_PLAN.md` **est** la structure de référence :
relis-le avant de rédiger, et garde son plan. En résumé :

1. Un chapeau : nombre d'events uniques / totaux / points d'appel, tirés du catalogue.
2. Une section **« Comment lire un event »** qui pose le contrat une fois pour toutes —
   `category` = type de page, `action` = ce qu'a fait l'usager, `name` = contexte JSON,
   `value` = métrique chiffrée — avec un exemple concret, ce que ça permet dans Matomo, et
   les deux raisons pour lesquelles le contexte est en JSON (troncature à 500 lignes ;
   valeurs « vides » ignorées, dont le texte `0`).
3. Une section par domaine (Outils, Conventions collectives, Recherche, Fiches pratiques,
   NPS, Accueil, Modèles de courriers, Avis & contact, Partage & contenus liés), chacune
   avec un paragraphe de contexte puis un tableau
   `Action | Contexte (📌/🔀) | Quand / pourquoi | Code`.
4. Une annexe listant les valeurs possibles de `PageCategory`.

Règles de rédaction :

- **Pas de titre H1** en tête (la page wiki fournit le titre). Commence par le commentaire
  HTML de génération puis `## Liste des events de tracking:`.
- Le ton est **métier**, en français, pédagogique. Pour **chaque** event : quand il part, et
  pourquoi on le mesure. Jamais un event listé sans explication.
- Les valeurs contenant `<…>` **doivent** être en code-span (`` `<url>` ``), sinon GitHub les
  masque comme des balises HTML. Échappe les `|` dans les cellules (`\|`).
- Regroupe les familles : `rate_content_1..5` et `submit_nps_0..10` tiennent chacune sur
  **une** ligne, pas cinq ou onze.
- Signale à part, en note, les events **définis mais non branchés** en production (aucun
  composant ne les appelle), et les events **relayés côté serveur** (notation, NPS) qui
  n'apparaissent pas tels quels dans le catalogue.

> Ne pas ajouter d'annexe des `matomo_config_calls` : les commandes de configuration
> (consentement, heatmap, referrer) ne sont pas des events de suivi et n'ont pas leur place
> dans ce plan métier.

## Règles de mapping (catalogue → tableaux)

- **`resolution`** : `literal`/`enum-param` → **📌** (valeur fixe) ; `dynamic` → **🔀**
  (valeur variable, représentée par un placeholder `<…>`).
- **`name_pattern` = `null`** → afficher `—`. Les `<…>` → toujours en code-span.
- **Liens `Code`** : `https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/<file>#L<line>`
  (branche fixe `dev`, URL absolue → valide dans le repo ET le wiki).
- **`category` = `<PageCategory>`** → ne l'affiche PAS event par event : c'est le type de la
  page, identique pour tous. Explique-la une fois dans « Comment lire un event » et liste ses
  valeurs en annexe. Ne mentionne la catégorie dans une section que lorsqu'elle est
  invariante et informative (ex. « les simulateurs sont toujours en `outil` »).
- **Clés de payload** : donne leur SENS métier, pas seulement leur nom. `simulator` = titre du
  simulateur, `step` = étape du tunnel, `context` = d'où part le parcours convention,
  `target` = la page atteinte, `idcc` = numéro de convention, `count` = nombre trouvé.
- **`has_value: true`** → note « + `value` » dans la colonne contexte, et rappelle que la
  donnée est **aussi** dans le payload (Matomo n'enregistre pas une `value` de 0).
- **`matomo_config_calls`** → **ne pas documenter** (ce ne sont pas des events de suivi).

## Bonnes pratiques

- **Exhaustivité vérifiée** : couvre **tous** les events. Après rédaction, recoupe le document
  avec le catalogue (chaque catégorie et chaque action littérale doit apparaître) ; en mode
  Product Owner, assure-toi qu'aucun event n'est oublié.
- **Une explication par event** : « quand / pourquoi ». Distingue « émis sur action utilisateur »
  et « émis au clic sur suivant » quand les deux existent.
- **Collapse des familles** : `rate_content_1..5`, `submit_nps_0..10`, les motifs d'avis →
  **une** ligne chacun, pas cinq ou onze doublons.
- **Zéro invention** : chaque event du document existe dans `events.extracted.json`, à la
  seule exception des deux events relayés côté serveur (notation, NPS), qui viennent de
  `api/modules/**/service.ts` et doivent être signalés comme tels. En cas de doute, relis le
  catalogue, ne devine pas.
- **Vraies valeurs** : simulateurs, étapes, IDCC d'exemple → tirés du code, pas des exemples de
  ce gabarit.
- **Vérification d'exhaustivité mécanique** : après rédaction, contrôle que chaque action
  littérale du catalogue apparaît bien dans le document (une simple recherche de chaîne
  suffit) plutôt que de s'en remettre à la relecture.
- **Métier d'abord** : privilégie l'explication (« quand part cet event, pourquoi ») aux
  détails techniques. Les tableaux portent les valeurs exactes.
- **Déterminisme des liens** : toujours pointer sur `dev` (jamais un SHA).
- **Ne pas committer** automatiquement : laisser l'utilisateur relire puis committer
  `events/TRACKING_PLAN.md` (et `events/events.extracted.json` s'il a changé).
- **Pas de drift-check** sur ce fichier : c'est un document rédigé. Après une évolution du
  tracking, relance ce skill pour le tenir à jour.
