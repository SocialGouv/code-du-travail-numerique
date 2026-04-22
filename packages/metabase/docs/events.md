<!-- AUTO-GENERATED par events/generate-events-doc.ts — NE PAS EDITER A LA MAIN -->
<!-- Regenerer : pnpm -F @cdt/metabase events:docs -->
<!-- Source technique : events/events.extracted.json (AST scan) -->
<!-- Description metier : events/events.metadata.yaml (a maintenir) -->

# Glossaire des Events Matomo

Genere le **2026-04-22T10:01:51.889Z** depuis `packages/code-du-travail-frontend/src`.

**Stats :** 61 callsites · 57 events uniques · **54 documentes** · **3 orphelins** · 7 metadata orphelines.

> Cette page est le point d'entree unique pour comprendre les events trackes par le frontend CDTN et leur usage dans les dashboards Metabase. Chaque entree est extraite statiquement depuis le code TS puis enrichie avec la description metier maintenue dans `events/events.metadata.yaml`.

## Sommaire

- [cc-search](#cc-search) (11)
- [contact](#contact) (2)
- [contributions](#contributions) (3)
- [documents](#documents) (1)
- [enterprise](#enterprise) (3)
- [feedback](#feedback) (4)
- [header](#header) (3)
- [home](#home) (2)
- [navigation](#navigation) (1)
- [recherche](#recherche) (11)
- [share](#share) (1)
- [simulateurs](#simulateurs) (12)
- [Orphelins](#orphelins) (3)
- [Metadata orpheline](#metadata-orpheline) (7)
- [Commandes Matomo de configuration](#commandes-matomo-de-configuration-non-events) (9)

---

## cc-search

### `cc_search_type_of_users` / `<parcours!>`

Parcours CC dynamique (ternary : click_p1 / click_p2 / click_p3 / click_je_n_ai_pas_d_entreprise)

- **Declenche par :** Resolu a runtime dans pushAgreementEvents.ts selon le parcours (`parcours!` variable). Voir les entrees specifiques ci-dessus pour chaque valeur.
- **Metadata :** herite de `cc_search_type_of_users:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts:44` (`pushAgreementEvents()`) — name: `<simulatorTitle>`

### `cc_search_type_of_users` / `click_je_n_ai_pas_d_entreprise`

Declaration : pas d'entreprise

- **Declenche par :** Clic sur 'Je n'ai pas d'entreprise' dans le parcours CC
- **KPI :** Parcours bloques (KPI 4 dashboard 36)
- **Dashboards :** #36
- **Cartes :** #441
- **MV source :** `mv_kpi_personnalisation`
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts:52` (`emitNoEnterpriseClickEvent()`) — name: `Trouver sa convention collective`

### `cc_search_type_of_users` / `click_p1`

Parcours P1 : recherche par nom de CC

- **Declenche par :** Clic sur l'option 'Je connais le nom de ma convention collective' dans le selecteur de parcours
- **Callsites :** 2
  - `packages/code-du-travail-frontend/src/modules/contributions/tracking.ts:61` (`emitClickP1()`) — name: `<path>`
  - `packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts:34` (`emitNavigateAgreementSearchEvent()`) — name: `Trouver sa convention collective`

### `cc_search_type_of_users` / `click_p2`

Parcours P2 : recherche par nom d'entreprise

- **Declenche par :** Clic sur l'option 'Je connais le nom de mon entreprise' dans le selecteur de parcours
- **Callsites :** 2
  - `packages/code-du-travail-frontend/src/modules/contributions/tracking.ts:69` (`emitClickP2()`) — name: `<path>`
  - `packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts:42` (`emitNavigateEnterpriseSearchEvent()`) — name: `Trouver sa convention collective`

### `cc_search_type_of_users` / `click_p3`

Parcours P3 : renonciation CC

- **Declenche par :** Clic sur l'option 'Je ne sais pas' / 'Je n'ai pas d'entreprise' - l'utilisateur saute l'etape CC
- **KPI :** Renonciation (KPI 3 dashboard 36)
- **Dashboards :** #36
- **Cartes :** #436, #440, #444
- **MV source :** `mv_kpi_personnalisation`
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/contributions/tracking.ts:77` (`emitClickP3()`) — name: `<path>`

### `cc_search_type_of_users` / `select_je_n_ai_pas_d_entreprise`

Variante select : pas d'entreprise

- **Declenche par :** Meme chose que click_je_n_ai_pas_d_entreprise mais depuis le composant select (event de repli)
- **Notes :** Double-fired avec click_je_n_ai_pas_d_entreprise dans certains parcours
- **Callsites :** 2
  - `packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts:59` (`emitNoEnterpriseSelectEvent()`) — name: `Trouver sa convention collective`
  - `packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts:75` (`pushAgreementEvents()`) — name: `<simulatorTitle>`

### `cc_select_p1` / `<action>`

CC selectionnee depuis le parcours P1

- **Declenche par :** Apres avoir choisi une CC dans l'autocomplete P1
- **Metadata :** herite de `cc_select_p1:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts:50` (`emitSelectEvent()`) — name: `<idcc>`

### `cc_select_p2` / `<action>`

CC selectionnee depuis le parcours P2 (via entreprise)

- **Declenche par :** Apres avoir choisi une entreprise puis sa CC rattachee dans P2
- **Metadata :** herite de `cc_select_p2:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts:36` (`emitSelectEnterpriseAgreementEvent()`) — name: `<idcc>`

### `pagecc_searchcc` / `<shortTitle>`

Recherche par mots-cles dans le texte d'une CC sur Legifrance

- **Declenche par :** Submit du formulaire 'Recherche dans la convention collective' sur une fiche CC. Ouvre legifrance.gouv.fr/search/kali dans un nouvel onglet. Le `action` est le titre court de la CC, le `name` est la query saisie.
- **Notes :** Category fixe 'pagecc_searchcc', action = shortTitle de la CC (dynamique).
- **Metadata :** herite de `pagecc_searchcc:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/convention-collective/LegiFranceSearch.tsx:24` (`LegiFranceSearch()`) — name: `<q>`

### `view_step_cc_search_p1` / `back_step_cc_search_p1`

Retour etape P1 du parcours CC

- **Declenche par :** Clic sur 'Precedent' apres avoir cherche une CC par nom (parcours P1)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts:58` (`emitPreviousEvent()`) — name: `Trouver sa convention collective`

### `view_step_cc_search_p2` / `back_step_cc_search_p2`

Retour etape P2 du parcours CC

- **Declenche par :** Clic sur 'Precedent' apres avoir cherche une entreprise (parcours P2)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts:44` (`emitPreviousEvent()`) — name: `Trouver sa convention collective`

## contact

### `contact` / `click_contact_sr_modale`

Ouverture de la modale 'Besoin d'aide ?'

- **Declenche par :** Clic sur le lien 'Contact' qui ouvre la modale de contact support
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/layout/footer/infos/tracking.ts:24` (`emitModalIsOpened()`) — name: `<currentPathName>`

### `contact` / `click_phone_number`

Clic sur le numero de telephone dans le footer

- **Declenche par :** Clic sur le lien 'tel:...' dans le footer
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/layout/footer/infos/tracking.ts:17` (`emitTrackNumber()`)

## contributions

### `contribution` / `click_afficher_les_informations_CC`

Affichage de la reponse personnalisee sur une page contribution

- **Declenche par :** Clic sur le bouton 'afficher les informations personnalisees' apres selection d'une CC TRAITEE
- **KPI :** Personnalisation reussie (KPI 1 dashboard 36)
- **Dashboards :** #36
- **Cartes :** #435, #438, #443
- **MV source :** `mv_kpi_personnalisation`
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/contributions/tracking.ts:37` (`emitDisplayAgreementContent()`) — name: `<path>`

### `contribution` / `click_afficher_les_informations_générales`

Affichage des infos generales (sans personnalisation CC)

- **Declenche par :** Clic sur le bouton 'afficher les informations generales' - utilisateur renonce a personnaliser sa reponse
- **KPI :** Indicateur de rebond sur contributions (cartes 450/451)
- **Dashboards :** #88
- **Cartes :** #450, #451
- **MV source :** `mv_bounce_contributions`
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/contributions/tracking.ts:53` (`emitDisplayGeneralContent()`) — name: `<path>`

### `contribution` / `click_afficher_les_informations_sans_CC`

Affichage de la reponse generique (CC non traitee)

- **Declenche par :** Clic sur le bouton 'afficher les informations' apres selection d'une CC NON TRAITEE
- **KPI :** CC non traitee (KPI 4 dashboard 36)
- **Dashboards :** #36
- **Cartes :** #441
- **MV source :** `mv_kpi_personnalisation`
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/contributions/tracking.ts:45` (`emitDisplayGenericContent()`) — name: `<path>`

## documents

### `page_modeles_de_documents` / `type_CTRL_C`

Copie d'un modele de courrier

- **Declenche par :** L'utilisateur utilise Ctrl+C / Cmd+C pour copier le contenu d'un modele de courrier
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/modeles-de-courriers/tracking.ts:7` (`useModeleEvents()`) — name: `<slug>`

## enterprise

### `enterprise_search` / `<action>`

Recherche d'une entreprise

- **Declenche par :** Saisie dans le champ de recherche d'entreprise (parcours P2)
- **Metadata :** herite de `enterprise_search:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts:14` (`emitEnterpriseAgreementSearchInputEvent()`) — name: `<JSON.stringify({ query, apiGeoResult })>`

### `enterprise_select` / `<action>`

Entreprise selectionnee

- **Declenche par :** Selection d'une entreprise dans les suggestions
- **Metadata :** herite de `enterprise_select:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts:28` (`emitSelectEnterpriseEvent()`) — name: `<JSON.stringify(enterprise)>`

### `enterprise_select` / `<simulatorTitle>`

Entreprise selectionnee

- **Declenche par :** Selection d'une entreprise dans les suggestions
- **Metadata :** herite de `enterprise_select:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts:51` (`pushAgreementEvents()`) — name: `<JSON.stringify({
        label: values.enterprise.label,
        siren: value...>`

## feedback

### `feedback` / `negative`

Feedback negatif (peu clair / pas pertinent)

- **Declenche par :** Clic sur le pouce rouge ou equivalent en bas de page
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts:39` (`emitNegativeFeedback()`) — name: `<baseUrl>`

### `feedback` / `positive`

Feedback positif (clair / pertinent)

- **Declenche par :** Clic sur le pouce vert ou equivalent en bas de page
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts:29` (`emitPositiveFeedback()`) — name: `<baseUrl>`

### `feedback_category` / `<category>`

Categorie de feedback negatif

- **Declenche par :** Selection d'une raison apres un feedback negatif (infos fausses, pas claires, etc.)
- **Metadata :** herite de `feedback_category:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts:59` (`emitFeedbackCategory()`) — name: `<baseUrl>`

### `feedback_suggestion` / `<suggestion>`

Soumission d'une suggestion libre

- **Declenche par :** Texte libre envoye apres un feedback negatif
- **Metadata :** herite de `feedback_suggestion:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts:49` (`emitFeedbackSuggestion()`) — name: `<baseUrl>`

## header

### `header_cc` / `cc_consult`

Consultation d'une fiche CC depuis la modale globale

- **Declenche par :** Clic sur 'Voir la fiche' d'une CC dans la modale de selection globale
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts:33` (`emitConsultEvent()`) — name: `<idcc>`

### `header_cc` / `cc_select_processed | cc_select_unprocessed`

Selection de CC depuis la modale globale (cc_select_processed / cc_select_unprocessed)

- **Declenche par :** Selection d'une CC depuis la modale globale. Le `action` est `cc_select_processed` (CC traitee) ou `cc_select_unprocessed` (CC non traitee) selon la CC choisie.
- **Notes :** Le code fire un ternaire (processed ? 'cc_select_processed' : 'cc_select_unprocessed') ce qui apparait en dynamic a l'extraction - d'ou le wildcard ici.
- **Metadata :** herite de `header_cc:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts:23` (`emitSelectEvent()`) — name: `<idcc>`

### `header_cc` / `open_modal`

Ouverture de la modale de selection CC (header)

- **Declenche par :** Clic sur la CC selectionnee dans le header, qui ouvre la modale de selection globale
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts:16` (`emitOpenModalEvent()`)

## home

### `page_home` / `<action>`

Navigation depuis la homepage

- **Declenche par :** Clic sur un des boutons / cartes de la page d'accueil
- **Metadata :** herite de `page_home:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/home/tracking.ts:21` (`emitHomeClickButtonEvent()`)

### `page_home` / `click_question_action`

Navigation depuis la homepage

- **Declenche par :** Clic sur un des boutons / cartes de la page d'accueil
- **Metadata :** herite de `page_home:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/home/tracking.ts:28` (`emitQuestionActionEvent()`) — name: `<slug>`

## navigation

### `selectRelated` / `<JSON.stringify({ selection })>`

Clic sur un contenu relie

- **Declenche par :** Clic sur une carte 'Contenus relies' en bas d'une page
- **Metadata :** herite de `selectRelated:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/common/tracking.ts:22` (`emitSelectRelated()`)

## recherche

### `_matomo_trackSiteSearch` / `<query>`

Event Matomo natif : recherche interne (trackSiteSearch)

- **Declenche par :** Emis explicitement dans la modale Presearch via `push(['trackSiteSearch', query])`. Alimente le rapport 'Comportement > Recherche sur le site' dans Matomo (separe du report trackEvent).
- **Notes :** Different d'un sendEvent : c'est l'API Matomo native pour le site search. Sur la page /recherche, trackSiteSearch est automatiquement appele par matomo-next (cf. config `searchKeyword: 'query'` dans MatomoAnalytics.tsx).
- **Metadata :** herite de `_matomo_trackSiteSearch:*` (generique de categorie)
- **Methode :** push:trackSiteSearch
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:194` (`useSearchTracking()`) · `push:trackSiteSearch`

### `nextResultPage` / `<query>`

Pagination des resultats de recherche

- **Declenche par :** Clic sur 'Page suivante' dans les resultats
- **Metadata :** herite de `nextResultPage:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:105` (`useSearchTracking()`)

### `search` / `clickSeeAllResults`

Action sur la recherche full-text

- **Declenche par :** Interaction avec la barre de recherche principale (submit, scroll resultats, etc.)
- **Metadata :** herite de `search:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:159` (`useSearchTracking()`) — name: `<name>`

### `search` / `fullsearch`

Action sur la recherche full-text

- **Declenche par :** Interaction avec la barre de recherche principale (submit, scroll resultats, etc.)
- **Metadata :** herite de `search:*` (generique de categorie)
- **Callsites :** 2
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:65` (`useSearchTracking()`) — name: `<name>`
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:95` (`useSearchTracking()`) — name: `<name>`

### `search` / `presearch`

Action sur la recherche full-text

- **Declenche par :** Interaction avec la barre de recherche principale (submit, scroll resultats, etc.)
- **Metadata :** herite de `search:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:144` (`useSearchTracking()`) — name: `<name>`

### `search` / `selectPresearchResult`

Action sur la recherche full-text

- **Declenche par :** Interaction avec la barre de recherche principale (submit, scroll resultats, etc.)
- **Metadata :** herite de `search:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:182` (`useSearchTracking()`) — name: `<name>`

### `selectedSuggestion` / `<query>`

Clic sur une suggestion presearch

- **Declenche par :** Clic sur un element de la liste presearch (suggestions rapides sous la barre)
- **Metadata :** herite de `selectedSuggestion:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:113` (`useSearchTracking()`) — name: `<suggestion>`

### `selectResult` / `<JSON.stringify({
          algo,
          url: formattedUrl,
        })>`

Clic sur un resultat de recherche

- **Declenche par :** Clic sur un item dans la liste des resultats de recherche
- **Metadata :** herite de `selectResult:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:46` (`useSearchTracking()`)

### `selectResult` / `<JSON.stringify({
        url:
          externalUrl ||
          `/${getRoute...>`

Clic sur un resultat de recherche

- **Declenche par :** Clic sur un item dans la liste des resultats de recherche
- **Metadata :** herite de `selectResult:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/themes/tracking.ts:14` (`emitDocumentClickButtonEvent()`)

### `widget_search` / `click_logo`

Interaction widget de recherche

- **Declenche par :** Clic logo / submit depuis le widget de recherche (integre site externe)
- **Metadata :** herite de `widget_search:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:123` (`useSearchTracking()`)

### `widget_search` / `submit_search`

Interaction widget de recherche

- **Declenche par :** Clic logo / submit depuis le widget de recherche (integre site externe)
- **Metadata :** herite de `widget_search:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/recherche/tracking.ts:130` (`useSearchTracking()`) — name: `<query>`

## share

### `clic_share` / `<currentPageUrl>`

Partage de contenu

- **Declenche par :** Clic sur un bouton de partage social (Facebook, Twitter, LinkedIn, email, WhatsApp, copy link)
- **Metadata :** herite de `clic_share:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/common/tracking.ts:29` (`emitClickShare()`) — name: `<socialNetwork>`

## simulateurs

### `outil` / ``view_step_${TrackingAgreementSearchAction.AGREEMENT_SEARCH}``

Event generique simulateur (cc_select / view_step / click_previous / click_print resolus dynamiquement)

- **Declenche par :** Plusieurs emit functions (`pushAgreementEvents`, `SimulatorLayout`) fire des events 'outil' avec action construite a runtime (template `view_step_${title}`, ternaire cc_select_traitée / cc_select_non_traitée, etc.). Voir les entrees specifiques ci-dessus pour chaque valeur stable.
- **Metadata :** herite de `outil:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts:26` (`emitViewStepEvent()`) — name: `start`

### `outil` / `<MatomoActionEvent.CLICK_PREVIOUS + `_${title}`> | <MatomoActionEvent.VIEW_STEP + `_${title}`>`

Event generique simulateur (cc_select / view_step / click_previous / click_print resolus dynamiquement)

- **Declenche par :** Plusieurs emit functions (`pushAgreementEvents`, `SimulatorLayout`) fire des events 'outil' avec action construite a runtime (template `view_step_${title}`, ternaire cc_select_traitée / cc_select_non_traitée, etc.). Voir les entrees specifiques ci-dessus pour chaque valeur stable.
- **Metadata :** herite de `outil:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts:14` (`emitNextPreviousEvent()`) — name: `<currentStepName>`

### `outil` / `anciennete_plus_2_ans | anciennete_moins_2_ans`

Event generique simulateur (cc_select / view_step / click_previous / click_print resolus dynamiquement)

- **Declenche par :** Plusieurs emit functions (`pushAgreementEvents`, `SimulatorLayout`) fire des events 'outil' avec action construite a runtime (template `view_step_${title}`, ternaire cc_select_traitée / cc_select_non_traitée, etc.). Voir les entrees specifiques ci-dessus pour chaque valeur stable.
- **Metadata :** herite de `outil:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/Seniority/store/store.ts:46` (`onNextStep()`)

### `outil` / `cc_select_non_traitée`

CC selectionnee mais NON TRAITEE par le simulateur

- **Declenche par :** L'utilisateur a selectionne une CC qui n'a pas de traitement specifique dans le simulateur
- **KPI :** CC non traitees (KPI 5 dashboard 36)
- **Dashboards :** #36
- **Cartes :** #442, #444
- **MV source :** `mv_cc_non_traitees`
- **Notes :** La version sans accent (cc_select_non_traitee) existait aussi historiquement.
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/contributions/tracking.ts:29` (`emitAgreementUntreatedEvent()`) — name: `<idcc.toString()>`

### `outil` / `cc_select_traitée`

CC selectionnee et TRAITEE par le simulateur

- **Declenche par :** L'utilisateur a selectionne une CC qui a un traitement personnalise dans le simulateur
- **KPI :** Personnalisation reussie simulateur (KPI 1 dashboard 36)
- **Dashboards :** #36
- **Cartes :** #439, #443
- **MV source :** `mv_kpi_personnalisation`
- **Notes :** La version sans accent (cc_select_traitee) existait aussi historiquement - voir docs/events.md §Orphelins si drift.
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/contributions/tracking.ts:21` (`emitAgreementTreatedEvent()`) — name: `<idcc.toString()>`

### `outil` / `cc_select_traitée | cc_select_non_traitée`

Event generique simulateur (cc_select / view_step / click_previous / click_print resolus dynamiquement)

- **Declenche par :** Plusieurs emit functions (`pushAgreementEvents`, `SimulatorLayout`) fire des events 'outil' avec action construite a runtime (template `view_step_${title}`, ternaire cc_select_traitée / cc_select_non_traitée, etc.). Voir les entrees specifiques ci-dessus pour chaque valeur stable.
- **Metadata :** herite de `outil:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts:66` (`pushAgreementEvents()`) — name: `<values.selected.num.toString()>`

### `outil` / `click_print`

Impression du resultat du simulateur

- **Declenche par :** Clic sur le bouton 'Imprimer' apres obtention d'un resultat
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts:24` (`emitPrintEvent()`) — name: `<simulatorTitle>`

### `outil` / `mise | depart`

Event generique simulateur (cc_select / view_step / click_previous / click_print resolus dynamiquement)

- **Declenche par :** Plusieurs emit functions (`pushAgreementEvents`, `SimulatorLayout`) fire des events 'outil' avec action construite a runtime (template `view_step_${title}`, ternaire cc_select_traitée / cc_select_non_traitée, etc.). Voir les entrees specifiques ci-dessus pour chaque valeur stable.
- **Metadata :** herite de `outil:*` (generique de categorie)
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/OriginStep/store/store.ts:44` (`onNextStep()`)

### `outil` / `view_step_Heures d'absence pour rechercher un emploi`

Visualisation d'une etape du simulateur Heures recherche emploi

- **Declenche par :** Navigation sur une etape du simulateur 'Heures d'absence pour rechercher un emploi' (start, info_cc, results, infos, user_blocked_info_cc).
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/heures-recherche-emploi/events/useHeuresRechercheEmploiEventEmitter.tsx:11` (`useHeuresRechercheEmploiEventEmitter()`) — name: `user_blocked_info_cc`

### `outil` / `view_step_Indemnité de licenciement`

Visualisation d'une etape du simulateur IL

- **Declenche par :** Chaque fois que l'utilisateur navigue sur une etape du simulateur 'Indemnite de licenciement'. Le `name` contient le slug de l'etape (start, info_cc, infos, anciennete, absences, salaires, results, results_ineligible).
- **KPI :** Taux de completion des etapes (cartes 170, 448)
- **Dashboards :** #37
- **Cartes :** #170, #448
- **MV source :** `mv_funnel_il_irc_visits`
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/indemnite-licenciement/events/useIndemniteLicenciementEventEmitter.tsx:13` (`useIndemniteLicenciementEventEmitter()`) — name: `results_ineligible`

### `outil` / `view_step_Indemnité de rupture conventionnelle`

Visualisation d'une etape du simulateur IRC

- **Declenche par :** Chaque fois que l'utilisateur navigue sur une etape du simulateur 'Indemnite de rupture conventionnelle'. Le `name` contient le slug de l'etape.
- **KPI :** Taux de completion des etapes (cartes 107, 449)
- **Dashboards :** #37
- **Cartes :** #107, #449
- **MV source :** `mv_funnel_il_irc_visits`
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/indemnite-rupture-conventionnelle/events/useRuptureCoEventEmitter.tsx:13` (`useRuptureCoEventEmitter()`) — name: `results_ineligible`

### `outil` / `view_step_Préavis de démission`

Visualisation d'une etape du simulateur Preavis de demission

- **Declenche par :** Navigation sur une etape du simulateur Preavis de demission (start, info_cc, user_blocked_info_cc, results, infos).
- **Callsites :** 1
  - `packages/code-du-travail-frontend/src/modules/outils/preavis-demission/events/usePreavisDemissionEventEmitter.tsx:11` (`usePreavisDemissionEventEmitter()`) — name: `user_blocked_info_cc`

## Orphelins

Events emis par le code **sans description metier** dans `events/events.metadata.yaml`.
**Action requise :** completer la metadata pour chaque entree (cle `"<category>:<action>"`) puis relancer `pnpm events:docs`.

| category | action | callsites |
| --- | --- | --- |
| `<agreementSelect>` | `<simulatorTitle>` | `packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts:61` |
| `<category>` | `<event>` | `packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx:42` |
| `feedback_suggestion \| feedback_suggestion_rupture_co` | `<text>` | `packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx:54` |

## Metadata orpheline

Entrees de `events/events.metadata.yaml` **sans callsite correspondant** dans le code. Deux cas possibles :

1. L'event a ete supprime du code → supprimer l'entree de la metadata.
2. L'event existe encore mais sous une autre category/action → corriger la cle.

| cle | label | feature_group |
| --- | --- | --- |
| `feedback_simulateurs_rupture_co:*` | Feedback specifique au simulateur Rupture Conventionnelle | feedback |
| `feedback_simulateurs:*` | Feedback specifique au simulateur Indemnite de licenciement | feedback |
| `feedback_suggestion_rupture_co:*` | Suggestion texte libre simulateur RC | feedback |
| `outil:anciennete_moins_2_ans` | Simulateur Preavis retraite - anciennete < 2 ans | simulateurs |
| `outil:anciennete_plus_2_ans` | Simulateur Preavis retraite - anciennete > 2 ans | simulateurs |
| `outil:depart` | Simulateur Preavis retraite - choix 'Depart volontaire' | simulateurs |
| `outil:mise` | Simulateur Preavis retraite - choix 'Mise a la retraite' | simulateurs |

## Commandes Matomo de configuration (non-events)

Appels a `push([...])` ou `_paq.push([...])` qui configurent le tracker Matomo **sans emettre d'event**. Recenses ici pour completude : ils pilotent le consentement, les heatmaps, les A/B tests, le referrer, etc.

> **Note** : `trackAppRouter({...})` dans `modules/config/MatomoAnalytics.tsx` initialise le tracker et emet automatiquement un `trackPageView` a chaque changement de route (pages SPA Next.js). Ce n'est pas liste ci-dessous car c'est un wrapper de haut niveau.

| commande | args | fichier:ligne |
| --- | --- | --- |
| `AbTesting::create` | `<abTestConfig>` | `packages/code-du-travail-frontend/src/modules/config/initABTesting.ts:115` |
| `forgetCookieConsentGiven` | _(aucun)_ | `packages/code-du-travail-frontend/src/modules/utils/consent.ts:90` |
| `forgetUserOptOut` | _(aucun)_ | `packages/code-du-travail-frontend/src/modules/utils/consent.ts:86` |
| `HeatmapSessionRecording::disable` | _(aucun)_ | `packages/code-du-travail-frontend/src/modules/utils/consent.ts:71` |
| `HeatmapSessionRecording::enable` | _(aucun)_ | `packages/code-du-travail-frontend/src/modules/utils/consent.ts:69` |
| `optUserOut` | _(aucun)_ | `packages/code-du-travail-frontend/src/modules/utils/consent.ts:89` |
| `rememberCookieConsentGiven` | _(aucun)_ | `packages/code-du-travail-frontend/src/modules/utils/consent.ts:87` |
| `setCookieSameSite` | `None` | `packages/code-du-travail-frontend/src/modules/config/MatomoAnalytics.tsx:51` |
| `setReferrerUrl` | `<referrerUrl>` | `packages/code-du-travail-frontend/src/modules/config/MatomoAnalytics.tsx:47` |
