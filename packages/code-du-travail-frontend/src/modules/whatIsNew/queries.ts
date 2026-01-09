export type WhatIsNewKind = "evolution-juridique" | "mise-a-jour-fonctionnelle";

export type WhatIsNewItem = {
  title: string;
  description?: string;
  href?: string;
};

export type WhatIsNewCategory = {
  kind: WhatIsNewKind;
  label: string;
  items: WhatIsNewItem[];
};

export type WhatIsNewWeek = {
  id: string;
  label: string;
  hasUpdates: boolean;
  categories?: WhatIsNewCategory[];
};

export type WhatIsNewMonth = {
  period: string;
  label: string;
  shortLabel: string;
  weeks: WhatIsNewWeek[];
};

export const WHAT_IS_NEW_MONTHS: WhatIsNewMonth[] = [
  //
  // SEPTEMBRE 2025 — 09-2025
  //
  {
    period: "09-2025",
    label: "Septembre 2025",
    shortLabel: "09/25",
    weeks: [
      {
        id: "2025-09-29_2025-09-30",
        label: "Semaine du 29 au 30 septembre",
        hasUpdates: false,
      },
      {
        id: "2025-09-22_2025-09-28",
        label: "Semaine du 22 au 28 septembre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title:
                  "IDCC 1501 Question/Réponse : Durée de la période d’essai",
                href: "/contribution/1501-quelle-est-la-duree-maximale-de-la-periode-dessai-sans-et-avec-renouvellement",
                description:
                  "Modification de la durée initiale de la période d’essai et retrait de la mention « 1 mois pour les ouvriers ».",
              },
              {
                title:
                  "IDCC 1501 Question/Réponse : Renouvellement de la période d’essai",
                href: "/contribution/1501-la-periode-dessai-peut-elle-etre-renouvelee",
                description:
                  "Précision sur le renouvellement de la période d’essai pour les cadres et retrait de la mention « les ouvriers ».",
              },
            ],
          },
        ],
      },
      {
        id: "2025-09-15_2025-09-21",
        label: "Semaine du 15 au 21 septembre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "IDCC 1480 Question/Réponse : Salaire minimum",
                href: "/contribution/1480-quel-est-le-salaire-minimum",
                description:
                  "Modification du salaire minimum hiérarchique pour les radios, agences de presse et piges agences de presse.",
              },
              {
                title: "IDCC 3248 Question/Réponse : Prime d’ancienneté",
                href: "/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                description:
                  "Ajout de la valeur de point pour l’Indre-et-Loire et le Loiret.",
              },
              {
                title: "Nouveau modèle : Mise en demeure pour abandon de poste",
                href: "/modeles-de-courriers/modele-de-mise-en-demeure-pour-abandon-de-poste",
                description:
                  "Modèle de lettre pour mettre en demeure un salarié ayant abandonné volontairement son poste de justifier son absence et de reprendre son poste.",
              },
              {
                title:
                  "Nouveau modèle : Convocation à un entretien préalable au licenciement du salarié particulier employeur",
                href: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-du-salarie-du-particulier-employeur",
                description:
                  "Modèle permettant de convoquer le salarié du particulier employeur à un entretien préalable au licenciement.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-09-08_2025-09-14",
        label: "Semaine du 8 au 14 septembre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "IDCC 3248 Question/Réponse : Prime d’ancienneté",
                href: "/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                description:
                  "Ajout de la valeur de point pour la Flandre Douaisis, le Pas-de-Calais, Rouen et Dieppe.",
              },
              {
                title:
                  "Modification de la Question/Réponse : Arrêt maladie pendant les congés payés",
                href: "/contribution/si-le-salarie-est-malade-pendant-ses-conges-quelles-en-sont-les-consequences",
              },
            ],
          },
          {
            kind: "mise-a-jour-fonctionnelle",
            label: "Mise à jour fonctionnelle",
            items: [
              {
                title: "Mise en ligne d’un formulaire de satisfaction",
                description:
                  "Formulaire permettant d’évaluer la satisfaction suite à la refonte du site vers le système de design de l’État.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-09-01_2025-09-07",
        label: "Semaine du 1 au 7 septembre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "IDCC 3248 Question/Réponse : Prime d’ancienneté",
                href: "/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                description:
                  "Ajout de la valeur de point pour la Gironde, les Landes, l’Aisne, la Charente-Maritime, l’Oise et la Haute-Marne.",
              },
              {
                title: "IDCC 275 Question/Réponse : Salaire minimum",
                href: "/contribution/275-quel-est-le-salaire-minimum",
                description:
                  "Mise à jour des salaires minima en vigueur au 1er septembre.",
              },
              {
                title: "IDCC 3248 Question/Réponse : Primes",
                href: "/contribution/3248-quelles-sont-les-primes-prevues-par-la-convention-collective",
                description:
                  "Modification de la prime de vacances pour l’Aisne.",
              },
            ],
          },
        ],
      },
    ],
  },

  //
  // OCTOBRE 2025 — 10-2025
  //
  {
    period: "10-2025",
    label: "Octobre 2025",
    shortLabel: "10/25",
    weeks: [
      {
        id: "2025-10-27_2025-10-31",
        label: "Semaine du 27 au 31 octobre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title:
                  "Nouveau modèle : Lettre de licenciement pour faute simple ou grave du salarié du particulier employeur",
                href: "/modeles-de-courriers/lettre-de-licenciement-pour-faute-simple-ou-grave-du-salarie-du-particulier-employeur",
                description:
                  "Modèle permettant de notifier le licenciement pour faute simple ou grave d’un salarié du particulier employeur.",
              },
              {
                title: "IDCC 3248 Question/Réponse : Prime d’ancienneté",
                href: "/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                description:
                  "Ajout de la valeur de point pour l’Aube, les Pyrénées-Atlantiques et Seignanx.",
              },
            ],
          },
          {
            kind: "mise-a-jour-fonctionnelle",
            label: "Mise à jour fonctionnelle",
            items: [
              {
                title:
                  "Mise à jour de la page déclaration d’accessibilité : totalement conforme",
                href: "/accessibilite",
                description:
                  "Suite à un audit puis un contre-audit en octobre 2025, 100 % des critères RGAA sont respectés sur le site.",
              },
              {
                title: "Ajout dans la page outil de services externes",
                href: "/outils",
              },
              {
                title:
                  "Ajout d’un nouvel onglet « Code du travail » sur la page d’accueil",
                href: "/",
                description:
                  "Accès direct à la page « Comprendre le droit du travail » et au glossaire depuis le haut du site.",
              },
              {
                title: "Ajout de sous section dans le menu du site",
                description:
                  "Mise en avant dans chaque section du menu des principaux contenus les plus consultés.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-10-20_2025-10-26",
        label: "Semaine du 20 au 26 octobre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "IDCC 0016 Question/Réponse : Salaire minimum",
                href: "/contribution/16-quel-est-le-salaire-minimum",
                description:
                  "Intégration du secteur des transports de fonds et valeurs aux transports routiers et activités auxiliaires.",
              },
              {
                title: "IDCC 0016 Question/Réponse : Primes",
                href: "/contribution/16-quelles-sont-les-primes-prevues-par-la-convention-collective",
                description:
                  "Intégration du secteur des transports de fonds et valeurs aux transports routiers et activités auxiliaires.",
              },
              {
                title: "IDCC 0016 Question/Réponse : Jours fériés",
                href: "/contribution/16-jours-feries-et-ponts-dans-le-secteur-prive",
                description:
                  "Intégration du secteur des transports de fonds et valeurs aux transports routiers et activités auxiliaires.",
              },
              {
                title: "IDCC 0016 Question/Réponse : Travail du dimanche",
                href: "/contribution/travail-du-dimanche-quelle-contrepartie",
                description:
                  "Intégration du secteur des transports de fonds et valeurs aux transports routiers et activités auxiliaires.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-10-13_2025-10-19",
        label: "Semaine du 13 au 19 octobre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "IDCC 1480 Question/Réponse : Salaire minimum",
                href: "/contribution/1480-quel-est-le-salaire-minimum",
                description:
                  "Ajout du salaire minimum pour la presse quotidienne nationale.",
              },
              {
                title: "IDCC 3248 Question/Réponse : Prime d’ancienneté",
                href: "/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                description:
                  "Ajout de la valeur de point pour l’arrondissement d’Avesnes (Maubeuge).",
              },
              {
                title:
                  "Nouveau modèle : Demande de prise de congé de paternité et de l’accueil de l’enfant",
                href: "/modeles-de-courriers/modele-de-lettre-de-prise-de-conge-paternite-et-daccueil",
                description:
                  "Modèle permettant au / à la salarié(e) de prendre des jours de congé de paternité et d’accueil de l’enfant.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-10-06_2025-10-12",
        label: "Semaine du 6 au 12 octobre",
        hasUpdates: false,
      },
      {
        id: "2025-10-01_2025-10-05",
        label: "Semaine du 1er au 5 octobre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "IDCC 1090 Question/Réponse : Salaire minimum",
                href: "/contribution/1090-quel-est-le-salaire-minimum",
                description: "Modification du salaire conventionnel.",
              },
              {
                title: "IDCC 1090 Question/Réponse : Prime",
                href: "/contribution/1090-quelles-sont-les-primes-prevues-par-la-convention-collective",
                description: "Modification de l’indemnité de panier.",
              },
              {
                title:
                  "IDCC 2098 Question/Réponse : Congé pour évènements familiaux",
                href: "/contribution/2098-les-conges-pour-evenements-familiaux",
                description:
                  "Modification du congé pour annonce d’une maladie ou d’un handicap pour un enfant.",
              },
              {
                title:
                  "Modification page : Arrêt maladie « L’employeur peut-il organiser un contrôle »",
                href: "/information/arret-maladie-lemployeur-peut-il-organiser-un-controle",
                description:
                  "Ajout d’une précision sur la visite de pré-reprise.",
              },
              {
                title:
                  "Modification de la page : Le suivi médical des salariés",
                href: "/information/suivi-medical-et-accompagnement-de-certains-salaries",
                description:
                  "Décret instaurant un examen périodique pour certains salariés et précision sur la visite de pré-reprise.",
              },
            ],
          },
        ],
      },
    ],
  },

  //
  // NOVEMBRE 2025 — 11-2025
  //
  {
    period: "11-2025",
    label: "Novembre 2025",
    shortLabel: "11/25",
    weeks: [
      {
        id: "2025-11-24_2025-11-30",
        label: "Semaine du 24 au 30 novembre",
        hasUpdates: false,
      },
      {
        id: "2025-11-17_2025-11-23",
        label: "Semaine du 17 au 23 novembre",
        hasUpdates: false,
      },
      {
        id: "2025-11-10_2025-11-16",
        label: "Semaine du 10 au 16 novembre",
        hasUpdates: true,
        categories: [
          {
            kind: "mise-a-jour-fonctionnelle",
            label: "Mise à jour fonctionnelle",
            items: [
              {
                title:
                  "Ajout de la section « Comprendre le droit du travail » sur la page d’accueil",
                description:
                  "Permettre à l’usager de comprendre plus facilement le droit du travail.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-11-03_2025-11-09",
        label: "Semaine du 3 au 9 novembre",
        hasUpdates: false,
      },
      {
        id: "2025-11-01_2025-11-02",
        label: "Semaine du 1er au 2 novembre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "IDCC 3248 Question/Réponse : Primes",
                href: "/contribution/3248-quelles-sont-les-primes-prevues-par-la-convention-collective",
                description: "Ajout de la VP Maine-et-Loire.",
              },
              {
                title: "IDCC 2098 Question/Réponse : Salaire minimum",
                href: "/contribution/2098-quel-est-le-salaire-minimum",
                description: "Réévaluation du salaire minimum.",
              },
              {
                title: "IDCC 275 Question/Réponse : Salaire minimum",
                href: "/contribution/275-quel-est-le-salaire-minimum",
                description: "Réévaluation du salaire minimum.",
              },
            ],
          },
        ],
      },
    ],
  },
  //
  // DÉCEMBRE 2025 — 12-2025
  //
  {
    period: "12-2025",
    label: "Décembre 2025",
    shortLabel: "12/25",
    weeks: [
      {
        id: "2025-12-22_2025-12-28",
        label: "Semaine du 22 au 28 décembre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "IDCC 86 Question/Réponse : Maintien de salaire",
                href: "/contribution/86-en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
                description:
                  "L’employeur assure le maintien de salaire dès le 1er jour de l’arrêt maladie. Avant, c’était dans les 3 jours suivants le début de l’arrêt maladie.",
              },
              {
                title: "IDCC 1480 Question/Réponse : Salaires minimum",
                href: "/contribution/1480-quel-est-le-salaire-minimum",
                description:
                  "Modification des grilles de salaires pour les journalistes de la presse périodique et hebdomadaire.",
              },
              {
                title:
                  "Nouveau modèle : Demande de retour anticipé après un congé parental d’éducation à temps partiel",
                href: "/modeles-de-courriers/demande-de-retour-anticipe-a-la-suite-dun-conge-parental-deducation-a-temps-partiel",
                description:
                  "Ce modèle de lettre s’adresse au salarié qui souhaite demander un retour anticipé après un congé parental d’éducation à temps partiel.",
              },
              {
                title:
                  "Nouveau modèle : Demande de retour anticipé après un congé parental d’éducation à temps plein",
                href: "/modeles-de-courriers/demande-de-retour-anticipe-a-la-suite-dun-conge-parental-deducation-a-temps-plein",
                description:
                  "Ce modèle de lettre s’adresse au salarié qui souhaite demander un retour anticipé après un congé parental d’éducation à temps plein.",
              },
              {
                title:
                  "Nouveau modèle : Demande de prolongation et/ou de transformation du congé parental d’éducation à temps partiel",
                href: "/modeles-de-courriers/demande-de-prolongation-et-ou-de-transformation-du-conge-parental-deducation-a-temps-partiel",
                description:
                  "Modèle de lettre pour le salarié qui souhaite demander la prolongation du congé parental d’éducation à temps partiel et/ou sa transformation en congé parental d’éducation à temps plein.",
              },
              {
                title:
                  "Nouveau modèle : Demande de prolongation et/ou de transformation du congé parental d’éducation à temps plein",
                href: "/modeles-de-courriers/demande-de-prolongation-et-ou-de-transformation-du-conge-parental-deducation-a-temps-plein",
                description:
                  "Modèle de lettre pour le salarié qui souhaite demander la prolongation du congé parental d’éducation à temps plein et/ou sa transformation en activité à temps partiel.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-12-15_2025-12-21",
        label: "Semaine du 15 au 21 décembre",
        hasUpdates: true,
        categories: [
          {
            kind: "mise-a-jour-fonctionnelle",
            label: "Mise à jour fonctionnelle",
            items: [
              {
                title: "Ajout des infographies dans les Questions/Réponses",
                description:
                  "Permettre à l’usager d’avoir une réponse complète et synthétique en droit du travail.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-12-08_2025-12-14",
        label: "Semaine du 8 au 14 décembre",
        hasUpdates: true,
        categories: [
          {
            kind: "mise-a-jour-fonctionnelle",
            label: "Mise à jour fonctionnelle",
            items: [
              {
                title: "Ajout du nouveau parcours de recherche",
                description:
                  "Permettre à l’usager de comprendre plus facilement le droit du travail.",
              },
              {
                title:
                  'Ajout de la section "Quoi de neuf" sur la page d’accueil',
                description:
                  "Permettre à l’usager de comprendre plus facilement le droit du travail.",
              },
            ],
          },
        ],
      },
      {
        id: "2025-12-01_2025-12-07",
        label: "Semaine du 1er au 7 décembre",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title:
                  "Question/Réponse : Heures supplémentaires : contreparties",
                href: "/contribution/heures-supplementaires",
                description:
                  "Création de la page détaillant les contreparties (majoration et/ou repos compensateur) en cas d’heures supplémentaires.",
              },
            ],
          },
        ],
      },
    ],
  },

  //
  // JANVIER 2026 — 01-2026
  //
  {
    period: "01-2026",
    label: "Janvier 2026",
    shortLabel: "01/26",
    weeks: [
      {
        id: "2026-01-05_2026-01-11",
        label: "Semaine du 5 au 11 janvier",
        hasUpdates: true,
        categories: [
          {
            kind: "evolution-juridique",
            label: "Évolution juridique",
            items: [
              {
                title: "Le contrat de valorisation de l’expérience (CVE)",
                href: "/fiche-ministere-travail/le-contrat-de-valorisation-de-lexperience-cve",
              },
              {
                title:
                  "Nouveau cas de recours de CDD dans le modèle de courrier",
                href: "/modeles-de-courriers/contrat-de-travail-a-duree-determinee-cdd",
                description:
                  "Ajout d’un cas de recours de CDD dans le modèle : reconversion professionnelle dans le cadre d’une mobilité professionnelle interne ou externe à l’entreprise.",
              },
              {
                title: "Modification de la durée maximale d'un CDD",
                href: "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd",
                description:
                  "Durée maximale pour un CDD de reconversion professionnelle : selon la réalisation de l’objet du contrat, avec une durée minimale de 6 mois.",
              },
              {
                title: "IDCC 1518 - Question/Réponse : prime d'ancienneté",
                href: "/contribution/1518-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                description:
                  "Modification du montant de la prime d'ancienneté.",
              },
              {
                title:
                  "IDCC 1351 - Question/Réponse : primes prévues par la convention collective",
                href: "/contribution/1351-quelles-sont-les-primes-prevues-par-la-convention-collective",
                description:
                  "Modification du montant de la prime panier, de l'indemnité panier, de la prime d'entretien des tenues et ajout de l'indemnité d'amortissement et d'entretien du chien.",
              },
              {
                title: "Question/Réponse : Quel est le salaire minimum ?",
                href: "/contribution/quel-est-le-salaire-minimum",
                description:
                  "Revalorisation du SMIC au 1er janvier 2026 et nouvelles grilles de salaire des conventions collectives impactées.",
              },
              {
                title: "Question/Réponse : Indemnités du congé maternité",
                href: "/contribution/quelles-sont-les-conditions-dindemnisation-pendant-le-conge-de-maternite",
                description:
                  "Revalorisation du plafond mensuel de la Sécurité sociale au 1er janvier 2026 et déclinaison du montant de cette indemnité par convention collective.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getMonthByPeriod = (period: string): WhatIsNewMonth | undefined =>
  WHAT_IS_NEW_MONTHS.find((month) => month.period === period);

export const getPeriods = (): string[] =>
  WHAT_IS_NEW_MONTHS.map((month) => month.period);

export const fetchWhatIsNewMonth = async (
  period: string
): Promise<WhatIsNewMonth | undefined> => {
  return getMonthByPeriod(period);
};

export const getMostRecentPeriod = (): string =>
  WHAT_IS_NEW_MONTHS[WHAT_IS_NEW_MONTHS.length - 1].period;
