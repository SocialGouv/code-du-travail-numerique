# Glossaire des Evenements Matomo

## Categories et actions - Personnalisation des contenus

### Contributions (`/contribution/*`)

| Categorie | Action | eventname | Signification |
|---|---|---|---|
| `contribution` | `click_afficher_les_informations_CC` | chemin contribution | Utilisateur a obtenu une reponse personnalisee (CC traitee) |
| `contribution` | `click_afficher_les_informations_sans_CC` | chemin contribution | Utilisateur a cherche sa CC mais elle n'est pas traitee |
| `contribution` | `click_afficher_les_informations_generales` | chemin contribution | Utilisateur a consulte les infos generales |
| `cc_search_type_of_users` | `click_p1` | chemin contribution | Utilisateur clique pour rechercher sa CC |
| `cc_search_type_of_users` | `click_p2` | chemin contribution | Option 2 du choix CC |
| `cc_search_type_of_users` | `click_p3` | chemin contribution / "Trouver sa CC" | **Renonciation** : utilisateur saute l'etape CC |
| `cc_search_type_of_users` | `click_je_n_ai_pas_d_entreprise` | chemin contribution | Utilisateur declare ne pas avoir d'entreprise |
| `cc_search_type_of_users` | `select_je_n_ai_pas_d_entreprise` | chemin contribution | Meme chose (select) |
| `cc_select_p1` | chemin contribution | - | Utilisateur a selectionne une CC (etape p1) |
| `cc_select_p2` | chemin contribution | - | Utilisateur a selectionne une CC (etape p2) |

### Simulateurs / Outils (`/outils/*`)

| Categorie | Action | eventname | Signification |
|---|---|---|---|
| `outil` | `cc_select_traitee` | ID CC (num) | CC selectionnee et traitee par le simulateur |
| `outil` | `cc_select_traitée` | ID CC (num) | Variante avec accent (meme evenement) |
| `outil` | `cc_select_non_traitee` | ID CC (num) | CC selectionnee mais non traitee |
| `outil` | `cc_select_non_traitée` | ID CC (num) | Variante avec accent (meme evenement) |
| `outil` | `view_step_[Nom Simulateur]` | nom etape | Visualisation d'une etape du simulateur |
| `outil` | `click_previous_[Nom Simulateur]` | - | Navigation retour |

### Etapes des simulateurs (view_step)

| Simulateur | Etapes disponibles |
|---|---|
| Indemnite de licenciement | start, info_cc, infos, anciennete, absences, salaires, results, results_ineligible |
| Indemnite de precarite | start, info_cc, info_generales, remuneration, indemnite |
| Indemnite de rupture conventionnelle | start, info_cc, infos, anciennete, absences, salaires, results, results_ineligible |
| Preavis de demission | start, info_cc, user_blocked_info_cc, results, infos |
| Preavis de depart/mise a la retraite | intro, origine, ccn, anciennete, infos, result |
| Preavis de licenciement | start, info_cc, status, results, infos |
| Heures recherche emploi | start, info_cc, results, infos, user_blocked_info_cc |
| Trouver sa convention collective | start |

### Etapes speciales

| eventname | Signification |
|---|---|
| `user_blocked_info_cc` | Utilisateur bloque a l'etape CC (pas de reponse generique disponible) |
| `results_ineligible` | Resultat : utilisateur non eligible |

### Historique des etapes IL / IRC

- **2025-03-13** : refonte des simulateurs IL et IRC. Suppression de l'etape `contrat_travail`, ajout de l'etape `infos` (conditionnellement masquee).
- **2026-03-13** : ajout de l'etape `absences` (toujours visible). Avant cette date, les visites IL/IRC ne firaient pas l'evenement `view_step_absences`. Les cartes 170/107/448/449 utilisent une logique de funnel cumulatif (cf. `materialized-views.md` §7) qui absorbe cette discontinuite.

L'evenement `contrat_travail` est conserve dans le filtre `IN` de `mv_funnel_il_irc` (la MV hebdo) pour permettre les comparaisons historiques avant/apres refonte sur le dashboard 37.

### Feedbacks

| Categorie | Description |
|---|---|
| `feedback` | Feedback general (satisfait, mecontent, etc.) |
| `feedback_category` | Categorie de feedback (infos fausses, pas claires, etc.) |
| `feedback_suggestion` | Texte libre de suggestion |
| `feedback_simulateurs` | Feedback specifique aux simulateurs |
| `feedback_suggestion_rupture_co` | Suggestions rupture conventionnelle |

---

## Toutes les categories d'evenements

```
clic_share            cc_select             feedback
cc_select_p1          feedback_suggestion_rupture_co
contact               page_information      outil
widget_search         page_home             glossary
pagecc_searchcc       selectedSuggestion    themeResults
view_step_cc_search_p1  selectResult        Heatmap_Test
cc_search             enterprise_search     candidateResults
feedback_category     contribution          feedback_simulateurs
enterprise_select     header                feedback_simulateurs_rupture_co
cc_select_p2          nextResultPage        glossaire_clicktooltip
candidateSuggestions  view_step_cc_search_p2
page_modeles_de_documents  selectRelated   feedback_suggestion
cc_search_help        cc_search_type_of_users
```
