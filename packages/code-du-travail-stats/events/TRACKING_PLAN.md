# Plan de tracking Matomo — CDTN

> ⚠️ Fichier généré automatiquement à partir de `events.extracted.json` — ne pas éditer à la main.
> Régénérer avec `pnpm -F @socialgouv/cdtn-stats doc:generate`.

**98** events uniques · **107** events au total · **10** modules.

## Légende

- **Catégorie / Action** : les deux identifiants Matomo qui définissent l'event.
- **Name** : libellé ou détail optionnel transmis avec l'event (`—` si absent).
- **`<…>`** : valeur dynamique calculée à l'exécution (URL, requête saisie, titre d'outil…), non énumérable. Peut apparaître en Action comme en Name.
- **Type** : `literal` (valeur écrite en dur), `enum-param` (une ligne par valeur possible d'un enum), `dynamic` (valeur calculée à l'exécution).
- **Source** : lien vers la ligne de code qui émet l'event.

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

### clic_share

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <currentPageUrl> | `<socialNetwork>` | dynamic | [tracking.ts:29](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L29) |

### selectRelated

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <JSON.stringify({ selection })> | — | dynamic | [tracking.ts:22](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/common/tracking.ts#L22) |

## contributions

### cc_search_type_of_users

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_p1 | `<withVariant(path, variant)>` | literal | [tracking.ts:64](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L64) |
| click_p2 | `<withVariant(path, variant)>` | literal | [tracking.ts:72](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L72) |
| click_p3 | `<withVariant(path, variant)>` | literal | [tracking.ts:80](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L80) |

### contribution

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_afficher_les_informations_CC | `<withVariant(path, variant)>` | literal | [tracking.ts:40](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L40) |
| click_afficher_les_informations_générales | `<withVariant(path, variant)>` | literal | [tracking.ts:56](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L56) |
| click_afficher_les_informations_sans_CC | `<withVariant(path, variant)>` | literal | [tracking.ts:48](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L48) |

### outil

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| cc_select_non_traitée | `<idcc.toString()>` | literal | [tracking.ts:32](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L32) |
| cc_select_traitée | `<idcc.toString()>` | literal | [tracking.ts:24](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/contributions/tracking.ts#L24) |

## convention-collective

### cc_search_type_of_users

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_p1 | `Trouver sa convention collective` | literal | [tracking.ts:35](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L35) |
| click_p2 | `Trouver sa convention collective` | literal | [tracking.ts:43](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L43) |

### cc_select_p1

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <action> | `<idcc>` | dynamic | [tracking.ts:51](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L51) |
| Trouver sa convention collective | `<idcc>` | literal | [tracking.ts:51](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L51) |

### header_cc

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| cc_consult | `<idcc>` | literal | [tracking.ts:33](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts#L33) |
| cc_select_processed | `<idcc>` | literal | [tracking.ts:23](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts#L23) |
| cc_select_unprocessed | `<idcc>` | literal | [tracking.ts:23](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts#L23) |
| open_modal | — | literal | [tracking.ts:16](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/AgreementSelectionModal/tracking.ts#L16) |

### outil

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| view_step_Trouver sa convention collective | `start` | literal | [tracking.ts:27](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L27) |

### pagecc_searchcc

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <shortTitle> | `<q>` | dynamic | [LegiFranceSearch.tsx:24](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/LegiFranceSearch.tsx#L24) |

### view_step_cc_search_p1

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| back_step_cc_search_p1 | `Trouver sa convention collective` | literal | [tracking.ts:59](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/convention-collective/tracking.ts#L59) |

## enterprise

### accord_enterprise_search

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_accord | `<url>` | literal | [tracking.ts:13](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L13) |
| click_all_accords | `<siret>` | literal | [tracking.ts:21](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L21) |
| load_accords_failed | `<siret>` | literal | [tracking.ts:37](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L37) |
| show_accords | `<String(count)>` | literal | [tracking.ts:29](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts#L29) |

### cc_search_type_of_users

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_je_n_ai_pas_d_entreprise | `Trouver sa convention collective` | literal | [tracking.ts:52](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L52) |
| select_je_n_ai_pas_d_entreprise | `Trouver sa convention collective` | literal | [tracking.ts:59](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L59) |

### cc_select_p2

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <action> | `<idcc>` | dynamic | [tracking.ts:36](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L36) |
| Trouver sa convention collective | `<idcc>` | literal | [tracking.ts:36](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L36) |

### enterprise_search

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <action> | `<JSON.stringify({ query, apiGeoResult })>` | dynamic | [tracking.ts:14](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L14) |

### enterprise_select

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <action> | `<JSON.stringify(enterprise)>` | dynamic | [tracking.ts:28](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L28) |

### view_step_cc_search_p2

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| back_step_cc_search_p2 | `Trouver sa convention collective` | literal | [tracking.ts:44](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/tracking.ts#L44) |

## home

### page_home

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_comprendre_le_droit_du_travail | — | literal | [tracking.ts:20](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20) |
| click_question_action | `<slug>` | literal | [tracking.ts:27](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L27) |
| click_voir_tous_les_outils | — | literal | [tracking.ts:20](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20) |
| click_voir_tous_les_themes | — | literal | [tracking.ts:20](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20) |
| Click_voir_tous_modeles_de_documents | — | literal | [tracking.ts:20](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20) |
| click_voir_toutes_les_actualites | — | literal | [tracking.ts:20](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20) |
| click_voir_toutes_les_conventions_collectives | — | literal | [tracking.ts:20](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20) |
| click_voir_toutes_les_fiches_pratiques | — | literal | [tracking.ts:20](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/home/tracking.ts#L20) |

## layout

### contact

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_contact_sr_modale | `<currentPathName>` | literal | [tracking.ts:24](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/footer/infos/tracking.ts#L24) |
| click_phone_number | — | literal | [tracking.ts:17](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/footer/infos/tracking.ts#L17) |

### feedback

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| negative | `<baseUrl>` | literal | [tracking.ts:39](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L39) |
| positive | `<baseUrl>` | literal | [tracking.ts:29](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L29) |

### feedback_category

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| Cette page ne correspond pas à ma recherche ou à ma situation. | `<baseUrl>` | enum-param | [tracking.ts:59](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L59) |
| Je ne suis pas satisfait de cette réglementation. | `<baseUrl>` | enum-param | [tracking.ts:59](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L59) |
| Les informations me semblent fausses. | `<baseUrl>` | enum-param | [tracking.ts:59](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L59) |
| Les informations ne sont pas claires. | `<baseUrl>` | enum-param | [tracking.ts:59](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L59) |

### feedback_suggestion

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <suggestion> | `<baseUrl>` | dynamic | [tracking.ts:49](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/layout/feedback/tracking.ts#L49) |

## modeles-de-courriers

### page_modeles_de_documents

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| type_CTRL_C | `<slug>` | literal | [tracking.ts:7](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/modeles-de-courriers/tracking.ts#L7) |

## outils

### cc_search_type_of_users

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_p1 | `<simulatorTitle>` | literal | [pushAgreementEvents.ts:31](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L31) |
| click_p2 | `<simulatorTitle>` | literal | [pushAgreementEvents.ts:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L38) |
| click_p3 | `<simulatorTitle>` | literal | [pushAgreementEvents.ts:45](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L45) |
| select_je_n_ai_pas_d_entreprise | `<simulatorTitle>` | literal | [pushAgreementEvents.ts:115](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L115) |

### cc_select_p1

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <simulatorTitle> | `idcc<agreementNum>` | dynamic | [pushAgreementEvents.ts:77](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77) |
| HEURES_RECHERCHE_EMPLOI | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:77](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77) |
| INDEMNITE_PRECARITE | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:77](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77) |
| PREAVIS_DEMISSION | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:77](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77) |
| PREAVIS_LICENCIEMENT | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:77](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77) |
| PREAVIS_RETRAITE | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:77](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L77) |

### cc_select_p2

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <simulatorTitle> | `idcc<agreementNum>` | dynamic | [pushAgreementEvents.ts:84](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84) |
| HEURES_RECHERCHE_EMPLOI | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:84](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84) |
| INDEMNITE_PRECARITE | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:84](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84) |
| PREAVIS_DEMISSION | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:84](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84) |
| PREAVIS_LICENCIEMENT | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:84](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84) |
| PREAVIS_RETRAITE | `idcc<agreementNum>` | literal | [pushAgreementEvents.ts:84](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L84) |

### enterprise_select

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <simulatorTitle> | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | dynamic | [pushAgreementEvents.ts:58](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58) |
| HEURES_RECHERCHE_EMPLOI | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | literal | [pushAgreementEvents.ts:58](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58) |
| INDEMNITE_PRECARITE | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | literal | [pushAgreementEvents.ts:58](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58) |
| PREAVIS_DEMISSION | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | literal | [pushAgreementEvents.ts:58](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58) |
| PREAVIS_LICENCIEMENT | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | literal | [pushAgreementEvents.ts:58](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58) |
| PREAVIS_RETRAITE | `<JSON.stringify({ label: enterprise.label, siren: enterprise.siren, })>` | literal | [pushAgreementEvents.ts:58](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L58) |

### feedback_simulateurs

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| Clarté_questions | `<feedback>` | enum-param | [tracking.tsx:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38) |
| Clarté_résultat | `<feedback>` | enum-param | [tracking.tsx:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38) |
| Comment_s_est_passée_la_simulation | `<feedback>` | enum-param | [tracking.tsx:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38) |
| Facilité_utilisation_simulateur | `<feedback>` | enum-param | [tracking.tsx:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38) |

### feedback_simulateurs_rupture_co

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| Clarté_questions | `<feedback>` | enum-param | [tracking.tsx:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38) |
| Clarté_résultat | `<feedback>` | enum-param | [tracking.tsx:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38) |
| Comment_s_est_passée_la_simulation | `<feedback>` | enum-param | [tracking.tsx:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38) |
| Facilité_utilisation_simulateur | `<feedback>` | enum-param | [tracking.tsx:38](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L38) |

### feedback_suggestion

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <text> | `<url.replace(/\?.*$/, "")>` | dynamic | [tracking.tsx:50](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L50) |

### feedback_suggestion_rupture_co

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <text> | `<url.replace(/\?.*$/, "")>` | dynamic | [tracking.tsx:50](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-depart/feedback/tracking.tsx#L50) |

### outil

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| anciennete_moins_2_ans | — | literal | [store.ts:46](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/Seniority/store/store.ts#L46) |
| anciennete_plus_2_ans | — | literal | [store.ts:46](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/Seniority/store/store.ts#L46) |
| cc_select_non_traitée | `<agreementNum.toString()>` | literal | [pushAgreementEvents.ts:106](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L106) |
| cc_select_traitée | `<agreementNum.toString()>` | literal | [pushAgreementEvents.ts:100](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/events/pushAgreementEvents.ts#L100) |
| click_previous_<title> | `<currentStepName>` | dynamic | [tracking.ts:14](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L14) |
| click_print | `<simulatorTitle>` | literal | [tracking.ts:24](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L24) |
| depart | — | literal | [store.ts:44](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/OriginStep/store/store.ts#L44) |
| mise | — | literal | [store.ts:44](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-retraite/steps/OriginStep/store/store.ts#L44) |
| view_step_<title> | `<currentStepName>` | dynamic | [tracking.ts:14](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/common/components/SimulatorLayout/tracking.ts#L14) |
| view_step_Heures d'absence pour rechercher un emploi | `user_blocked_info_cc` | literal | [useHeuresRechercheEmploiEventEmitter.tsx:11](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/heures-recherche-emploi/events/useHeuresRechercheEmploiEventEmitter.tsx#L11) |
| view_step_Indemnité de licenciement | `results_ineligible` | literal | [useIndemniteLicenciementEventEmitter.tsx:13](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-licenciement/events/useIndemniteLicenciementEventEmitter.tsx#L13) |
| view_step_Indemnité de rupture conventionnelle | `results_ineligible` | literal | [useRuptureCoEventEmitter.tsx:13](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/indemnite-rupture-conventionnelle/events/useRuptureCoEventEmitter.tsx#L13) |
| view_step_Préavis de démission | `user_blocked_info_cc` | literal | [usePreavisDemissionEventEmitter.tsx:11](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/outils/preavis-demission/events/usePreavisDemissionEventEmitter.tsx#L11) |

## recherche

### _matomo_trackSiteSearch

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <query> | — | dynamic | [tracking.ts:193](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L193) |

### nextResultPage

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <query> | — | dynamic | [tracking.ts:104](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L104) |

### search

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| clickSeeAllResults | `<name>` | literal | [tracking.ts:158](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L158) |
| fullsearch | `<name>` | literal | [tracking.ts:64](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L64) |
| fullsearch | `<name>` | literal | [tracking.ts:94](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L94) |
| presearch | `<name>` | literal | [tracking.ts:143](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L143) |
| selectPresearchResult | `<name>` | literal | [tracking.ts:181](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L181) |

### selectedSuggestion

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <query> | `<suggestion>` | dynamic | [tracking.ts:112](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L112) |

### selectResult

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <JSON.stringify({ algo, url: formattedUrl, })> | — | dynamic | [tracking.ts:45](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L45) |

### widget_search

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| click_logo | — | literal | [tracking.ts:122](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L122) |
| submit_search | `<query>` | literal | [tracking.ts:129](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/recherche/tracking.ts#L129) |

## themes

### selectResult

| Action | Name | Type | Source |
| --- | --- | --- | --- |
| <JSON.stringify({ url: externalUrl \|\| `/${getRouteBySource(source as keyof typ...> | — | dynamic | [tracking.ts:14](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/themes/tracking.ts#L14) |

## Annexe — commandes de configuration Matomo

Réglages Matomo poussés par le code (non comptés comme events).

| Commande | Source |
| --- | --- |
| forgetCookieConsentGiven | [consent.ts:119](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L119) |
| forgetUserOptOut | [consent.ts:115](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L115) |
| HeatmapSessionRecording::disable | [consent.ts:100](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L100) |
| HeatmapSessionRecording::enable | [consent.ts:98](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L98) |
| optUserOut | [consent.ts:118](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L118) |
| rememberCookieConsentGiven | [consent.ts:116](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/utils/consent.ts#L116) |
| setCookieSameSite | [MatomoAnalytics.tsx:45](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/config/MatomoAnalytics.tsx#L45) |
| setReferrerUrl | [MatomoAnalytics.tsx:41](https://github.com/SocialGouv/code-du-travail-numerique/blob/dev/packages/code-du-travail-frontend/src/modules/config/MatomoAnalytics.tsx#L41) |
