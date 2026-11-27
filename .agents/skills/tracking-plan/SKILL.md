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
- **Fichiers d'ancrage à lire** (émetteurs et enums de référence) :
  - `analytics/types.ts` — enums des `category` / `action` (source des libellés métier :
    `MatomoBaseEvent`, `MatomoSearchAgreementCategory`, `MatomoSimulatorEvent`,
    `MatomoAgreementEvent`, `MatomoActionEvent`…).
  - `outils/common/components/SimulatorLayout/tracking.ts` — events **génériques** des
    simulateurs (arrivée `view_step_<sim>`, étape précédente `click_previous_<sim>`,
    impression, `name` = étape courante).
  - `outils/common/events/pushAgreementEvents.ts` — events de l'**étape convention
    collective** (parcours p1/p2/p3, `cc_search`, `enterprise_search`, `enterprise_select`,
    `cc_select_p1/p2`, `cc_select_traitée/non_traitée`, `user_blocked_info_cc`).
  - `convention-collective/tracking.ts`, `enterprise/EnterpriseAgreementSearch/tracking.ts`.
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
- `category`, `action`, `name_pattern` (`null` ou placeholder `<…>` si calculé au runtime),
- `resolution` : `"literal"` | `"enum-param"` (valeur fixe → 📌) | `"dynamic"` (valeur
  variable → 🔀),
- `file`, `line` (pour le lien source), `tracking_method` (`sendEvent` ou `push:<cmd>`).
- Racine : `total_events`, `unique_events`, `matomo_config_calls` (commandes de config, pas
  des events → annexe), `unresolved` (à signaler si non vide).

### 2. Comprendre le domaine (lecture du frontend)

Lis les fichiers d'ancrage listés en Configuration pour reconstituer, **avec les vraies
valeurs du code** :

- **La liste des simulateurs** et **leurs étapes** : pour chaque dossier `outils/<simulateur>`
  qui a un `*Simulator.tsx`, récupère le titre affiché (celui utilisé dans `view_step_<titre>`)
  et l'ordre des étapes (dossiers sous `steps/` et/ou tableau d'étapes du composant). Recoupe
  avec les actions `view_step_*` du catalogue.
- **Les events génériques des simulateurs** (arrivée, étape suivante, étape précédente,
  impression) depuis `SimulatorLayout/tracking.ts`.
- **L'étape convention collective** (parcours p1/p2/p3 et sous-events) depuis
  `pushAgreementEvents.ts` + `convention-collective/tracking.ts` + `enterprise/**`.

Lance ces lectures en parallèle avec des agents `Explore` si utile (performance).

### 3. Rédiger `events/TRACKING_PLAN.md`

Écris le fichier en suivant **exactement** la structure ci-dessous (« Sortie attendue »), en
remplaçant les placeholders par les vraies données. Le ton est **métier**, en français,
pédagogique. Le document doit être **explicatif** : pour **chaque** event, donne une explication
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

Reproduis fidèlement cette structure. Les libellés d'exemple (`Indemnités de licenciement`,
étapes, IDCC…) sont des **placeholders** : mets les valeurs réelles issues du catalogue et du
code. Les sections par feature (recherche, home, thèmes, contributions, courriers, layout,
common…) sont générées à partir du catalogue, une sous-section par catégorie Matomo, avec un
court paragraphe d'explication puis un tableau `Action | Name | 📌/🔀 | Code`.

~~~markdown
<!-- Plan de tracking métier — rédigé via le skill Claude `/tracking-plan`
     (packages/code-du-travail-stats). Ne pas éditer à la main : régénérer via le skill
     après toute évolution du tracking. Source : events/events.extracted.json + code frontend. -->

## Liste des events de tracking:

#### tracking générique (automatique sur chaque page)

Lors d'une visite sur une page du site, par défaut Matomo envoie un évènement de visite, qui
contient des informations (le nom de la page et son url).

Exemple d'information envoyé suite à une visite sur la page des thèmes :

| Type        | Donnée                             | Info                                     |
| ----------- | ---------------------------------- | ---------------------------------------- |
| action_name | Thèmes - Code du travail numérique | Titre de la page                         |
| url         | https://code.travail.gouv.fr/themes | Lien vers la page                       |
| urlref      | /                                  | Origine de l'utilisateur (ici l'accueil) |

### Outils

#### Simulateurs

Voici la liste des simulateurs disponibles (avec leurs étapes) :

| Titre                       | Étapes                                                            |
| --------------------------- | ---------------------------------------------------------------- |
| <Nom du simulateur>         | <étape_1>, <étape_2>, …                                          |

##### Évènements génériques sur les simulateurs

Pour chaque simulateur, on envoie des évènements génériques.

###### Arrivée sur l'outil

| Type     | Contenu                     | Détail                                                    |
| -------- | --------------------------- | --------------------------------------------------------- |
| category | outil                       |                                                           |
| action   | view_step_`Nom du simulateur` | `Nom du simulateur` = titre du simulateur               |
| name     | start                       |                                                           |

###### Étape suivante

| Type     | Contenu                     | Détail                                             |
| -------- | --------------------------- | -------------------------------------------------- |
| category | outil                       |                                                    |
| action   | view_step_`Nom du simulateur` | `Nom du simulateur` = titre du simulateur        |
| name     | Nom de l'étape              | L'étape sur laquelle l'utilisateur est arrivé      |

###### Étape précédente

| Type     | Contenu                         | Détail                                          |
| -------- | ------------------------------- | ----------------------------------------------- |
| category | outil                           |                                                 |
| action   | click_previous_`Nom du simulateur` | `Nom du simulateur` = titre du simulateur    |
| name     | Nom de l'étape                  | L'étape sur laquelle l'utilisateur est revenu   |

###### Étape pour renseigner sa convention collective

Cette étape n'est pas présente sur tous les simulateurs. Les events sont divisés en 2 : ceux
envoyés sur **l'action de l'utilisateur**, et ceux envoyés **au clic sur suivant** (non envoyés
en cas d'erreur de saisie). Trois parcours :

 * **p1** : je connais ma convention collective (je la saisis)
 * **p2** : je ne la connais pas (je recherche mon entreprise)
 * **p3** : je ne souhaite pas la renseigner (je passe l'étape)

1. Choix du parcours (**envoyé au clic sur suivant**)

| Type     | Contenu                              | Détail                              |
| -------- | ------------------------------------ | ----------------------------------- |
| category | cc_search_type_of_users              |                                     |
| action   | click_p1 ou click_p2 ou click_p3     | Selon le parcours (p1, p2, p3)      |
| name     | `Nom du simulateur`                  | Titre du simulateur                 |

2. Recherche (**envoyé sur action de l'utilisateur**, debounce 300 ms)

| Type     | Contenu               | Détail                                               |
| -------- | --------------------- | ---------------------------------------------------- |
| category | cc_search             | Recherche d'une convention collective (parcours p1)  |
| action   | `Nom du simulateur`   | Titre du simulateur                                  |
| name     | {"query":"boulan"}    | JSON du contenu de la requête utilisateur            |

| Type     | Contenu                          | Détail                                    |
| -------- | -------------------------------- | ----------------------------------------- |
| category | enterprise_search                | Recherche d'une entreprise (parcours p2)  |
| action   | `Nom du simulateur`              | Titre du simulateur                       |
| name     | {"address":"69007","query":"odon"} | JSON du contenu de la requête           |

3. Choix de l'entreprise, parcours p2 (**envoyé au clic sur suivant**)

| Type     | Contenu             | Détail                                    |
| -------- | ------------------- | ----------------------------------------- |
| category | enterprise_select   |                                           |
| action   | `Nom du simulateur` | Titre du simulateur                       |
| name     | {"label":"…","siren":"…"} | Entreprise sélectionnée             |

4. Choix de la convention collective (**envoyé au clic sur suivant**)

| Type     | Contenu                        | Détail                                    |
| -------- | ------------------------------ | ----------------------------------------- |
| category | cc_select_p1 ou cc_select_p2   | Selon le parcours choisi                  |
| action   | `Nom du simulateur`            | Titre du simulateur                       |
| name     | idcc1234                       | IDCC choisi, préfixé `idcc`               |

5. Support de la convention collective (**envoyé au clic sur suivant**)

| Type     | Contenu                                     | Détail                                       |
| -------- | ------------------------------------------- | -------------------------------------------- |
| category | outil                                       |                                              |
| action   | cc_select_traitée ou cc_select_non_traitée  | La CC est traitée par nos services ou non    |
| name     | 1234                                        | IDCC de la convention collective             |

6. CC bloquantes (simulateurs où la CC est obligatoire)

| Type     | Contenu                                      | Détail                             |
| -------- | -------------------------------------------- | ---------------------------------- |
| category | outil                                        |                                    |
| action   | view_step_`Nom du simulateur`                | Simulateur concerné                |
| name     | user_blocked_info_cc                         |                                    |

### <Autre feature (ex: Recherche, Accueil, Thèmes, Contributions, Modèles de courriers…)>

<Un paragraphe expliquant le contexte de ces events.>

| Catégorie | Action | Name (📌/🔀) | Quand / pourquoi | Code |
| --------- | ------ | ------------ | ---------------- | ---- |
| <category> | `<action>` | 📌 `<name ou —>` | <déclencheur + intérêt métier, 1 phrase> | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/<file>#L<line>) |

> Signale à part, en note, les events **définis dans le code mais non branchés** en production
> (fonction jamais appelée par un composant) : ils sont dans le catalogue mais n'ont pas de
> déclencheur utilisateur réel aujourd'hui.
~~~

> Ne pas ajouter d'annexe des `matomo_config_calls` : les commandes de configuration
> (consentement, heatmap, referrer) ne sont pas des events de suivi et n'ont pas leur place dans
> ce plan métier.

## Règles de mapping (catalogue → tableaux)

- **`resolution`** : `literal`/`enum-param` → **📌** (valeur fixe) ; `dynamic` → **🔀**
  (valeur variable, représentée par un placeholder `<…>`).
- **`name_pattern` = `null`** → afficher `—`. Les `<…>` → toujours en code-span.
- **Liens `Code`** : `https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/<file>#L<line>`
  (branche fixe `dev`, URL absolue → valide dans le repo ET le wiki).
- **Enums d'`action`/`category`** : utilise `analytics/types.ts` pour donner le **libellé
  métier** (ex. `cc_select_traitée` = « CC traitée par nos services »).
- **`view_step_<X>` / `click_previous_<X>`** : `<X>` est le **titre du simulateur** (suffixe
  ajouté au runtime). Les regrouper dans la partie « Simulateurs », pas en doublon par feature.
- **`matomo_config_calls`** → **ne pas documenter** (ce ne sont pas des events de suivi).

## Bonnes pratiques

- **Exhaustivité vérifiée** : couvre **tous** les events. Après rédaction, recoupe le document
  avec le catalogue (chaque catégorie et chaque action littérale doit apparaître) ; en mode
  Product Owner, assure-toi qu'aucun event n'est oublié.
- **Une explication par event** : « quand / pourquoi ». Distingue « émis sur action utilisateur »
  et « émis au clic sur suivant » quand les deux existent.
- **Collapse des expansions enum-param** : quand un même motif est décliné par simulateur (ex.
  `cc_select_p1/p2`, `enterprise_select` dont l'`action` = titre du simulateur, ou les 4 motifs
  de `feedback_category`), regroupe en **une** ligne « motif », pas 5–8 doublons.
- **Zéro invention** : chaque event du document existe dans `events.extracted.json`. En cas de
  doute, relis le catalogue, ne devine pas.
- **Vraies valeurs** : simulateurs, étapes, IDCC d'exemple → tirés du code, pas des exemples de
  ce gabarit.
- **Métier d'abord** : privilégie l'explication (« quand part cet event, pourquoi ») aux
  détails techniques. Les tableaux portent les valeurs exactes.
- **Déterminisme des liens** : toujours pointer sur `dev` (jamais un SHA).
- **Ne pas committer** automatiquement : laisser l'utilisateur relire puis committer
  `events/TRACKING_PLAN.md` (et `events/events.extracted.json` s'il a changé).
- **Pas de drift-check** sur ce fichier : c'est un document rédigé. Après une évolution du
  tracking, relance ce skill pour le tenir à jour.
