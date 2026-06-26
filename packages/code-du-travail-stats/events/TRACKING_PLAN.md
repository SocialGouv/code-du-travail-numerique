# Plan de tracking Matomo — CDTN

> ⚠️ Fichier généré automatiquement à partir de `events.extracted.json` — ne pas éditer à la main.
> Régénérer avec `pnpm -F @socialgouv/cdtn-stats doc:generate`.

**98** events uniques · **107** events au total · **10** modules.

## Légende

Les events sont regroupés par module, puis par catégorie Matomo.

- **📌 / 🔀** (3ᵉ colonne) : 📌 = action **fixe** (event clairement identifié) ; 🔀 = action **calculée à l'exécution** (une famille d'events). Le *name*, lui, peut varier (`<…>`) dans les deux cas.
- **Action / catégorie** : les deux identifiants Matomo qui définissent l'event.
- **Name** : libellé ou détail transmis avec l'event (`—` si absent).
- **`<…>`** : emplacement d'une valeur calculée à l'exécution (URL, requête saisie, titre d'outil…), non énumérable.
- **Code** : lien ↗ vers la ligne qui émet l'event (le `fichier:ligne` s'affiche au survol).

## Sommaire

- [common](#common) — 2 events
- [contributions](#contributions) — 8 events
- [convention-collective](#convention-collective) — 11 events
- [enterprise](#enterprise) — 11 events
- [home](#home) — 8 events
- [layout](#layout) — 9 events
- [modeles-de-courriers](#modeles-de-courriers) — 1 events
- [outils](#outils) — 45 events
- [recherche](#recherche) — 11 events
- [themes](#themes) — 1 events

## common

### 📂 clic_share · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<currentPageUrl>` | `<socialNetwork>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L29 "tracking.ts:29") |

### 📂 selectRelated · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<JSON.stringify({ selection })>` | — | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L22 "tracking.ts:22") |

## contributions

### 📂 cc_search_type_of_users · 3 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_p1` | `<withVariant(path, variant)>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L64 "tracking.ts:64") |
| `click_p2` | `<withVariant(path, variant)>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L72 "tracking.ts:72") |
| `click_p3` | `<withVariant(path, variant)>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L80 "tracking.ts:80") |

### 📂 contribution · 3 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_afficher_les_informations_CC` | `<withVariant(path, variant)>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L40 "tracking.ts:40") |
| `click_afficher_les_informations_générales` | `<withVariant(path, variant)>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L56 "tracking.ts:56") |
| `click_afficher_les_informations_sans_CC` | `<withVariant(path, variant)>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L48 "tracking.ts:48") |

### 📂 outil · 2 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `cc_select_non_traitée` | `<idcc.toString()>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L32 "tracking.ts:32") |
| `cc_select_traitée` | `<idcc.toString()>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L24 "tracking.ts:24") |

## convention-collective

### 📂 cc_search_type_of_users · 2 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_p1` | `Trouver sa convention collective` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L35 "tracking.ts:35") |
| `click_p2` | `Trouver sa convention collective` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L43 "tracking.ts:43") |

### 📂 cc_select_p1 · 2 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<action>` | `<idcc>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L51 "tracking.ts:51") |
| `Trouver sa convention collective` | `<idcc>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L51 "tracking.ts:51") |

### 📂 header_cc · 4 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `cc_consult` | `<idcc>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts#L33 "tracking.ts:33") |
| `cc_select_processed` | `<idcc>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts#L23 "tracking.ts:23") |
| `cc_select_unprocessed` | `<idcc>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts#L23 "tracking.ts:23") |
| `open_modal` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts#L16 "tracking.ts:16") |

### 📂 outil · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `view_step_Trouver sa convention collective` | `start` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L27 "tracking.ts:27") |

### 📂 pagecc_searchcc · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<shortTitle>` | `<q>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/LegiFranceSearch.tsx#L24 "LegiFranceSearch.tsx:24") |

### 📂 view_step_cc_search_p1 · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `back_step_cc_search_p1` | `Trouver sa convention collective` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L59 "tracking.ts:59") |

## enterprise

### 📂 accord_enterprise_search · 4 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_accord` | `<url>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L13 "tracking.ts:13") |
| `click_all_accords` | `<siret>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L21 "tracking.ts:21") |
| `load_accords_failed` | `<siret>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L37 "tracking.ts:37") |
| `show_accords` | `<String(count)>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L29 "tracking.ts:29") |

### 📂 cc_search_type_of_users · 2 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_je_n_ai_pas_d_entreprise` | `Trouver sa convention collective` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L52 "tracking.ts:52") |
| `select_je_n_ai_pas_d_entreprise` | `Trouver sa convention collective` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L59 "tracking.ts:59") |

### 📂 cc_select_p2 · 2 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<action>` | `<idcc>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L36 "tracking.ts:36") |
| `Trouver sa convention collective` | `<idcc>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L36 "tracking.ts:36") |

### 📂 enterprise_search · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<action>` | `<JSON.stringify({ query, apiGeoResult })>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L14 "tracking.ts:14") |

### 📂 enterprise_select · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<action>` | `<JSON.stringify(enterprise)>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L28 "tracking.ts:28") |

### 📂 view_step_cc_search_p2 · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `back_step_cc_search_p2` | `Trouver sa convention collective` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L44 "tracking.ts:44") |

## home

### 📂 page_home · 8 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_comprendre_le_droit_du_travail` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20 "tracking.ts:20") |
| `click_question_action` | `<slug>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L27 "tracking.ts:27") |
| `click_voir_tous_les_outils` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20 "tracking.ts:20") |
| `click_voir_tous_les_themes` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20 "tracking.ts:20") |
| `Click_voir_tous_modeles_de_documents` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20 "tracking.ts:20") |
| `click_voir_toutes_les_actualites` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20 "tracking.ts:20") |
| `click_voir_toutes_les_conventions_collectives` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20 "tracking.ts:20") |
| `click_voir_toutes_les_fiches_pratiques` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20 "tracking.ts:20") |

## layout

### 📂 contact · 2 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_contact_sr_modale` | `<currentPathName>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/footer/infos/tracking.ts#L24 "tracking.ts:24") |
| `click_phone_number` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/footer/infos/tracking.ts#L17 "tracking.ts:17") |

### 📂 feedback · 2 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `negative` | `<baseUrl>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L39 "tracking.ts:39") |
| `positive` | `<baseUrl>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L29 "tracking.ts:29") |

### 📂 feedback_category · 4 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `Cette page ne correspond pas à ma recherche ou à ma situation.` | `<baseUrl>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L59 "tracking.ts:59") |
| `Je ne suis pas satisfait de cette réglementation.` | `<baseUrl>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L59 "tracking.ts:59") |
| `Les informations me semblent fausses.` | `<baseUrl>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L59 "tracking.ts:59") |
| `Les informations ne sont pas claires.` | `<baseUrl>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L59 "tracking.ts:59") |

### 📂 feedback_suggestion · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<suggestion>` | `<baseUrl>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L49 "tracking.ts:49") |

## modeles-de-courriers

### 📂 page_modeles_de_documents · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `type_CTRL_C` | `<slug>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/modeles-de-courriers/tracking.ts#L7 "tracking.ts:7") |

## outils

### 📂 cc_search_type_of_users · 4 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_p1` | `<simulatorTitle>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L31 "pushAgreementEvents.ts:31") |
| `click_p2` | `<simulatorTitle>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L38 "pushAgreementEvents.ts:38") |
| `click_p3` | `<simulatorTitle>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L45 "pushAgreementEvents.ts:45") |
| `select_je_n_ai_pas_d_entreprise` | `<simulatorTitle>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L115 "pushAgreementEvents.ts:115") |

### 📂 cc_select_p1 · 6 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<simulatorTitle>` | `idcc<agreementNum>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77 "pushAgreementEvents.ts:77") |
| `HEURES_RECHERCHE_EMPLOI` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77 "pushAgreementEvents.ts:77") |
| `INDEMNITE_PRECARITE` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77 "pushAgreementEvents.ts:77") |
| `PREAVIS_DEMISSION` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77 "pushAgreementEvents.ts:77") |
| `PREAVIS_LICENCIEMENT` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77 "pushAgreementEvents.ts:77") |
| `PREAVIS_RETRAITE` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77 "pushAgreementEvents.ts:77") |

### 📂 cc_select_p2 · 6 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<simulatorTitle>` | `idcc<agreementNum>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84 "pushAgreementEvents.ts:84") |
| `HEURES_RECHERCHE_EMPLOI` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84 "pushAgreementEvents.ts:84") |
| `INDEMNITE_PRECARITE` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84 "pushAgreementEvents.ts:84") |
| `PREAVIS_DEMISSION` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84 "pushAgreementEvents.ts:84") |
| `PREAVIS_LICENCIEMENT` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84 "pushAgreementEvents.ts:84") |
| `PREAVIS_RETRAITE` | `idcc<agreementNum>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84 "pushAgreementEvents.ts:84") |

### 📂 enterprise_select · 6 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<simulatorTitle>` | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58 "pushAgreementEvents.ts:58") |
| `HEURES_RECHERCHE_EMPLOI` | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58 "pushAgreementEvents.ts:58") |
| `INDEMNITE_PRECARITE` | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58 "pushAgreementEvents.ts:58") |
| `PREAVIS_DEMISSION` | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58 "pushAgreementEvents.ts:58") |
| `PREAVIS_LICENCIEMENT` | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58 "pushAgreementEvents.ts:58") |
| `PREAVIS_RETRAITE` | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58 "pushAgreementEvents.ts:58") |

### 📂 feedback_simulateurs · 4 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `Clarté_questions` | `<feedback>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "tracking.tsx:38") |
| `Clarté_résultat` | `<feedback>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "tracking.tsx:38") |
| `Comment_s_est_passée_la_simulation` | `<feedback>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "tracking.tsx:38") |
| `Facilité_utilisation_simulateur` | `<feedback>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "tracking.tsx:38") |

### 📂 feedback_simulateurs_rupture_co · 4 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `Clarté_questions` | `<feedback>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "tracking.tsx:38") |
| `Clarté_résultat` | `<feedback>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "tracking.tsx:38") |
| `Comment_s_est_passée_la_simulation` | `<feedback>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "tracking.tsx:38") |
| `Facilité_utilisation_simulateur` | `<feedback>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38 "tracking.tsx:38") |

### 📂 feedback_suggestion · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<text>` | `<url.replace(/\?.*$/, "")>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L50 "tracking.tsx:50") |

### 📂 feedback_suggestion_rupture_co · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<text>` | `<url.replace(/\?.*$/, "")>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L50 "tracking.tsx:50") |

### 📂 outil · 13 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `anciennete_moins_2_ans` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/Seniority/store/store.ts#L46 "store.ts:46") |
| `anciennete_plus_2_ans` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/Seniority/store/store.ts#L46 "store.ts:46") |
| `cc_select_non_traitée` | `<agreementNum.toString()>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L106 "pushAgreementEvents.ts:106") |
| `cc_select_traitée` | `<agreementNum.toString()>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L100 "pushAgreementEvents.ts:100") |
| `click_previous_<title>` | `<currentStepName>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L14 "tracking.ts:14") |
| `click_print` | `<simulatorTitle>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L24 "tracking.ts:24") |
| `depart` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/OriginStep/store/store.ts#L44 "store.ts:44") |
| `mise` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/OriginStep/store/store.ts#L44 "store.ts:44") |
| `view_step_<title>` | `<currentStepName>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L14 "tracking.ts:14") |
| `view_step_Heures d'absence pour rechercher un emploi` | `user_blocked_info_cc` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/heures-recherche-emploi/events/useHeuresRechercheEmploiEventEmitter.tsx#L11 "useHeuresRechercheEmploiEventEmitter.tsx:11") |
| `view_step_Indemnité de licenciement` | `results_ineligible` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-licenciement/events/useIndemniteLicenciementEventEmitter.tsx#L13 "useIndemniteLicenciementEventEmitter.tsx:13") |
| `view_step_Indemnité de rupture conventionnelle` | `results_ineligible` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-rupture-conventionnelle/events/useRuptureCoEventEmitter.tsx#L13 "useRuptureCoEventEmitter.tsx:13") |
| `view_step_Préavis de démission` | `user_blocked_info_cc` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-demission/events/usePreavisDemissionEventEmitter.tsx#L11 "usePreavisDemissionEventEmitter.tsx:11") |

## recherche

### 📂 _matomo_trackSiteSearch · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<query>` | — | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L193 "tracking.ts:193") |

### 📂 nextResultPage · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<query>` | — | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L104 "tracking.ts:104") |

### 📂 search · 5 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `clickSeeAllResults` | `<name>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L158 "tracking.ts:158") |
| `fullsearch` | `<name>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L64 "tracking.ts:64") |
| `fullsearch` | `<name>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L94 "tracking.ts:94") |
| `presearch` | `<name>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L143 "tracking.ts:143") |
| `selectPresearchResult` | `<name>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L181 "tracking.ts:181") |

### 📂 selectedSuggestion · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<query>` | `<suggestion>` | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L112 "tracking.ts:112") |

### 📂 selectResult · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<JSON.stringify({ algo, url: formattedUrl, })>` | — | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L45 "tracking.ts:45") |

### 📂 widget_search · 2 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `click_logo` | — | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L122 "tracking.ts:122") |
| `submit_search` | `<query>` | 📌 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L129 "tracking.ts:129") |

## themes

### 📂 selectResult · 1 events

| Action | Name |  | Code |
| --- | --- | --- | --- |
| `<JSON.stringify({ url: externalUrl \|\| '/${getRouteBySource(source as keyof typ...>` | — | 🔀 | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/themes/tracking.ts#L14 "tracking.ts:14") |

## Annexe — commandes de configuration Matomo

Réglages Matomo poussés par le code (non comptés comme events).

| Commande | Source |
| --- | --- |
| forgetCookieConsentGiven | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L119 "consent.ts:119") |
| forgetUserOptOut | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L115 "consent.ts:115") |
| HeatmapSessionRecording::disable | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L100 "consent.ts:100") |
| HeatmapSessionRecording::enable | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L98 "consent.ts:98") |
| optUserOut | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L118 "consent.ts:118") |
| rememberCookieConsentGiven | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L116 "consent.ts:116") |
| setCookieSameSite | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/config/MatomoAnalytics.tsx#L45 "MatomoAnalytics.tsx:45") |
| setReferrerUrl | [↗](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/config/MatomoAnalytics.tsx#L41 "MatomoAnalytics.tsx:41") |
