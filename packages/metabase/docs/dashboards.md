# Dashboards et Collections

## Dashboards

| ID  | Nom                                      | Collection                  | Description                       |
| --- | ---------------------------------------- | --------------------------- | --------------------------------- |
| 1   | E-commerce Insights                      | Examples (2)                | Sample Database                   |
| 2   | Reproduction dashboard CDTN              | (root)                      | Reproduction                      |
| 7   | Completion des outils                    | Outils (16)                 | Taux de completion par simulateur |
| 8   | General                                  | General (29)                | Dashboard general                 |
| 16  | Contributions                            | Contributions (34)          | Popularite et satisfaction        |
| 17  | Informations                             | Informations (38)           | Popularite et satisfaction        |
| 18  | Modeles de documents                     | Modeles de documents (42)   | Popularite et satisfaction        |
| 19  | Convention collectives                   | Convention collectives (46) | Popularite et satisfaction        |
| 20  | Indemnite rupture conventionnelle        | Outils > IR (19)            | Funnel et completion              |
| 21  | Indemnite licenciement                   | Outils > IL (20)            | Funnel et completion              |
| 22  | Indemnite precarite                      | Outils > IP (23)            | Funnel et completion              |
| 23  | Heures recherche emploi                  | Outils > HRE (24)           | Funnel et completion              |
| 24  | Preavis demission                        | Outils > PD (22)            | Funnel et completion              |
| 25  | Preavis depart retraite                  | Outils > PDR (25)           | Funnel et completion              |
| 26  | Preavis licenciement                     | Outils > PL (21)            | Funnel et completion              |
| 27  | Quoi de neuf                             | Quoi de neuf (73)           | Popularite                        |
| 28  | Infographies                             | Infographies (76)           | Popularite et satisfaction        |
| 29  | Trouver convention collective            | Outils > TCC (79)           | Funnel CC                         |
| 30  | IL - Satisfaction Top 100                | IL > Sat Top 100 (84)       | Top 100 satisfaction              |
| 31  | RC - Satisfaction Top 100                | IR > Sat Top 100 (85)       | Top 100 satisfaction              |
| 32  | Fantine_Investigation_2025               | CDTN (14)                   | Investigation                     |
| 33  | Tableau de bord satisfaction utilisateur | CDTN (14)                   | Satisfaction globale              |
| 34  | Fantine - Completion outils              | CDTN (14)                   | Completion                        |
| 36  | **Personnalisation des contenus**        | General (29)                | **NOTRE DASHBOARD**               |

---

## Collections

```
Nos analyses (root)
├── Examples (2)
├── CDTN (14)
│   ├── Outils (16)
│   │   ├── Indemnite rupture conventionnelle (19)
│   │   │   ├── Rapport mensuel (50)
│   │   │   ├── Satisfaction (51)
│   │   │   ├── Taux completion (53)
│   │   │   └── Satisfaction Top 100 (85)
│   │   ├── Indemnite licenciement (20)
│   │   │   ├── Rapport mensuel (54)
│   │   │   ├── Satisfaction (55)
│   │   │   ├── Taux completion (56)
│   │   │   └── Satisfaction Top 100 (84)
│   │   ├── Preavis licenciement (21) → 69-71
│   │   ├── Preavis demission (22) → 63-65
│   │   ├── Indemnite precarite (23) → 57-59
│   │   ├── Heures recherche emploi (24) → 60-62
│   │   ├── Preavis depart retraite (25) → 66-68
│   │   └── Trouver convention collective (79)
│   │       ├── Popularite (81)
│   │       ├── Taux completion (82)
│   │       └── Satisfaction (80)
│   ├── General (29)
│   │   ├── Satisfaction (31)
│   │   ├── Popularite (32)
│   │   └── Rapport mensuel (33)
│   ├── Contributions (34)
│   │   ├── Popularite (35)
│   │   ├── Rapport mensuel (36)
│   │   ├── Satisfaction (37)
│   │   └── Taux completion (83)
│   ├── Informations (38) → 39-41
│   ├── Modeles de documents (42) → 43-45
│   ├── Convention collectives (46) → 47-49
│   ├── Quoi de neuf (73) → 74-75
│   └── Infographies (76) → 77-78
└── Collections personnelles (4-10, 26, 72, 86-87, etc.)
```

---

## Pattern par type de contenu

Chaque type de contenu a le meme pattern de sous-collections :

- **Popularite** : Visites uniques par mois, Top 10, Evolution
- **Satisfaction** : Ratio avis, Commentaires, Raisons, Nuage
- **Rapport mensuel** : Visites uniques par mois
- **Taux completion** (Outils seulement) : Funnel par etapes

---

## Dashboard 36 - Cartes V2

| Card ID | Nom                                            | KPI   | Display | Source                  |
| ------- | ---------------------------------------------- | ----- | ------- | ----------------------- |
| 435     | Personnalisation - Vue consolidee              | KPI 1 | table   | mv_kpi_personnalisation |
| 436     | Renonciation - Taux global                     | KPI 3 | scalar  | mv_kpi_personnalisation |
| 437     | Personnalisation - Evolution 8 semaines        | KPI 2 | line    | mv_perso_weekly         |
| 438     | Personnalisation - Taux par contribution       | KPI 1 | table   | mv_kpi_personnalisation |
| 439     | Personnalisation - Taux par simulateur         | KPI 1 | table   | mv_kpi_personnalisation |
| 440     | Renonciation - Par contribution (V2)           | KPI 3 | table   | mv_kpi_personnalisation |
| 441     | Parcours bloques - CC non traitee et pas de CC | KPI 4 | table   | mv_kpi_personnalisation |
| 442     | CC non traitees - Volume 2025                  | KPI 5 | table   | mv_cc_non_traitees      |
| 443     | Personnalisation - Vue agregee                 | KPI 1 | table   | mv_kpi_personnalisation |
| 444     | Renonciation - Par simulateur                  | KPI 3 | table   | mv_kpi_personnalisation |

### Cartes V1 archivees (IDs 427-434)

Sauvegardees dans `backup/v1_cards_427-434.md`. Utilisaient `matomo_partitioned` directement (performances insuffisantes).

---

## Dashboard 37 - Funnel IL/IRC

| Card ID | Nom                                               | Display | Source           |
| ------- | ------------------------------------------------- | ------- | ---------------- |
| 445     | Funnel conversion IL vs IRC - avant/apres refonte | table   | mv_funnel_il_irc |
| 446     | Taux conversion IL vs IRC - avant/apres refonte   | table   | mv_funnel_il_irc |
| 447     | Evolution hebdomadaire taux conversion IL vs IRC  | line    | mv_funnel_il_irc |

---

## Cartes "Taux de rebond" Contributions (collection 88, #7136)

Issue [#7136](https://github.com/SocialGouv/code-du-travail-numerique/issues/7136) : taux d'utilisateurs qui se rendent sur une contribution AVEC bouton generique et repartent sans aucune interaction (ni recherche CC, ni clic sur le bouton secondaire).

Source : `mv_bounce_contributions` (par visite + contribution, temps reel via `matomo_partitioned`).

Filtre : seules les contributions qui ont au moins un evenement `click_afficher_les_informations_générales` sur les 60 derniers jours sont incluses (= ~41 contributions sur ~2349 visitees).

| Card ID | Collection                            | Nom                              | Display | Source                  |
| ------- | ------------------------------------- | -------------------------------- | ------- | ----------------------- |
| 450     | 88 (Contributions - Taux de rebond)   | Taux de rebond - Global          | scalar  | mv_bounce_contributions |
| 451     | 88 (Contributions - Taux de rebond)   | Taux de rebond - Par contribution | table   | mv_bounce_contributions |

Les deux cards sont parametrees `date_debut` / `date_fin` (defaut = 30 derniers jours, modifiable via le widget Metabase ou via dashboard parameter).

---

## Cartes "Taux completion" IL et IRC (collections 56 et 53)

Funnel cumulatif parametre par dates (`date_debut`, `date_fin`, defaut = 30 derniers jours).
Source : `mv_funnel_il_irc_visits` (par visite, temps reel via `matomo_partitioned`).
Logique : pour chaque etape N, on compte les visites qui ont vu l'etape N OU une etape ulterieure (funnel monotone par construction).

| Card ID | Collection                       | Nom                                          | Display | Source                  |
| ------- | -------------------------------- | -------------------------------------------- | ------- | ----------------------- |
| 170     | 56 (IL - Taux completion)        | Taux completion des etapes                   | bar     | mv_funnel_il_irc_visits |
| 448     | 56 (IL - Taux completion)        | Taux completion des etapes (funnel - test)   | funnel  | mv_funnel_il_irc_visits |
| 107     | 53 (IRC - Taux completion)       | Taux completion des etapes                   | bar     | mv_funnel_il_irc_visits |
| 449     | 53 (IRC - Taux completion)       | Taux completion des etapes (funnel - test)   | funnel  | mv_funnel_il_irc_visits |

Etapes attendues (post refonte avril 2026) :
`start` -> `info_cc` -> `infos` -> `anciennete` -> `absences` -> `salaires` -> `results`

Voir `materialized-views.md` §7 pour les details du pattern et la justification du funnel cumulatif.
