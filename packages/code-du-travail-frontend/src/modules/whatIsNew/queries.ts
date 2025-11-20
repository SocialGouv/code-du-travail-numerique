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
                                href: "https://code.travail.gouv.fr/contribution/1501-quelle-est-la-duree-maximale-de-la-periode-dessai-sans-et-avec-renouvellement",
                                description:
                                    "Modification de la durée initiale de la période d’essai et retrait de la mention « 1 mois pour les ouvriers ».",
                            },
                            {
                                title:
                                    "IDCC 1501 Question/Réponse : Renouvellement de la période d’essai",
                                href: "https://code.travail.gouv.fr/contribution/1501-la-periode-dessai-peut-elle-etre-renouvelee",
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
                                href: "https://code.travail.gouv.fr/contribution/1480-quel-est-le-salaire-minimum",
                                description:
                                    "Modification du salaire minimum hiérarchique pour les radios, agences de presse et piges agences de presse.",
                            },
                            {
                                title: "IDCC 3248 Question/Réponse : Prime d’ancienneté",
                                href: "https://code.travail.gouv.fr/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                                description:
                                    "Ajout de la valeur de point pour l’Indre-et-Loire et le Loiret.",
                            },
                            {
                                title: "Nouveau modèle : Mise en demeure pour abandon de poste",
                                href: "https://code.travail.gouv.fr/modeles-de-courriers/modele-de-mise-en-demeure-pour-abandon-de-poste",
                                description:
                                    "Modèle de lettre pour mettre en demeure un salarié ayant abandonné volontairement son poste de justifier son absence et de reprendre son poste.",
                            },
                            {
                                title:
                                    "Nouveau modèle : Convocation à un entretien préalable au licenciement du salarié particulier employeur",
                                href: "https://code.travail.gouv.fr/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-du-salarie-du-particulier-employeur",
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
                                href: "https://code.travail.gouv.fr/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                                description:
                                    "Ajout de la valeur de point pour la Flandre Douaisis, le Pas-de-Calais, Rouen et Dieppe.",
                            },
                            {
                                title:
                                    "Modification de la Question/Réponse : Arrêt maladie pendant les congés payés",
                                href: "https://code.travail.gouv.fr/contribution/si-le-salarie-est-malade-pendant-ses-conges-quelles-en-sont-les-consequences",
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
                                href: "https://code.travail.gouv.fr/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                                description:
                                    "Ajout de la valeur de point pour la Gironde, les Landes, l’Aisne, la Charente-Maritime, l’Oise et la Haute-Marne.",
                            },
                            {
                                title: "IDCC 275 Question/Réponse : Salaire minimum",
                                href: "https://code.travail.gouv.fr/contribution/275-quel-est-le-salaire-minimum",
                                description:
                                    "Mise à jour des salaires minima en vigueur au 1er septembre.",
                            },
                            {
                                title: "IDCC 3248 Question/Réponse : Primes",
                                href: "https://code.travail.gouv.fr/contribution/3248-quelles-sont-les-primes-prevues-par-la-convention-collective",
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
                                href: "https://code.travail.gouv.fr/modeles-de-courriers/lettre-de-licenciement-pour-faute-simple-ou-grave-du-salarie-du-particulier-employeur",
                                description:
                                    "Modèle permettant de notifier le licenciement pour faute simple ou grave d’un salarié du particulier employeur.",
                            },
                            {
                                title: "IDCC 3248 Question/Réponse : Prime d’ancienneté",
                                href: "https://code.travail.gouv.fr/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
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
                                href: "https://code.travail.gouv.fr/accessibilite",
                                description:
                                    "Suite à un audit puis un contre-audit en octobre 2025, 100 % des critères RGAA sont respectés sur le site.",
                            },
                            {
                                title: "Ajout dans la page outil de services externes",
                                href: "https://code.travail.gouv.fr/outils",
                            },
                            {
                                title:
                                    "Ajout d’un nouvel onglet « Code du travail » sur la page d’accueil",
                                href: "https://code.travail.gouv.fr/",
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
                                href: "https://code.travail.gouv.fr/contribution/16-quel-est-le-salaire-minimum",
                                description:
                                    "Intégration du secteur des transports de fonds et valeurs aux transports routiers et activités auxiliaires.",
                            },
                            {
                                title: "IDCC 0016 Question/Réponse : Primes",
                                href: "https://code.travail.gouv.fr/contribution/16-quelles-sont-les-primes-prevues-par-la-convention-collective",
                                description:
                                    "Intégration du secteur des transports de fonds et valeurs aux transports routiers et activités auxiliaires.",
                            },
                            {
                                title: "IDCC 0016 Question/Réponse : Jours fériés",
                                href: "https://code.travail.gouv.fr/contribution/16-jours-feries-et-ponts-dans-le-secteur-prive",
                                description:
                                    "Intégration du secteur des transports de fonds et valeurs aux transports routiers et activités auxiliaires.",
                            },
                            {
                                title: "IDCC 0016 Question/Réponse : Travail du dimanche",
                                href: "https://code.travail.gouv.fr/contribution/travail-du-dimanche-quelle-contrepartie",
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
                                href: "https://code.travail.gouv.fr/contribution/1480-quel-est-le-salaire-minimum",
                                description:
                                    "Ajout du salaire minimum pour la presse quotidienne nationale.",
                            },
                            {
                                title: "IDCC 3248 Question/Réponse : Prime d’ancienneté",
                                href: "https://code.travail.gouv.fr/contribution/3248-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
                                description:
                                    "Ajout de la valeur de point pour l’arrondissement d’Avesnes (Maubeuge).",
                            },
                            {
                                title:
                                    "Nouveau modèle : Demande de prise de congé de paternité et de l’accueil de l’enfant",
                                href: "https://code.travail.gouv.fr/modeles-de-courriers/modele-de-lettre-de-prise-de-conge-paternite-et-daccueil",
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
                                href: "https://code.travail.gouv.fr/contribution/1090-quel-est-le-salaire-minimum",
                                description: "Modification du salaire conventionnel.",
                            },
                            {
                                title: "IDCC 1090 Question/Réponse : Prime",
                                href: "https://code.travail.gouv.fr/contribution/1090-quelles-sont-les-primes-prevues-par-la-convention-collective",
                                description: "Modification de l’indemnité de panier.",
                            },
                            {
                                title:
                                    "IDCC 2098 Question/Réponse : Congé pour évènements familiaux",
                                href: "https://code.travail.gouv.fr/contribution/2098-les-conges-pour-evenements-familiaux",
                                description:
                                    "Modification du congé pour annonce d’une maladie ou d’un handicap pour un enfant.",
                            },
                            {
                                title:
                                    "Modification page : Arrêt maladie « L’employeur peut-il organiser un contrôle »",
                                href: "https://code.travail.gouv.fr/information/arret-maladie-lemployeur-peut-il-organiser-un-controle",
                                description:
                                    "Ajout d’une précision sur la visite de pré-reprise.",
                            },
                            {
                                title:
                                    "Modification de la page : Le suivi médical des salariés",
                                href: "https://code.travail.gouv.fr/information/suivi-medical-et-accompagnement-de-certains-salaries",
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
                                href: "https://code.travail.gouv.fr/contribution/3248-quelles-sont-les-primes-prevues-par-la-convention-collective",
                                description: "Ajout de la VP Maine-et-Loire.",
                            },
                            {
                                title: "IDCC 2098 Question/Réponse : Salaire minimum",
                                href: "https://code.travail.gouv.fr/contribution/2098-quel-est-le-salaire-minimum",
                                description: "Réévaluation du salaire minimum.",
                            },
                            {
                                title: "IDCC 275 Question/Réponse : Salaire minimum",
                                href: "https://code.travail.gouv.fr/contribution/275-quel-est-le-salaire-minimum",
                                description: "Réévaluation du salaire minimum.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const getAllMonths = (): WhatIsNewMonth[] => WHAT_IS_NEW_MONTHS;

export const getMonthByPeriod = (
    period: string
): WhatIsNewMonth | undefined =>
    WHAT_IS_NEW_MONTHS.find((month) => month.period === period);

export const getPeriods = (): string[] =>
    WHAT_IS_NEW_MONTHS.map((month) => month.period);

export const getMostRecentMonth = (): WhatIsNewMonth =>
    WHAT_IS_NEW_MONTHS[WHAT_IS_NEW_MONTHS.length - 1];

export const getMostRecentPeriod = (): string =>
    getMostRecentMonth().period;

export const getOldestMonth = (): WhatIsNewMonth => WHAT_IS_NEW_MONTHS[0];

export const getOldestPeriod = (): string => getOldestMonth().period;

export const fetchWhatIsNewMonth = async (
    period: string
): Promise<WhatIsNewMonth | undefined> => {
    return getMonthByPeriod(period);
};

export const fetchAllWhatIsNewMonths = async (): Promise<WhatIsNewMonth[]> => {
    return getAllMonths();
};
