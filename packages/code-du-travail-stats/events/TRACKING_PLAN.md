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

**96** events uniques · **105** au total · **29** catégories Matomo. Couverture vérifiée
exhaustivement face au catalogue extrait du code.

#### tracking générique (automatique sur chaque page)

Lors d'une visite sur une page du site, Matomo envoie par défaut un évènement de visite qui
contient le nom de la page et son url. Cet évènement est **automatique** (géré par la librairie
`matomo-next`) — il n'apparaît donc pas dans le catalogue des events « écrits dans le code ».

Exemple d'information envoyée suite à une visite sur la page des thèmes :

| Type        | Donnée                              | Info                                          |
| ----------- | ----------------------------------- | --------------------------------------------- |
| action_name | Thèmes - Code du travail numérique  | Titre de la page                              |
| url         | https://code.travail.gouv.fr/themes | Lien vers la page                             |
| urlref      | /                                   | Origine de l'utilisateur (ici la page d'accueil) |

---

### Outils

#### Simulateurs

Simulateurs (à base de `SimulatorLayout`) qui émettent du tracking d'étapes, avec leurs étapes
dans l'ordre. Le **titre** est celui utilisé dans l'action `view_step_<titre>` (en production,
`tool.title` chargé en base ; libellés canoniques ci-dessous).

| Titre                                          | Étapes (`name`)                                              |
| ---------------------------------------------- | ----------------------------------------------------------- |
| Indemnité de licenciement                      | start, info_cc, infos, anciennete, absences, salaires, results |
| Indemnité de rupture conventionnelle           | start, info_cc, infos, anciennete, absences, salaires, results |
| Indemnités de précarité                        | start, info_cc, info_generales, remuneration, indemnite     |
| Préavis de démission                           | start, info_cc, infos, results                              |
| Préavis de licenciement                        | start, status, info_cc, infos, results                      |
| Préavis de départ ou de mise à la retraite     | intro, origine, ccn, infos, anciennete, result              |
| Heures d'absence pour rechercher un emploi     | start, info_cc, infos, results                              |
| Trouver sa convention collective (outil dédié) | start (+ parcours convention collective, voir plus bas)     |

> Les étapes `infos` / `salaires` (indemnités de départ) et `infos` (préavis de licenciement)
> peuvent être **masquées** selon les réponses ; l'event n'est alors pas envoyé.
> Les outils `Procédure de licenciement` et `Simulateur d'embauche` (iframe URSSAF) n'émettent
> **pas** de `view_step`.

##### Évènements génériques sur les simulateurs

Émis par `SimulatorLayout` pour tous les simulateurs.
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L14 "SimulatorLayout/tracking.ts:14")

###### Arrivée / affichage d'une étape

Émis à l'affichage de chaque étape : au chargement initial (première étape, `name = start`) puis
à chaque avancée après « Commencer » / « Suivant ». Mesure la vue de chaque étape et la
progression dans le tunnel.

| Type     | Contenu                         | Détail                                                       |
| -------- | ------------------------------- | ------------------------------------------------------------ |
| category | outil                           |                                                              |
| action   | view_step_`Nom du simulateur`   | Le suffixe est le titre du simulateur                        |
| name     | Nom de l'étape (`start` en 1re) | Étape affichée                                               |

###### Étape précédente

Émis quand l'utilisateur clique sur « Précédent » pour revenir à l'étape antérieure. Mesure les
retours en arrière dans le parcours.

| Type     | Contenu                             | Détail                                          |
| -------- | ----------------------------------- | ----------------------------------------------- |
| category | outil                               |                                                 |
| action   | click_previous_`Nom du simulateur`  | Le suffixe est le titre du simulateur           |
| name     | Nom de l'étape                      | Étape ré-affichée                               |

###### Impression du résultat

Émis au clic sur « Imprimer le résultat » à la dernière étape, juste avant la boîte d'impression
du navigateur. Mesure l'intention de conserver le résultat.

| Type     | Contenu             | Détail                              |
| -------- | ------------------- | ----------------------------------- |
| category | outil               |                                     |
| action   | click_print         |                                     |
| name     | `Nom du simulateur` | Titre du simulateur imprimé         |

###### Résultat inéligible

Émis au calcul de l'étape « résultat » quand la simulation conclut à la **non-éligibilité**
(ancienneté / informations / absences non satisfaites). Mesure le taux de simulations
« non éligible ». Concerne les deux simulateurs d'indemnité.
[↗ licenciement](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-licenciement/events/useIndemniteLicenciementEventEmitter.tsx#L13 "useIndemniteLicenciementEventEmitter.tsx:13") ·
[↗ rupture conventionnelle](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-rupture-conventionnelle/events/useRuptureCoEventEmitter.tsx#L13 "useRuptureCoEventEmitter.tsx:13")

| Type     | Contenu                                                                              | Détail                        |
| -------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| category | outil                                                                               |                               |
| action   | view_step_Indemnité de licenciement · view_step_Indemnité de rupture conventionnelle | Simulateur concerné          |
| name     | results_ineligible                                                                  | L'utilisateur est inéligible  |

###### Spécifique « Préavis de retraite »

Deux étapes envoient le choix de l'utilisateur, au clic sur « Suivant ».
[↗ origine](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/OriginStep/store/store.ts#L44 "OriginStep/store.ts:44") ·
[↗ ancienneté](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/Seniority/store/store.ts#L46 "Seniority/store.ts:46")

| Type     | Contenu                                          | Détail                                                       |
| -------- | ------------------------------------------------ | ------------------------------------------------------------ |
| category | outil                                            |                                                              |
| action   | mise · depart                                    | Étape origine : mise à la retraite (employeur) ou départ volontaire |
| action   | anciennete_plus_2_ans · anciennete_moins_2_ans   | Étape ancienneté : plus / moins de 2 ans d'ancienneté déclarés |
| name     | —                                                |                                                              |

##### Étape pour renseigner sa convention collective

Cette étape n'est pas présente sur tous les simulateurs. Les events sont de **deux natures** :
ceux envoyés **sur l'action de l'utilisateur** (parcours entreprise), et ceux envoyés **au clic
sur « suivant »** (non envoyés en cas d'erreur de saisie). Trois parcours :

 * **p1** : je connais ma convention collective (je la saisis) → route `agreement`
 * **p2** : je ne la connais pas (je recherche mon entreprise) → route `enterprise`
 * **p3** : je ne souhaite pas la renseigner (je passe l'étape) → route `not-selected`

> ⚠️ En parcours **p1**, la recherche par mots-clés de la convention **n'émet aucun event** (le
> tracking de saisie n'est pas branché sur cette étape). Le seul event portant une requête JSON
> `{"query":…}` est `enterprise_search` du parcours p2. Le debounce de 300 ms ne concerne que
> l'appel API, pas les events.

**Émis sur l'action de l'utilisateur** (parcours p2 uniquement)
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L14 "EnterpriseAgreementSearch/tracking.ts:14")

1. **Recherche d'une entreprise** — émis à la soumission du formulaire (saisie non vide). Mesure
   les recherches d'entreprise.

| Type     | Contenu               | Détail                                                     |
| -------- | --------------------- | --------------------------------------------------------- |
| category | enterprise_search     | Recherche d'une entreprise (p2)                           |
| action   | `Nom du simulateur`   | Titre du simulateur (contexte appelant)                   |
| name     | `{"query":"odon","apiGeoResult":…}` | JSON : requête saisie + localisation         |

2. **Sélection d'une entreprise** — émis au clic sur une carte entreprise (ou auto-sélection si
   convention unique). Identifie l'entreprise choisie.

| Type     | Contenu             | Détail                                       |
| -------- | ------------------- | -------------------------------------------- |
| category | enterprise_select   |                                              |
| action   | `Nom du simulateur` | Titre du simulateur                          |
| name     | `{"label":"…","siren":"…"}` | Entreprise sélectionnée              |

3. **Convention déduite de l'entreprise** — émis quand la CC rattachée à l'entreprise est
   retenue. Mesure la sélection effective via le parcours entreprise.

| Type     | Contenu             | Détail                                   |
| -------- | ------------------- | ---------------------------------------- |
| category | cc_select_p2        |                                          |
| action   | `Nom du simulateur` | Titre du simulateur                      |
| name     | `idcc<num>`         | IDCC de la convention, préfixé `idcc`    |

**Émis au clic sur « suivant »** (tous parcours, via `pushAgreementEvents`)
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L25 "pushAgreementEvents.ts:25")

1. **Choix du parcours** (toujours envoyé) — indique quel parcours l'utilisateur a suivi.
   Mesure la répartition p1/p2/p3.

| Type     | Contenu                            | Détail                                   |
| -------- | ---------------------------------- | ---------------------------------------- |
| category | cc_search_type_of_users            |                                          |
| action   | click_p1 · click_p2 · click_p3     | p1 = par nom de CC · p2 = par entreprise · p3 = sans CC |
| name     | `Nom du simulateur`                | Titre du simulateur                      |

2. **Entreprise retenue, parcours p2** (si une entreprise a été renseignée)

| Type     | Contenu             | Détail                             |
| -------- | ------------------- | ---------------------------------- |
| category | enterprise_select   |                                    |
| action   | `Nom du simulateur` | Titre du simulateur                |
| name     | `{"label":"…","siren":"…"}` | Entreprise sélectionnée    |

3. **Choix de la convention collective** — émis quand une CC a été effectivement sélectionnée.

| Type     | Contenu                        | Détail                                    |
| -------- | ------------------------------ | ----------------------------------------- |
| category | cc_select_p1 · cc_select_p2    | Selon le parcours (p1 = saisie, p2 = entreprise) |
| action   | `Nom du simulateur`            | Titre du simulateur                       |
| name     | `idcc<num>`                    | IDCC choisi, préfixé `idcc`               |

4. **Support de la convention collective** — indique si la CC choisie est **prise en charge**
   par le simulateur (calcul/contenu spécifique disponible). Sert à prioriser les CC à traiter.

| Type     | Contenu                                     | Détail                                       |
| -------- | ------------------------------------------- | -------------------------------------------- |
| category | outil                                       |                                              |
| action   | cc_select_traitée · cc_select_non_traitée   | CC prise en charge ou non par le simulateur  |
| name     | `<num>`                                     | Numéro IDCC **brut** (sans préfixe `idcc`)   |

5. **« Je n'ai pas d'entreprise »** (particulier employeur / assistant maternel) — coché dans le
   parcours entreprise ; repère les utilisateurs sans entreprise identifiable.

| Type     | Contenu                          | Détail                              |
| -------- | -------------------------------- | ----------------------------------- |
| category | cc_search_type_of_users          |                                     |
| action   | select_je_n_ai_pas_d_entreprise  |                                     |
| name     | `Nom du simulateur`              | Titre du simulateur                 |

6. **Convention collective bloquante** — émis quand la CC saisie n'est pas prise en charge et
   **bloque** la poursuite : l'utilisateur est renvoyé vers la consultation de sa CC. Seuls
   **Préavis de démission** et **Heures d'absence pour rechercher un emploi** l'émettent. Mesure
   le volume d'utilisateurs bloqués faute de CC traitée.

| Type     | Contenu                                                                               | Détail                    |
| -------- | ------------------------------------------------------------------------------------ | ------------------------- |
| category | outil                                                                                |                           |
| action   | view_step_Préavis de démission · view_step_Heures d'absence pour rechercher un emploi | Simulateur concerné       |
| name     | user_blocked_info_cc                                                                 |                           |

##### Avis sur les simulateurs (feedback)

Questionnaires de satisfaction affichés après le résultat (simulateurs d'indemnités de départ).
Les catégories `…_rupture_co` sont la variante du simulateur de rupture conventionnelle.
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "indemnite-depart/feedback/tracking.tsx:38")

| Catégorie                       | Action                          | Name (📌/🔀)         | Quand / pourquoi |
| ------------------------------- | ------------------------------- | -------------------- | ---------------- |
| feedback_simulateurs · feedback_simulateurs_rupture_co | Comment_s_est_passée_la_simulation | 📌 `<feedback>` (pas_bien / moyen / très_bien) | 1er questionnaire (smileys) à l'envoi, si un smiley est choisi. Satisfaction globale. |
| feedback_simulateurs · feedback_simulateurs_rupture_co | Facilité_utilisation_simulateur | 📌 note 1 à 5 | Questionnaire détaillé, si la question « utilisation du simulateur » est notée. |
| feedback_simulateurs · feedback_simulateurs_rupture_co | Clarté_questions | 📌 note 1 à 5 | Questionnaire détaillé, si la question « informations et instructions » est notée. |
| feedback_simulateurs · feedback_simulateurs_rupture_co | Clarté_résultat | 📌 note 1 à 5 | Questionnaire détaillé, si la question « explications du résultat » est notée. |
| feedback_suggestion · feedback_suggestion_rupture_co | `<texte libre>` | 🔀 `<url sans query>` | Envoi du questionnaire détaillé, si le commentaire libre est renseigné. Verbatim qualitatif. |

---

### Recherche

Barre de recherche (modale / accueil), page de résultats `/recherche` et widget embarqué.
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L94 "recherche/tracking.ts")

| Catégorie              | Action                | Name (📌/🔀)                          | Quand / pourquoi |
| ---------------------- | --------------------- | ------------------------------------- | ---------------- |
| search                 | presearch             | 📌 `{"query":…,"class":…,"definition":…}` | À chaque pré-recherche instantanée (modale / accueil), une fois les résultats reçus. Volume et nature des recherches instantanées. |
| search                 | fullsearch            | 📌 `{"query":…,"class":…}`             | Au chargement de `/recherche`, au plus une fois par couple {query, class}. Recherche complète aboutie. |
| search                 | selectPresearchResult | 📌 `{"algo":…,"queryClass":…,"url":…}` | Au clic sur une carte de résultat de pré-recherche. Pertinence des suggestions instantanées. |
| search                 | clickSeeAllResults    | 📌 `{"query":…,"class":…}`             | Au clic sur « Voir tous les résultats », avant la navigation vers `/recherche`. Passage pré-recherche → recherche complète. |
| selectResult           | `{"algo":…,"url":…}`  | 📌 —                                  | Au clic sur une carte de résultat de la page `/recherche` (documents + « Pour aller plus loin »). Clics sortants. |
| selectedSuggestion     | `<query>`             | 🔀 `<suggestion>`                     | Au choix d'une suggestion d'autocomplétion. Usage et pertinence de l'autocomplétion. |
| _matomo_trackSiteSearch (natif) | `<query>`    | 🔀 —                                  | Recherche interne native Matomo : à la pré-recherche (modale/accueil) et automatiquement à la visite de `/recherche`. |
| widget_search          | submit_search         | 📌 `<query>`                          | À la soumission du formulaire du widget embarqué (sites partenaires). |
| widget_search          | click_logo            | 📌 —                                  | Au clic sur le logo CDTN du widget embarqué (ouverture du site). |

> **Définis mais non branchés en production aujourd'hui** (aucun déclencheur utilisateur réel) :
> `search / fullsearch` en [recherche/tracking.ts:64](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L64) (variante non dédupliquée) et
> `nextResultPage` (pagination) en [recherche/tracking.ts:104](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L104).

---

### Accueil

Clics sur les boutons « voir tout » et les questions guidées de la page d'accueil.
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20 "home/tracking.ts")

| Catégorie | Action (📌, name = —)                          | Quand / pourquoi |
| --------- | --------------------------------------------- | ---------------- |
| page_home | click_comprendre_le_droit_du_travail          | Bouton « Comprendre le droit du travail » → `/droit-du-travail`. |
| page_home | click_voir_tous_les_outils                    | Bouton « Voir tous les simulateurs » → `/outils`. |
| page_home | click_voir_tous_les_themes                    | Bouton « Voir tous les thèmes » → `/themes`. |
| page_home | Click_voir_tous_modeles_de_documents          | Bouton « Parcourir les modèles » → `/modeles-de-courriers`. |
| page_home | click_voir_toutes_les_actualites              | Bouton « Lire toutes les actualités » → `/actualite`. |
| page_home | click_voir_toutes_les_conventions_collectives | Bouton « Voir toutes les conventions collectives » → `/convention-collective`. |
| page_home | click_voir_toutes_les_fiches_pratiques        | Bouton « Voir toutes les fiches pratiques » → `/contribution`. |
| page_home | click_question_action (name = `<slug>`)       | Clic sur un lien de la section « De la question à l'action » ; le `name` = slug de la ressource ciblée. |

---

### Thèmes

| Catégorie    | Action                  | Name (🔀) | Quand / pourquoi | Code |
| ------------ | ----------------------- | --------- | ---------------- | ---- |
| selectResult | `{"url":"<url cliquée>"}` | —       | Au clic sur une carte de document/résultat lié d'une page thème ; l'action porte l'URL cible (externe ou route interne). | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/themes/tracking.ts#L14 "themes/tracking.ts:14") |

---

### Contributions (fiches pratiques)

Encart de personnalisation par convention collective en tête d'une contribution, plus
l'agrandissement des tableaux du contenu.
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L24 "contributions/tracking.ts")

| Catégorie    | Action                                    | Name (📌)                     | Quand / pourquoi |
| ------------ | ----------------------------------------- |-------------------------------| ---------------- |
| outil        | cc_select_traitée                         | `<idcc>`                      | CC sélectionnée **prise en charge** par la contribution (contenu dédié disponible). |
| outil        | cc_select_non_traitée                     | `<idcc>`                      | CC sélectionnée **non prise en charge** (l'usager verra la réponse générale). |
| contribution | click_afficher_les_informations_CC        | `<withVariant(path,variant)>` | « Afficher les informations » avec une CC valide et traitée → page dédiée à la CC. |
| contribution | click_afficher_les_informations_générales | `<withVariant(path,variant)>` | « Afficher les informations » avec une CC **non** traitée → informations générales. |
| contribution | click_afficher_les_informations_sans_CC   | `<withVariant(path,variant)>` | « Afficher sans sélectionner de CC » → contenu générique (émis avec `click_p3`). |
| contribution | btn_table_fullscreen                      | `contribution/<slug>`         | Clic sur « Voir le tableau en plein écran » pour agrandir un tableau du contenu (bouton affiché sur mobile) ; `name` = slug de la contribution. |
| cc_search_type_of_users | click_p1 · click_p2 · click_p3 | `<withVariant(path,variant)>` | Parcours de choix de CC : par nom (p1), par entreprise (p2), sans CC (p3). |

---

### Notation de la clarté d'une contribution

Widget affiché en bas de chaque contribution : l'usager note la **clarté du contenu** de la
page à l'aide d'un curseur de 1 (« Trop compliqué ») à 5 (« Très clair »), puis clique sur
« Valider ». L'event part **au clic sur « Valider »** (une seule fois par affichage du widget ;
aucune persistance côté client, recharger la page ré-affiche le widget). Il n'est émis que si
l'usager a accepté Matomo (opt-out).

Particularité technique : pour **contourner les bloqueurs de publicité** (qui filtrent
`matomo.php` côté navigateur), le client fait un POST same-origin vers `/api/contribution-rating`
et c'est le **serveur** qui relaie l'event vers Matomo. La `category`/`action` sont posées côté
serveur ; le nom d'event (`e_n`) et la clé d'URL canonique sont le **slug** de la contribution
**préfixé de son type de contenu** (`contribution/<slug>`) — le type désambiguïse deux slugs
identiques portés par des types différents.

La **note voyage dans l'action** de l'event, en clair : `note_1` … `note_5`. Elle n'est
volontairement **pas** envoyée en valeur numérique (`e_v`) : Matomo **additionne** les valeurs
dans ses rapports, alors que la lecture métier attendue est le **décompte de chaque note par
contenu**. Dans Matomo : rapport Événements → « Noms d'événements » → une ligne par contenu
(`contribution/<slug>`), puis le détail par action donne la **répartition des notes** (combien
de `note_1`, de `note_2`, …).

[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/rating/tracking.ts#L61 "rating/tracking.ts")

| Catégorie             | Action (🔀)      | Name (🔀)             | Quand / pourquoi |
| --------------------- | ---------------- | --------------------- | ---------------- |
| notation_contribution | `note_<value>`   | `contribution/<slug>` | Au clic sur « Valider » du widget de notation en bas d'une contribution. Le nom d'event préfixe le slug de son type de contenu (`contribution/…`) pour désambiguïser deux slugs identiques de types différents. Mesure la clarté perçue du contenu ; la note **1 à 5** (1 = Trop compliqué … 5 = Très clair) voyage **en chaîne dans l'action** (`note_1` … `note_5`) afin que Matomo compte les occurrences de chaque note au lieu d'en faire la somme. |

---

### Indicateur NPS (recommandation du site)

Widget « Donnez votre avis ! » proposé sur **toutes les pages** (desktop + mobile). Une icône
« main » flottante l'ouvre à la demande — elle **s'agite automatiquement une fois**, ~20 s après
son apparition, pour attirer l'œil sans être intrusive. La modale peut aussi s'ouvrir
**automatiquement** (sortie de page vers le haut, ou clic « Télécharger »/« Copier » sur un modèle
de courrier), **une seule fois par session**. L'usager note de **0 à 10** sa propension à
recommander le site, puis valide.

Trois events Matomo, tous de catégorie **`nps`**, suivent le **cycle de vie de la modale**
(affichage, refus « simple », opt-out). Ils portent le **déclencheur** en suffixe d'`action` et le
**chemin de la page** en `name`, et sont émis via le `sendEvent` standard (soumis à l'opt-out
Matomo). Le déclencheur `<trigger>` vaut `exit_intent` (sortie de page), `download` / `copy` (clic
sur un modèle de courrier) ou `main` (clic sur l'icône).
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/nps/tracking.ts#L17 "nps/tracking.ts:17")

| Catégorie | Action (🔀)          | Name (🔀)          | Quand / pourquoi |
| --------- | -------------------- | ------------------ | ---------------- |
| nps       | `display_<trigger>`  | `<page_type/slug>` | À l'affichage de la modale, quel qu'en soit le déclencheur. Mesure le volume de sollicitations et leur canal (`<trigger>`). |
| nps       | `refusal_<trigger>`  | `<page_type/slug>` | À la fermeture « simple » (bouton « Fermer », Échap, clic hors modale) **sans** valider ni cliquer « Ne pas répondre ». La « main » **reste** affichée : l'usager peut encore répondre plus tard. Mesure l'abandon ponctuel de la modale. |
| nps       | `optout_<trigger>`   | `<page_type/slug>` | Au clic sur **« Ne pas répondre »** : refus explicite. Fait **disparaître la main** et coupe toute sollicitation NPS pendant **1 jour**, tous onglets confondus (cookie ; déclencheurs automatiques compris). Mesure les opt-out volontaires, à distinguer du refus « simple » ci-dessus. |

> **La note (0 à 10) n'est pas un event Matomo côté client** : au clic sur « Valider », le score
> part vers l'**API proxy interne** `/api/nps` (POST same-origin — contourne les bloqueurs et
> permettra de router la donnée ailleurs demain). Le serveur relaie alors vers Matomo un event de
> catégorie **`nps`** (posée **en dur** côté serveur) : `action` = **`score_<0..10>`** — la note
> voyage **en chaîne dans l'action** (comme la notation de contribution) pour être **comptée** et
> non sommée par Matomo —, `name` = `page_type/slug`. N'étant pas un `sendEvent` client, il
> n'apparaît pas dans le catalogue extrait du code.

---

### Convention collective (recherche & consultation dédiées)

En dehors des simulateurs : l'outil « Trouver sa convention collective » et la recherche
entreprise/accords.

**Outil « Trouver sa convention collective »**
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L27 "convention-collective/tracking.ts")

| Catégorie               | Action                                | Name (📌)                          | Quand / pourquoi |
| ----------------------- | ------------------------------------- | ---------------------------------- | ---------------- |
| outil                   | view_step_Trouver sa convention collective | start                         | Affichage de l'écran d'intro de l'outil. |
| cc_search_type_of_users | click_p1                              | Trouver sa convention collective   | « Je cherche uniquement une convention collective » → `/convention`. |
| cc_search_type_of_users | click_p2                              | Trouver sa convention collective   | « Je cherche mon entreprise » → `/entreprise`. |
| cc_select_p1            | `Nom du contexte`                     | `<idcc>`                           | Sélection d'une CC dans l'autocomplétion (action = « Trouver sa convention collective » sur la page dédiée, ou titre du simulateur si réutilisé). |
| view_step_cc_search_p1  | back_step_cc_search_p1                | Trouver sa convention collective   | Clic « Précédent » de l'écran de recherche par CC. |

**Recherche entreprise & accords** (parcours p2)
[↗ recherche](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L14 "EnterpriseAgreementSearch/tracking.ts") ·
[↗ accords](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L13 "accords/tracking.ts")

| Catégorie               | Action                          | Name (📌/🔀)                      | Quand / pourquoi |
| ----------------------- | ------------------------------- | --------------------------------- | ---------------- |
| enterprise_search       | `Nom du contexte`               | 🔀 `{"query":…,"apiGeoResult":…}` | Soumission du formulaire de recherche d'entreprise. |
| enterprise_select       | `Nom du contexte`               | 🔀 `{"label":…,"siren":…}`        | Sélection d'une entreprise (ou auto-sélection si convention unique). |
| cc_select_p2            | `Nom du contexte`               | 🔀 `idcc<num>`                    | Validation de la CC rattachée à l'entreprise. |
| view_step_cc_search_p2  | back_step_cc_search_p2          | 📌 Trouver sa convention collective | Clic « Précédent » à l'étape recherche par entreprise. |
| cc_search_type_of_users | click_je_n_ai_pas_d_entreprise  | 📌 Trouver sa convention collective | Carte « assistants maternels / particuliers employeurs » en mode lien → fiche CC 3239 (clic sortant). |
| cc_search_type_of_users | select_je_n_ai_pas_d_entreprise | 📌 Trouver sa convention collective | Même option en mode simulateur (sélection intégrée au parcours). |
| accord_enterprise_search | click_accord                   | 📌 `<url>`                        | Clic sur une carte d'accord d'entreprise (Légifrance). |
| accord_enterprise_search | click_all_accords              | 📌 `<siret>`                      | « Voir tous les accords sur Légifrance ». |
| accord_enterprise_search | show_accords                   | 📌 `<count>`                      | Chargement réussi des accords ; `name` = nombre trouvé. |
| accord_enterprise_search | load_accords_failed            | 📌 `<siret>`                      | Échec de l'appel API des accords (incident). |

**Recherche Légifrance sur une page de CC**
[↗ source](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/LegiFranceSearch.tsx#L24 "convention-collective/LegiFranceSearch.tsx")

| Catégorie      | Action                | Name (🔀)  | Quand / pourquoi |
| -------------- | --------------------- | ---------- | ---------------- |
| pagecc_searchcc | `<shortTitle>`       | 🔀 `<q>`   | Soumission du formulaire de recherche Légifrance depuis une page de CC. |

---

### Modèles de courriers

| Catégorie                | Action      | Name (📌) | Quand / pourquoi | Code |
| ------------------------ | ----------- | --------- | ---------------- | ---- |
| page_modeles_de_documents | type_CTRL_C | `<slug>` | Copie d'un modèle (bouton « Copier le modèle » ou raccourci Ctrl/Cmd+C). Mesure les courriers les plus copiés. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/modeles-de-courriers/tracking.ts#L7 "modeles-de-courriers/tracking.ts:7") |

---

### Avis & contact (bas de page)

Bandeau « Cette page vous a-t-elle été utile ? » et modale de contact du footer.
[↗ feedback](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L29 "layout/feedback/tracking.ts") ·
[↗ contact](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/footer/infos/tracking.ts#L17 "layout/footer/infos/tracking.ts")

| Catégorie         | Action                  | Name (📌/🔀)         | Quand / pourquoi |
| ----------------- | ----------------------- | -------------------- | ---------------- |
| feedback          | positive                | 📌 `<baseUrl>`       | Clic sur « Oui » (page utile). |
| feedback          | negative                | 📌 `<baseUrl>`       | Clic sur « Non » ; ouvre le formulaire de précision. |
| feedback_category | `<motif de feedback>`   | 📌 `<baseUrl>`       | À l'envoi, un event par motif coché (4 motifs prédéfinis, parcours négatif). |
| feedback_suggestion | `<suggestion>`        | 🔀 `<baseUrl>`       | À l'envoi, si un texte libre est saisi (parcours positif ou négatif). Verbatim (500 car. max). |
| contact           | click_contact_sr_modale | 📌 `<currentPathName>` | Ouverture de la modale « Contacter nos services en région » depuis le bloc footer (questionnaire de pré-qualification SRDT). `name` = page d'origine. |
| contact           | select_theme_contact_sr | 📌 `<theme>`          | Clic sur « Suivant » à l'écran « Précisez votre question » ; `name` = thème choisi (secteur-prive, secteur-public, cotisations-salaire, indemnisation-arret, autorisation-travail-etranger). Mesure la répartition des demandes et le hors-périmètre. |
| contact           | click_phone_number      | 📌 —                 | Clic sur le numéro 0 806 000 126 affiché à l'écran résultat pour le thème « droit du travail secteur privé ». |

Les 4 motifs possibles de `feedback_category` (un event par case cochée) :

- `Les informations ne sont pas claires.`
- `Les informations me semblent fausses.`
- `Cette page ne correspond pas à ma recherche ou à ma situation.`
- `Je ne suis pas satisfait de cette réglementation.`

---

### Partage & contenus liés (commun)

| Catégorie     | Action                | Name (🔀)                       | Quand / pourquoi | Code |
| ------------- | --------------------- | ------------------------------- | ---------------- | ---- |
| clic_share    | `<url de la page>`    | `<réseau>` (facebook, twitter, linkedin, email, whatsapp, copier) | Clic sur un bouton du bloc « Partager la page ». Quels contenus, via quels canaux. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L29 "common/tracking.ts:29") |
| selectRelated | `{"selection":"<url>"}` | —                             | Clic sur un lien de la rubrique « contenus liés » en bas de page. | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L22 "common/tracking.ts:22") |
