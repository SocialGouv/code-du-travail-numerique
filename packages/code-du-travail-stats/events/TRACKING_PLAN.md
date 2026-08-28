<!-- Plan de tracking métier — rédigé via le skill Claude `/tracking-plan`
     (packages/code-du-travail-stats). Ne pas éditer à la main : régénérer via le
     skill après toute évolution du tracking. Source : events/events.extracted.json
     (catalogue extrait du code) + lecture des modules frontend.
     Repères : 📌 valeur fixe · 🔀 valeur variable (calculée au runtime).
     Liens ↗ : code source sur la branche `dev`. -->

## Liste des events de tracking:

Ce document décrit les évènements Matomo **écrits explicitement dans le code** du site
(`code.travail.gouv.fr`). Il est destiné au métier : pour **chaque** évènement, il explique
**quand** il part et **pourquoi** on le mesure, puis en donne le contenu exact.

**64** events uniques · **80** au total · **79** points d'appel dans le code. Couverture
vérifiée exhaustivement face au catalogue extrait du code, sans aucun appel non résolu.

---

### Comment lire un event

Tous les events du site suivent **le même contrat**, sans exception. C'est le point le plus
important de ce document : avant, chaque module inventait sa propre façon de ranger
l'information, et il fallait savoir dans quel champ chercher. Désormais :

| Champ Matomo | Contenu                                   | Exemple                                             |
| ------------ | ----------------------------------------- | --------------------------------------------------- |
| **category** | Le **type de la page** où l'usager se trouve | `contribution`, `outil`, `convention-collective`  |
| **action**   | **Ce que l'usager a fait**                | `click_share`, `view_step`, `select_agreement_p1`   |
| **name**     | Le **contexte**, en JSON                  | `{"path":"contribution/mon-slug","network":"email"}` |
| **value**    | Une métrique chiffrée, quand il y en a une | `4` (une note, un compteur)                        |

Concrètement, un clic sur « Partager par courriel » depuis une fiche pratique produit :

```
category: "contribution"
action:   "click_share"
name:     '{"path":"contribution/conges-payes","network":"email"}'
```

**Ce que ça permet, en un clic dans Matomo :**

- rapport **Événements → Catégories** : quels **types de page** génèrent de l'interaction ;
- rapport **Événements → Actions** : le classement des **interactions du site entier**, tous
  types de page confondus — « combien de partages », « combien de notations » ;
- le détail (quelle page exactement, quelle requête, quelle entreprise) se lit dans le `name`,
  soit par **segment** (`eventName` contient `"path":"contribution/conges-payes"`), soit par
  **export**.

#### Pourquoi le contexte est en JSON et non en clair

Deux raisons, toutes deux des contraintes de Matomo :

1. **Matomo tronque ses tableaux à 500 lignes** à l'archivage et regroupe tout le reste dans
   une ligne `- Others -`, **définitivement** pour la période concernée. Le site a bien plus
   de 500 pages : mettre le chemin de la page dans la catégorie ou dans l'action ferait
   disparaître toute la longue traîne. En gardant catégorie et action sur des listes courtes
   (une vingtaine de types de page, une soixantaine d'interactions), **aucune ligne ne se
   perd**.
2. **Matomo ignore les valeurs « vides »**, et considère le texte `0` comme vide. Un compteur
   envoyé seul disparaissait donc quand il valait zéro — c'est ce qui masquait les « aucun
   accord trouvé » (voir la section Conventions collectives). Emballé en JSON,
   `{"count":0}` est un texte non vide : le zéro remonte.

La clé **`path`** est présente sur tous les events : c'est la page où l'action a eu lieu,
sous forme de chemin sans le domaine (`contribution/conges-payes`).

---

### Outils

#### Simulateurs

Simulateurs qui émettent du tracking d'étapes, avec leurs étapes dans l'ordre. Le titre
apparaît désormais dans la clé **`simulator`** du contexte (avant, il était collé à l'action).

| Titre                                          | Étapes (clé `step`)                                          |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Indemnité de licenciement                      | start, info_cc, infos, anciennete, absences, salaires, results |
| Indemnité de rupture conventionnelle           | start, info_cc, infos, anciennete, absences, salaires, results |
| Indemnités de précarité                        | start, info_cc, info_generales, remuneration, indemnite      |
| Préavis de démission                           | start, info_cc, infos, results                               |
| Préavis de licenciement                        | start, status, info_cc, infos, results                       |
| Préavis de départ ou de mise à la retraite     | intro, origine, ccn, infos, anciennete, result               |
| Heures d'absence pour rechercher un emploi     | start, info_cc, infos, results                               |
| Trouver sa convention collective (outil dédié) | start (+ parcours convention collective, voir plus bas)      |

> Les étapes `infos` / `salaires` peuvent être **masquées** selon les réponses ; l'event n'est
> alors pas envoyé. Les outils `Procédure de licenciement` et `Simulateur d'embauche` (iframe
> URSSAF) n'émettent **pas** de `view_step`.

##### Parcours dans le simulateur

Catégorie : **`outil`** (la page est une page de simulateur).

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `view_step` | 🔀 `{path, simulator, step}` | À l'affichage de chaque étape : au chargement (`step` = `start`) puis à chaque « Commencer » / « Suivant ». Mesure la progression dans le tunnel et les points d'abandon. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L16) |
| `click_previous_step` | 🔀 `{path, simulator, step}` | Clic sur « Précédent ». Mesure les retours en arrière, signe d'une question mal comprise. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L16) |
| `print_result` | 🔀 `{path, simulator}` | Clic sur « Imprimer le résultat » à la dernière étape, juste avant la boîte d'impression. Mesure l'intention de conserver le résultat. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L23) |
| `view_result_ineligible` | 🔀 `{path, simulator}` | Au calcul du résultat, quand la simulation conclut à la **non-éligibilité** (ancienneté, informations ou absences non satisfaites). Mesure le taux de simulations sans droit. Concerne les deux simulateurs d'indemnité. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-licenciement/events/useIndemniteLicenciementEventEmitter.tsx#L14) |
| `block_on_agreement` | 🔀 `{path, simulator}` | Quand la convention saisie n'est pas prise en charge et **bloque** la poursuite : l'usager est renvoyé vers la consultation de sa convention. Seuls **Préavis de démission** et **Heures d'absence pour rechercher un emploi** l'émettent. Mesure le volume d'usagers bloqués faute de convention traitée. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/heures-recherche-emploi/events/useHeuresRechercheEmploiEventEmitter.tsx#L15) |

##### Spécifique « Préavis de retraite »

Deux étapes remontent le choix de l'usager, au clic sur « Suivant ».

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `select_retirement_origin` | 🔀 `{path, simulator, origin}` | Étape « origine » : `origin` vaut `mise-retraite` (à l'initiative de l'employeur) ou `depart-retraite` (départ volontaire). Les deux cas ouvrent des droits différents. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/OriginStep/store/store.ts#L47) |
| `select_seniority` | 🔀 `{path, simulator, seniority}` | Étape « ancienneté » : `seniority` vaut `plus_2_ans` ou `moins_2_ans`, le seuil qui change la durée de préavis. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/Seniority/store/store.ts#L49) |

##### Avis sur les simulateurs

Questionnaires de satisfaction affichés après le résultat (simulateurs d'indemnités de départ).
La clé `simulator` distingue les deux simulateurs — auparavant, la rupture conventionnelle
avait toute une famille de catégories dupliquées pour elle seule.

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `submit_simulator_feedback_global` | 🔀 `{path, simulator, answer}` | 1er questionnaire (smileys), à l'envoi si un smiley est choisi. `answer` vaut `pas_bien`, `moyen` ou `très_bien`. Satisfaction globale. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L60) |
| `submit_simulator_feedback_easiness` | 🔀 `{path, simulator, answer}` + `value` | Questionnaire détaillé, question « utilisation du simulateur », notée 1 à 5. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L63) |
| `submit_simulator_feedback_question_clarity` | 🔀 `{path, simulator, answer}` + `value` | Question « informations et instructions », notée 1 à 5. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L66) |
| `submit_simulator_feedback_result_clarity` | 🔀 `{path, simulator, answer}` + `value` | Question « explications du résultat », notée 1 à 5. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L69) |
| `submit_simulator_feedback_comment` | 🔀 `{path, simulator, comment}` | À l'envoi du questionnaire détaillé, si le commentaire libre est renseigné. Verbatim qualitatif. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L78) |

> Les trois questions notées renseignent **aussi** `value`, ce qui donne la **moyenne** dans
> Matomo. La note reste dans `answer` : c'est elle qui permet de lire la **répartition** des
> notes, que la moyenne seule masquerait.

---

### Conventions collectives

Le parcours de choix de convention est le **même composant** partout : dans les simulateurs,
dans les fiches pratiques, et sur la page dédiée. La clé **`context`** dit d'où part l'usager
(le titre du simulateur, ou le chemin de la fiche). Trois parcours :

- **p1** : je connais ma convention collective (je la saisis) ;
- **p2** : je ne la connais pas (je recherche mon entreprise) ;
- **p3** : je ne souhaite pas la renseigner (je passe l'étape).

#### Choix du parcours et sélection

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `select_agreement_path_p1` | 🔀 `{path, context}` | L'usager choisit de saisir sa convention. Mesure la répartition p1/p2/p3. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L37) |
| `select_agreement_path_p2` | 🔀 `{path, context}` | L'usager choisit de chercher son entreprise. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L41) |
| `select_agreement_path_p3` | 🔀 `{path, context}` | L'usager passe l'étape sans renseigner de convention. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L45) |
| `select_agreement_p1` | 🔀 `{path, context, idcc}` | Convention effectivement retenue **par saisie**. `idcc` est le numéro brut de la convention. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L32) |
| `select_agreement_p2` | 🔀 `{path, context, idcc}` | Convention retenue **via l'entreprise**. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L59) |
| `select_agreement_supported` | 🔀 `{path, idcc}` | La convention choisie est **prise en charge** (contenu ou calcul dédié disponible). | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L10) |
| `select_agreement_unsupported` | 🔀 `{path, idcc}` | La convention choisie **n'est pas** prise en charge : l'usager verra la réponse générale. **Sert à prioriser les conventions à traiter.** | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L14) |
| `click_previous_step_agreement_p1` | 🔀 `{path, context}` | Clic « Précédent » depuis l'écran de recherche par nom de convention. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L40) |
| `click_previous_step_agreement_p2` | 🔀 `{path, context}` | Clic « Précédent » depuis l'écran de recherche par entreprise. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L63) |

#### Recherche d'entreprise (parcours p2)

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `search_enterprise` | 🔀 `{path, context, query, city, department}` | À la soumission du formulaire (saisie non vide). `query` est le nom saisi, `city`/`department` la commune si elle est précisée. Mesure ce que les usagers cherchent et à quel point ils localisent. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L14) |
| `select_enterprise` | 🔀 `{path, context, label, siren}` | Clic sur une carte entreprise, ou auto-sélection si l'entreprise n'a qu'une convention. Identifie l'entreprise choisie. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L32) |
| `show_enterprise_agreements` | 🔀 `{path, count}` + `value` | À l'affichage des conventions d'une entreprise, **y compris quand elle n'en déclare aucune** (`count` vaut alors `0`). Émis une fois par entreprise, sur tous les parcours. Mesure la distribution 0 / 1 / N conventions par entreprise, et le taux d'échec de la recherche — que les events au clic ne captent pas, puisqu'ils ignorent les abandons. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L49) |
| `click_no_enterprise` | 🔀 `{path, context}` | Clic sur la carte « assistants maternels / particuliers employeurs » en mode lien (sortie vers la fiche de la convention 3239). | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L69) |
| `select_no_enterprise` | 🔀 `{path, context}` | Même option, en mode simulateur (sélection intégrée au parcours). Repère les usagers sans entreprise identifiable. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L73) |

> **Ce que la refonte débloque ici.** Sur 14 jours d'observation, **76 %** des events
> « accords affichés » et **15 %** des events « conventions affichées » arrivaient dans Matomo
> **sans leur contenu** : le compteur était envoyé seul, et Matomo traite le texte `0` comme
> une valeur vide. Le cas « aucune convention déclarée » — le plus intéressant pour le métier,
> puisque c'est celui où l'usager reste sans réponse — était donc **entièrement invisible**.
> Emballé dans le JSON, il remonte désormais.

#### Accords d'entreprise

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `show_enterprise_accords` | 🔀 `{path, count}` + `value` | Au chargement réussi des accords. `count` est le **vrai total** déclaré par le SIRET, pas le nombre de cartes affichées (plafonné à 5). Zéro compris. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L22) |
| `click_enterprise_accord` | 🔀 `{path, target}` | Clic sur une carte d'accord (sortie vers Légifrance). | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L7) |
| `click_all_enterprise_accords` | 🔀 `{path, siret}` | Clic sur « Voir tous les accords sur Légifrance ». | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L11) |
| `load_enterprise_accords_failed` | 🔀 `{path, siret}` | Échec de l'appel à l'API des accords. Signale un incident technique côté source de données. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L26) |

#### Recherche Légifrance depuis une page de convention

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `search_legifrance` | 🔀 `{path, agreement, query}` | Soumission du formulaire de recherche Légifrance depuis une page de convention. `agreement` est le titre court de la convention. Mesure ce que les usagers cherchent dans le texte de leur convention. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/LegiFranceSearch.tsx#L28) |

---

### Recherche

Barre de recherche (modale et accueil), page de résultats `/recherche`, et widget embarqué sur
les sites partenaires.

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `search_instant` | 🔀 `{path, query, class, definition}` | À chaque pré-recherche instantanée, une fois les résultats reçus. Volume et nature des recherches au fil de la frappe. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L91) |
| `search_full` | 🔀 `{path, query, class}` | Au chargement de `/recherche`, au plus une fois par couple requête + filtre. Recherche complète aboutie. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L38) |
| `click_all_results` | 🔀 `{path, query, class}` | Clic sur « Voir tous les résultats », avant la navigation. Mesure le passage de la pré-recherche à la recherche complète. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L102) |
| `select_instant_result` | 🔀 `{path, algo, class, target}` | Clic sur une carte de résultat de pré-recherche. Mesure la pertinence des suggestions instantanées. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L116) |
| `select_result` | 🔀 `{path, algo, target}` | Clic sur une carte de résultat, sur la page `/recherche` comme sur une page thème. `target` est la page atteinte, interne ou externe. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L30) |
| `select_suggestion` | 🔀 `{path, query, suggestion}` | Choix d'une suggestion d'autocomplétion. Usage et pertinence de l'autocomplétion. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L73) |
| `next_result_page` | 🔀 `{path, query}` | Pagination des résultats. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L66) |
| `widget_submit_search` | 🔀 `{path, query}` | Soumission du formulaire du widget embarqué sur un site partenaire. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L84) |
| `widget_click_logo` | 🔀 `{path}` | Clic sur le logo du widget embarqué, qui ouvre le site. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L79) |

> **Recherche interne native.** À la pré-recherche, et automatiquement à la visite de
> `/recherche`, le site alimente aussi la fonction **« Recherche interne » native de Matomo**
> (`trackSiteSearch`), qui a son propre rapport dédié. Ce n'est pas un event de ce catalogue.
> [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L130)
>
> `next_result_page` est **défini mais non branché** en production aujourd'hui : aucun
> composant ne l'appelle encore.

---

### Fiches pratiques (contributions)

Encart de personnalisation par convention en tête de fiche, agrandissement des tableaux, liste
des déclinaisons par convention, et indicateur de consultation effective de la réponse.

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `view_answer` | 🔀 `{path}` | Réponse **réellement consultée** : le titre du bloc réponse est entré dans le haut de l'écran **et** y est resté ~10 s en continu, onglet actif. Émis **une seule fois** par page. Indicateur clé de la consultation réelle du contenu, notamment sur les arrivées directes depuis une convention. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L58) |
| `click_show_agreement_content` | 🔀 `{path, target}` | « Afficher les informations » avec une convention valide et traitée : l'usager va vers la page dédiée à sa convention. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L20) |
| `click_show_general_content` | 🔀 `{path, target}` | Même bouton, mais la convention n'est pas traitée : l'usager reçoit les informations générales. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L30) |
| `click_show_content_without_agreement` | 🔀 `{path, target}` | « Afficher sans sélectionner de convention » : contenu générique. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L24) |
| `click_agreement_declination` | 🔀 `{path, target}` | Clic sur une convention listée dans l'accordéon « Votre réponse en fonction de votre convention collective », sous les références de la fiche générique. Ce bloc existe d'abord pour le maillage interne et le référencement ; l'event mesure son **usage réel** par les usagers. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L65) |
| `click_table_fullscreen` | 🔀 `{path}` | Clic sur « Voir le tableau en plein écran » (bouton affiché sur mobile). Signale un contenu difficile à lire sur petit écran. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L51) |

#### Notation de la clarté d'une fiche

Widget en bas de chaque fiche pratique : l'usager note la clarté du contenu de 1 (« Trop
compliqué ») à 5 (« Très clair »), puis valide. L'event part **au clic sur « Valider »**, une
seule fois par affichage, et seulement si l'usager a accepté Matomo.

Particularité technique : pour **contourner les bloqueurs de publicité**, le navigateur envoie
la note à une route interne du site, et c'est le **serveur** qui la relaie à Matomo.

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `rate_content_1` … `rate_content_5` | 🔀 `{path}` + `value` | La note voyage **dans l'action** afin que Matomo **compte** chaque note (combien de 1, combien de 5) plutôt que d'en faire la somme — c'est la répartition qui intéresse le métier, pas le total. `value` ajoute la moyenne. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/rating/tracking.ts#L70) |

---

### Indicateur NPS (recommandation du site)

Widget « Donnez votre avis ! » proposé sur **toutes les pages**. Une icône flottante l'ouvre à
la demande — elle s'agite automatiquement une fois, ~20 s après son apparition. La modale peut
aussi s'ouvrir **automatiquement** (sortie de page vers le haut, ou clic « Télécharger » /
« Copier » sur un modèle), **une seule fois par session**.

La clé **`trigger`** dit ce qui a déclenché l'affichage : `exit_intent` (sortie de page),
`download` / `copy` (modèle de courrier) ou `main` (clic sur l'icône).

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `display_nps` | 🔀 `{path, trigger}` | À l'affichage de la modale, quel qu'en soit le déclencheur. Mesure le volume de sollicitations et par quel canal. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/nps/tracking.ts#L19) |
| `refuse_nps` | 🔀 `{path, trigger}` | Fermeture « simple » (bouton Fermer, Échap, clic hors modale) **sans** valider ni refuser explicitement. Coupe les déclencheurs automatiques 7 jours, mais l'icône **reste** : l'usager peut encore répondre plus tard. Mesure l'abandon ponctuel. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/nps/tracking.ts#L23) |
| `optout_nps` | 🔀 `{path, trigger}` | Clic sur **« Ne pas répondre »** : refus explicite. Fait disparaître l'icône et coupe toute sollicitation 7 jours. À distinguer du refus simple ci-dessus. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/nps/tracking.ts#L30) |
| `submit_nps_0` … `submit_nps_10` | 🔀 `{path}` + `value` | Au clic sur « Valider ». Comme la notation de fiche, le score voyage **dans l'action** pour être compté et non sommé — un NPS se lit en répartition promoteurs / détracteurs, jamais en moyenne. Passe par la **route interne** du site (contournement des bloqueurs), le serveur relayant vers Matomo. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/api/modules/nps/service.ts) |

> Ces deux events relayés par le serveur (notation et NPS) prennent désormais **la catégorie du
> type de page** où l'usager a répondu, comme n'importe quel event client. Un NPS donné sur une
> fiche pratique et un NPS donné sur un simulateur deviennent comparables.
>
> **Note de lecture.** Le score NPS n'étant pas émis par le navigateur, il n'apparaît pas dans
> le catalogue extrait du code — celui-ci ne voit que les appels côté client. Il est documenté
> ici depuis le code du relai serveur. La notation de fiche, elle, figure au catalogue sous la
> forme générique `rate_content_<note>`, l'action exacte étant construite à partir de la note.

---

### Accueil

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `click_shortcut` | 🔀 `{path, target}` | Clic sur un bouton « voir tout » de l'accueil. `target` désigne la rubrique visée : `outils`, `themes`, `contribution`, `convention-collective`, `modeles-de-courriers`, `actualite`, `droit-du-travail`. Mesure les portes d'entrée préférées depuis l'accueil. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L23) |
| `click_guided_question` | 🔀 `{path, target}` | Clic sur un lien de la section « De la question à l'action ». `target` est la ressource visée. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L29) |

---

### Modèles de courriers

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `copy_letter_template` | 🔀 `{path}` | Copie d'un modèle, par le bouton « Copier le modèle » ou par Ctrl/Cmd+C. Le modèle concerné se lit dans `path`. Mesure les courriers les plus utilisés. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/modeles-de-courriers/tracking.ts#L11) |

---

### Avis sur la page & contact

Bandeau « Cette page vous a-t-elle été utile ? » en bas de page, et parcours de contact du pied
de page.

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `submit_feedback_positive` | 🔀 `{path}` | Clic sur « Oui » : la page a été utile. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L33) |
| `submit_feedback_negative` | 🔀 `{path}` | Clic sur « Non » ; ouvre le formulaire de précision. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L37) |
| `submit_feedback_reason` | 🔀 `{path, reason}` | À l'envoi, un event par motif coché. `reason` vaut `unclear` (informations pas claires), `unrelated` (page hors sujet), `unsatisfied` (désaccord avec la réglementation) ou `wrong` (informations fausses). | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L45) |
| `submit_feedback_comment` | 🔀 `{path, comment}` | À l'envoi, si un texte libre est saisi (parcours positif comme négatif). Verbatim, 500 caractères max. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L41) |
| `click_contact_form` | 🔀 `{path}` | Clic sur « Contacter nos services en région » dans le pied de page, qui mène au questionnaire de pré-qualification. `path` porte la page d'origine. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/besoin-plus-informations/tracking.ts#L19) |
| `select_contact_theme` | 🔀 `{path, theme}` | Clic sur « Suivant » à l'écran « Précisez votre question ». `theme` vaut `secteur-prive`, `secteur-public`, `cotisations-salaire`, `indemnisation-arret` ou `autorisation-travail-etranger`. Mesure la répartition des demandes et le hors-périmètre. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/besoin-plus-informations/tracking.ts#L23) |
| `click_phone_number` | 🔀 `{path}` | Clic sur le numéro affiché à l'écran de résultat, pour le thème « droit du travail secteur privé ». | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/besoin-plus-informations/tracking.ts#L7) |

> Le libellé historique de `click_contact_form` évoquait une modale ; le parcours est devenu
> une page à part entière, le nom a été corrigé à l'occasion de la refonte.

---

### Partage, contenus liés & tags de thème

Ces trois events existent sur **tous les types de page**. C'est là que la nouvelle catégorie
prend tout son sens : le rapport **Événements → Catégories** répond directement à « depuis
quels types de contenu partage-t-on le plus ? ».

| Action | Contexte (📌/🔀) | Quand / pourquoi | Code |
| ------ | ---------------- | ---------------- | ---- |
| `click_share` | 🔀 `{path, network}` | Clic sur un bouton du bloc « Partager la page ». `network` vaut `facebook`, `twitter`, `linkedin`, `email`, `whatsapp` ou `copier`. Quels contenus circulent, et par quels canaux. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L24) |
| `click_theme_tag` | 🔀 `{path, theme}` | Clic sur un tag de thème affiché sous le titre (fiches pratiques, fiches service-public et ministère du travail, informations, infographies, modèles de courrier). Mesure l'usage de ce point d'entrée vers la navigation par thème. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L30) |
| `click_related_content` | 🔀 `{path, target}` | Clic sur un lien de la rubrique « contenus liés » en bas de page. `target` est la page atteinte. Mesure le rebond éditorial. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L20) |

---

### Annexe — les catégories possibles

La catégorie est toujours l'un de ces types de page. La liste est volontairement courte pour
qu'aucune ligne ne soit tronquée par Matomo.

`home` · `contribution` · `information` · `convention-collective` · `modeles-de-courriers` ·
`themes` · `actualite` · `infographie` · `fiche-service-public` · `fiche-ministere-travail` ·
`code-du-travail` · `droit-du-travail` · `glossaire` · `quoi-de-neuf` · `regles-entreprise` ·
`outils` (la page qui liste les simulateurs) · `outil` (une page de simulateur) · `recherche` ·
`contact` · `widget` · `institutionnel` · `autre`
