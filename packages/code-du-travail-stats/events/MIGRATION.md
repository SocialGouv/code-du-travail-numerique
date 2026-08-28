# Bascule du schéma d'events — retrouver ses repères

Document **ponctuel**, écrit à la main (contrairement à `TRACKING_PLAN.md`, régénéré par le
skill). Il sert à une chose : permettre de reconstituer une série qui traverse la bascule, et
de réécrire un rapport Matomo enregistré sous l'ancien schéma.

## Ce qui est perdu, ce qui ne l'est pas

Le jour de la mise en production, les events changent de forme. **Aucun rapport Matomo
enregistré sur les anciens couples catégorie/action ne renverra plus rien** : il faut le
réécrire.

En revanche, **la donnée n'est pas perdue**. Matomo conserve l'historique de l'ancien schéma,
et le nouveau repart à côté. Une série qui traverse la bascule se reconstitue en interrogeant
les deux périodes avec leurs syntaxes respectives, puis en les recollant — d'où la table
ci-dessous. C'est la raison pour laquelle on n'a pas doublé l'émission des events pendant une
période de recouvrement : ça aurait doublé le volume en production pour produire une
information qu'on peut retrouver après coup.

**Une seule chose est réellement irrécupérable**, et elle l'était déjà avant : les events dont
le contenu tombait dans le trou du « 0 » (voir plus bas). Ceux-là n'ont jamais été enregistrés,
il n'y a rien à recoller.

## Écrire un segment sur le nouveau schéma

Le contexte voyage désormais en JSON dans le nom de l'event. Trois règles suffisent.

**1. Ce qu'on cherche le plus souvent tient dans la catégorie ou l'action**, sans toucher au
JSON :

| Question | Segment |
| --- | --- |
| Tous les partages du site | `eventAction==click_share` |
| Les partages depuis une fiche pratique | `eventCategory==contribution;eventAction==click_share` |
| Tout ce qui se passe sur les simulateurs | `eventCategory==outil` |
| Toutes les notes de clarté à 5 | `eventAction==rate_content_5` |

**2. Pour viser une valeur du contexte, on cherche un fragment du JSON** avec l'opérateur
« contient » (`=@`) :

| Question | Segment |
| --- | --- |
| Une page précise | `eventName=@"path":"contribution/mon-slug"` |
| Toutes les pages d'un type | `eventName=@"path":"convention-collective/` |
| Un simulateur précis | `eventName=@"simulator":"Indemnité de licenciement"` |
| Une étape précise du tunnel | `eventName=@"step":"salaires"` |
| Une convention précise | `eventName=@"idcc":1486` |
| Les entreprises sans convention déclarée | `eventName=@"count":0` |

**3. Piège à connaître : ne jamais coller le JSON entier dans un segment.** Dans la syntaxe
Matomo, la virgule est l'opérateur **OU** et le point-virgule l'opérateur **ET**. Un JSON
complet comme `{"path":"contribution/x","idcc":1486}` contient une virgule : Matomo le
couperait en deux conditions. On cherche donc toujours **un seul fragment clé:valeur**, qui
n'en contient jamais.

Rappel de la forme exacte du JSON : pas d'espaces, `path` en tête, le reste par ordre
alphabétique. Donc `"idcc":1486` et non `"idcc": 1486`.

## Table de correspondance ancien → nouveau

La catégorie n'est plus dans cette table : elle vaut désormais le **type de la page** où
l'event se produit, quel que soit l'event (voir l'annexe de `TRACKING_PLAN.md`).

### Commun à toutes les pages

| Ancien (catégorie / action) | Nouvelle action | Le contexte est allé dans |
| --- | --- | --- |
| `clic_share` / `<url de la page>` | `click_share` | `path`, `network` |
| `<source>` / `clic_tag_theme` | `click_theme_tag` | `path`, `theme` |
| `selectRelated` / `{"selection":…}` | `click_related_content` | `path`, `target` |
| `page_home` / `click_voir_tous_les_outils` et 6 autres | `click_shortcut` | `target` |
| `page_home` / `click_question_action` | `click_guided_question` | `target` |
| `contribution` / `btn_table_fullscreen` | `click_table_fullscreen` | `path` |
| `page_modeles_de_documents` / `type_CTRL_C` | `copy_letter_template` | `path` |

### Avis sur la page & contact

| Ancien | Nouvelle action | Contexte |
| --- | --- | --- |
| `feedback` / `positive` | `submit_feedback_positive` | `path` |
| `feedback` / `negative` | `submit_feedback_negative` | `path` |
| `feedback_category` / *la phrase française* | `submit_feedback_reason` | `reason` : `unclear`, `unrelated`, `unsatisfied`, `wrong` |
| `feedback_suggestion` / `<texte libre>` | `submit_feedback_comment` | `comment` |
| `contact` / `click_contact_sr_modale` | `click_contact_form` | `path` |
| `contact` / `select_theme_contact_sr` | `select_contact_theme` | `theme` |
| `contact` / `click_phone_number` | `click_phone_number` | `path` |

> Les motifs d'avis étaient la phrase complète, ponctuation comprise. Un rapport enregistré
> dessus doit viser la clé stable : `eventAction==submit_feedback_reason` puis
> `eventName=@"reason":"wrong"`.

### Notation & NPS

| Ancien | Nouvelle action | Contexte |
| --- | --- | --- |
| `notation_contribution` / `note_<1..5>` | `rate_content_<1..5>` | `path` + `value` |
| `nps` / `score_<0..10>` | `submit_nps_<0..10>` | `path` + `value` |
| `nps` / `display_<déclencheur>` | `display_nps` | `trigger` |
| `nps` / `refusal_<déclencheur>` | `refuse_nps` | `trigger` |
| `nps` / `optout_<déclencheur>` | `optout_nps` | `trigger` |

> Le déclencheur suffixait l'action : il y avait une action par déclencheur. Pour retrouver
> l'équivalent de `display_exit_intent` : `eventAction==display_nps` +
> `eventName=@"trigger":"exit_intent"`.

### Fiches pratiques

| Ancien | Nouvelle action | Contexte |
| --- | --- | --- |
| `contribution` / `reponse_consultee` | `view_answer` | `path` |
| `contribution` / `click_afficher_les_informations_CC` | `click_show_agreement_content` | `target` |
| `contribution` / `click_afficher_les_informations_générales` | `click_show_general_content` | `target` |
| `contribution` / `click_afficher_les_informations_sans_CC` | `click_show_content_without_agreement` | `target` |
| `contribution` / `clic_declinaison_cc` | `click_agreement_declination` | `target` |

### Recherche

| Ancien | Nouvelle action | Contexte |
| --- | --- | --- |
| `search` / `presearch` | `search_instant` | `query`, `class`, `definition` |
| `search` / `fullsearch` | `search_full` | `query`, `class` |
| `search` / `clickSeeAllResults` | `click_all_results` | `query`, `class` |
| `search` / `selectPresearchResult` | `select_instant_result` | `algo`, `class`, `target` |
| `selectResult` / `{"algo":…,"url":…}` | `select_result` | `algo`, `target` |
| `selectedSuggestion` / `<requête>` | `select_suggestion` | `query`, `suggestion` |
| `nextResultPage` / `<requête>` | `next_result_page` | `query` |
| `widget_search` / `submit_search` | `widget_submit_search` | `query` |
| `widget_search` / `click_logo` | `widget_click_logo` | `path` |

> La recherche interne native de Matomo (`trackSiteSearch`) est **inchangée** : les rapports
> « Recherche interne » traversent la bascule sans rien perdre.

### Simulateurs

| Ancien | Nouvelle action | Contexte |
| --- | --- | --- |
| `outil` / `view_step_<titre>` | `view_step` | `simulator`, `step` |
| `outil` / `click_previous_<titre>` | `click_previous_step` | `simulator`, `step` |
| `outil` / `click_print` | `print_result` | `simulator` |
| `outil` / `view_step_<titre>` + name `results_ineligible` | `view_result_ineligible` | `simulator` |
| `outil` / `view_step_<titre>` + name `user_blocked_info_cc` | `block_on_agreement` | `simulator` |
| `outil` / `mise` · `depart` | `select_retirement_origin` | `origin` |
| `outil` / `anciennete_plus_2_ans` · `_moins_2_ans` | `select_seniority` | `seniority` |
| `feedback_simulateurs` / `Comment_s_est_passée_la_simulation` | `submit_simulator_feedback_global` | `simulator`, `answer` |
| `feedback_simulateurs` / `Facilité_utilisation_simulateur` | `submit_simulator_feedback_easiness` | `simulator`, `answer` + `value` |
| `feedback_simulateurs` / `Clarté_questions` | `submit_simulator_feedback_question_clarity` | `simulator`, `answer` + `value` |
| `feedback_simulateurs` / `Clarté_résultat` | `submit_simulator_feedback_result_clarity` | `simulator`, `answer` + `value` |
| `feedback_suggestion` / `<texte>` | `submit_simulator_feedback_comment` | `simulator`, `comment` |

> Les variantes `…_rupture_co` n'existent plus : le simulateur est dans le payload. Pour
> retrouver l'ancien `feedback_simulateurs_rupture_co` :
> `eventName=@"simulator":"Indemnité de rupture conventionnelle"`.
>
> Un rapport bâti sur `view_step_Indemnité de licenciement` devient
> `eventAction==view_step` + `eventName=@"simulator":"Indemnité de licenciement"`.

### Conventions collectives

| Ancien | Nouvelle action | Contexte |
| --- | --- | --- |
| `cc_search_type_of_users` / `click_p1` · `p2` · `p3` | `select_agreement_path_p1` · `_p2` · `_p3` | `context` |
| `cc_select_p1` / `<titre>` | `select_agreement_p1` | `context`, `idcc` |
| `cc_select_p2` / `<titre>` | `select_agreement_p2` | `context`, `idcc` |
| `outil` / `cc_select_traitée` | `select_agreement_supported` | `idcc` |
| `outil` / `cc_select_non_traitée` | `select_agreement_unsupported` | `idcc` |
| `enterprise_search` / `<titre>` | `search_enterprise` | `context`, `query`, `city`, `department` |
| `enterprise_select` / `<titre>` | `select_enterprise` | `context`, `label`, `siren` |
| `cc_enterprise_search` / `show_agreements` | `show_enterprise_agreements` | `count` + `value` |
| `cc_search_type_of_users` / `click_je_n_ai_pas_d_entreprise` | `click_no_enterprise` | `context` |
| `cc_search_type_of_users` / `select_je_n_ai_pas_d_entreprise` | `select_no_enterprise` | `context` |
| `view_step_cc_search_p1` / `back_step_cc_search_p1` | `click_previous_step_agreement_p1` | `context` |
| `view_step_cc_search_p2` / `back_step_cc_search_p2` | `click_previous_step_agreement_p2` | `context` |
| `pagecc_searchcc` / `<titre court de la CC>` | `search_legifrance` | `agreement`, `query` |
| `accord_enterprise_search` / `click_accord` | `click_enterprise_accord` | `target` |
| `accord_enterprise_search` / `click_all_accords` | `click_all_enterprise_accords` | `siret` |
| `accord_enterprise_search` / `show_accords` | `show_enterprise_accords` | `count` + `value` |
| `accord_enterprise_search` / `load_accords_failed` | `load_enterprise_accords_failed` | `siret` |

> Le numéro de convention perd son préfixe : `idcc1486` devient `"idcc":1486`.

## Attention en comparant avant / après sur les compteurs

Deux séries **ne sont pas comparables telles quelles** de part et d'autre de la bascule :
`show_enterprise_accords` et `show_enterprise_agreements`.

Avant, le compteur était envoyé seul dans le nom de l'event, et Matomo **ignorait la valeur
`0`** (il traite le texte `0` comme vide). Sur 14 jours d'observation, **76 %** des events
« accords affichés » et **15 %** des events « conventions affichées » arrivaient donc sans
contenu exploitable. Le cas « aucun résultat » était absent des rapports.

Après la bascule, ces cas remontent. **Le volume de la série va donc augmenter mécaniquement,
sans qu'il ne se soit rien passé côté usagers.** Une comparaison avant/après sur ces deux
events lira une hausse qui n'existe pas : c'est un trou qui se comble, pas une croissance.

Pour une comparaison honnête sur l'ancienne période, il faut exclure le seau zéro du nouveau
schéma : ajouter `eventName!@"count":0` au segment.
