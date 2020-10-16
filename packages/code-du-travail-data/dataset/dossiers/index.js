const thematicFiles = [
  {
    categories: [
      {
        icon: "Populars",
        id: "populaires",
        position: 1,
        refs: [
          {
            title:
              "Protocole national pour assurer la santé et la sécurité des salariés en entreprise face à l’épidémie de COVID-19",
            url:
              "https://travail-emploi.gouv.fr/le-ministere-en-action/coronavirus-covid-19/reprise-de-l-activite/protocole-national-sante-securite-salaries",
          },
          {
            title: "Activité partielle – chômage partiel",
            url: "/fiche-ministere-travail/activite-partielle-chomage-partiel",
          },
          {
            title: "Aide à l’embauche des jeunes de moins de 26 ans",
            url:
              "/fiche-service-public/aide-a-lembauche-dun-jeune-de-moins-de-26-ans",
          },
          {
            title:
              "Prime exceptionnelle de pouvoir d’achat : nouveautés Covid-19",
            url:
              "/information/prime-exceptionnelle-de-pouvoir-dachat-nouveautes-covid-19",
          },
          {
            title: "Nouveautés Covid-19 : congés payés [Infographie]",
            url: "/information/conges-payes-nouveautes-covid-19",
          },
          {
            title: "Conventions de FNE-Formation",
            url: "/fiche-ministere-travail/conventions-de-fne-formation",
          },
        ],
        title: "Les contenus populaires",
      },
      {
        icon: "Health",
        id: "arret-maladie",
        position: 2,
        refs: [
          {
            title: "Arrêt maladie : indemnités journalières versées au salarié",
            url:
              "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
          },
        ],
        title: "Arrêt maladie",
      },
      {
        icon: "Salary",
        id: "aides-entreprise",
        position: 3,
        refs: [
          {
            title: "Toutes les mesures d’aides : Urssaf",
            url: "https://mesures-covid19.urssaf.fr/",
          },
          {
            title: "Toutes les mesures d’aides : Bpifrance",
            url:
              "https://www.bpifrance.fr/A-la-une/Actualites/Coronavirus-Bpifrance-active-des-mesures-exceptionnelles-de-soutien-aux-entreprises-49113",
          },
          {
            title:
              "Fonds de solidarité dédié aux TPE : aide de 1 500 euros maximum",
            url:
              "https://bpifrance-creation.fr/entrepreneur/actualites/covid-19-fonds-solidarite-dedie-aux-tpe-aide-1-500-euros-maximum",
          },
          {
            title: "Plan de soutien aux entreprises françaises exportatrices",
            url:
              "https://www.bpifrance.fr/A-la-une/Actualites/COVID-19-plan-de-soutien-aux-entreprises-francaises-exportatrices-49226",
          },
          {
            title: "Tourisme, quelles mesures pour soutenir le secteur ?",
            url:
              "https://www.bpifrance.fr/A-la-une/Actualites/COVID-19-Tourisme-quelles-mesures-pour-soutenir-le-secteur-49224",
          },
          {
            title:
              "Travailleurs handicapés : services et aides pour sécuriser le dé-confinement et la reprise d’activité des entreprises",
            url:
              "https://www.agefiph.fr/actualites-handicap/les-services-et-aides-financieres-deconfinement-employeurs",
          },
          {
            title:
              "Travailleurs handicapés: Diagnostic soutien à la sortie de crise pour les entrepreneurs",
            url:
              "https://www.agefiph.fr/aides-handicap/diagnostic-soutien-la-sortie-de-crise-pour-les-entrepreneurs",
          },

          {
            title:
              "Travailleurs handicapés : Aide au soutien à l’exploitation d’une activité",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-au-soutien-lexploitation-dune-activite",
          },

          {
            title:
              "Aide financière pour les périodes de carences des arrêts de travail en soutien aux entrepreneurs",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-financiere-pour-les-periodes-de-carences-des-arrets-de-travail-en-soutien-aux",
          },
        ],
        title: "Aides exceptionnelles pour les entreprises",
      },
      {
        icon: "PartialActivity",
        id: "activite-partielle",
        position: 4,
        refs: [
          {
            title: "Fiche Activité partielle",
            url:
              "/fiche-ministere-travail/fiche-activite-partielle-chomage-partiel",
          },
          {
            title: "Fiche Activité partielle de longue durée (APLD)",
            url:
              "/fiche-ministere-travail/activite-partielle-de-longue-duree-apld",
          },
          {
            title:
              "Questions - Réponses : activité partielle - chômage partiel",
            url: "/fiche-ministere-travail/activite-partielle-chomage-partiel",
          },
          {
            title:
              "Activité partielle : démarches de l’employeur (chômage partiel ou technique)",
            url:
              "/fiche-service-public/activite-partielle-demarches-de-lemployeur-chomage-partiel-ou-technique",
          },
          {
            title:
              "Rémunération d’un salarié placé en activité partielle (chômage partiel)",
            url:
              "/fiche-service-public/remuneration-dun-salarie-en-chomage-partiel-activite-partielle",
          },
          {
            title: "Demander l’activité partielle",
            url: "https://activitepartielle.emploi.gouv.fr/apart/",
          },
          {
            title: "Simulateur d’activité partielle",
            url: "https://www.simulateurap.emploi.gouv.fr/",
          },
        ],
        shortTitle: "Activité partielle",
        title: "Activités partielles (chômage partiel et APLD)",
      },
      {
        icon: "Salary",
        id: "aides-jeunes",
        position: 5,
        refs: [
          {
            title: "Aide à l’embauche des jeunes de moins de 26 ans",
            url:
              "/fiche-service-public/aide-a-lembauche-dun-jeune-de-moins-de-26-ans",
          },
          {
            title: "Aide aux employeurs qui recrutent en apprentissage",
            url:
              "/fiche-ministere-travail/aide-exceptionnelle-aux-employeurs-qui-recrutent-en-apprentissage",
          },
          {
            title:
              "Aide à l’embauche d’un jeune en contrat de professionnalisation",
            url:
              "/fiche-service-public/aide-exceptionnelle-a-lembauche-dun-jeune-en-contrat-de-professionnalisation",
          },
          {
            title:
              "Renforcement des dispositifs d’inclusion durable dans l’emploi",
            url:
              "https://travail-emploi.gouv.fr/le-ministere-en-action/relance-activite/plan-1jeune-1solution/article/renforcement-des-dispositifs-d-inclusion-durable-dans-l-emploi",
          },
          {
            title:
              "Contrat unique d’insertion (CUI) - Parcours emploi compétences (PEC)",
            url:
              "/fiche-service-public/contrat-unique-dinsertion-cui-parcours-emploi-competences-pec",
          },
          {
            title: "Présentation du plan de relance apprentissage",
            url:
              "https://travail-emploi.gouv.fr/actualites/l-actualite-du-ministere/article/plan-de-relance-apprentissage-entreprises-cfa-decouvrez-les-mesures-du-plan",
          },
        ],
        title: "Jeunes : aides à l’embauche",
      },
      {
        icon: "Salary",
        id: "aides-travailleurs-handicapés",
        position: 6,
        refs: [
          {
            title:
              "Aide pour une personne handicapée en contrat d’apprentissage",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-exceptionnelle-de-soutien-lemploi-en-contrat-dapprentissage",
          },
          {
            title:
              "Aide pour la prise en charge du surcoût des équipements spécifiques de prévention",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-exceptionnelle-pour-la-prise-en-charge-du-surcout-des-equipements-specifiques",
          },
          {
            title: "Aide aux déplacements",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-exceptionnelle-aux-deplacements",
          },
          {
            title: "Aide à la mise en place du télétravail",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-exceptionnelle-la-mise-en-place-du-teletravail",
          },
          {
            title:
              "Aide pour personne handicapée en contrat de professionnalisation",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-exceptionnelle-de-soutien-lemploi-en-contrat-de-preofessionnalisation",
          },
          {
            title:
              "Accompagnement de veille par Cap emploi afin de sécuriser l’emploi des personnes en situation de handicap",
            url:
              "https://www.agefiph.fr/aides-handicap/accompagnement-de-veille-par-cap-emploi-afin-de-securiser-lemploi-des-personnes-en",
          },

          {
            title:
              "Aide exceptionnelle pour la mise en oeuvre de la solution de maintien dans l’emploi",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-exceptionnelle-pour-la-mise-en-oeuvre-de-la-solution-de-maintien-dans-lemploi",
          },

          {
            title:
              "Maintenir la rémunération et la protection sociale des stagiaires en formation",
            url:
              "https://www.agefiph.fr/aides-handicap/maintenir-la-remuneration-et-la-protection-sociale-des-stagiaires-en-formation",
          },

          {
            title: "Aide exceptionnelle au parcours de formation",
            url:
              "https://www.agefiph.fr/aides-handicap/aide-exceptionnelle-au-parcours-de-formation",
          },
        ],
        title: "Travailleurs handicapés : aides exceptionnelles",
      },
      {
        icon: "Precarity",
        id: "conge-payes",
        position: 7,
        refs: [
          {
            title: "Nouveautés Covid-19 : congés payés [Infographie]",
            url: "/information/conges-payes-nouveautes-covid-19",
          },
          {
            title:
              "Nouveautés Covid-19 : RTT, jours de repos forfait jours, compte épargne-temps [Infographie]",
            url:
              "/information/rtt-jours-de-repos-forfait-jours-compte-epargne-temps-nouveautes-covid-19",
          },
          {
            title:
              "Nouveautés Covid-19 : prime exceptionnelle de pouvoir d’achat",
            url:
              "/information/prime-exceptionnelle-de-pouvoir-dachat-nouveautes-covid-19",
          },
          {
            title: "Nouveautés Covid-19 : intéressement et participation",
            url:
              "/information/interessement-et-participation-nouveautes-covid-19",
          },
          {
            title:
              "Nouveautés Covid-19 : durées maximales de travail, repos quotidien et dominical",
            url:
              "/information/durees-maximales-de-travail-repos-quotidien-et-dominical-nouveautes-covid-19",
          },
          {
            title:
              "Questions - Réponses : adaptation de l’activité, congés, mise à disposition",
            url:
              "/fiche-ministere-travail/adaptation-de-lactivite-conges-mise-a-disposition-de-main-doeuvre",
          },
          {
            title:
              "Questions - Réponses : primes exceptionnelles et épargne salariale",
            url:
              "/fiche-ministere-travail/prime-exceptionnelle-et-epargne-salariale",
          },
        ],
        shortTitle: "Congés payés, durée du travail, primes",
        title: "Congés payés, durée du travail et primes",
      },
      {
        icon: "Contract",
        id: "contrats",
        position: 8,
        refs: [
          {
            title: "Nouveautés Covid-19 : rupture conventionnelle",
            url: "/information/rupture-conventionnelle-nouveautes-covid-19",
          },
          {
            title: "Télétravail dans le secteur privé",
            url: "/fiche-service-public/teletravail-dans-le-secteur-prive",
          },
          {
            title:
              "Mise à disposition temporaire de salariés volontaires entre deux entreprises",
            url:
              "/fiche-ministere-travail/mise-a-disposition-temporaire-de-salaries-volontaires-entre-deux-entreprises",
          },
          {
            title: "Nouveautés Covid-19 : entretien professionnel",
            url: "/information/entretien-professionnel-nouveautes-covid-19",
          },
        ],
        title: "Contrat de travail",
      },
      {
        icon: "Nego",
        id: "accord-collectif",
        position: 9,
        refs: [
          {
            title: "Questions-réponses : dialogue social",
            url: "/fiche-ministere-travail/dialogue-social",
          },
          {
            title: "Nouveautés Covid-19 : accord collectif d’entreprise",
            url:
              "/information/accord-collectif-dentreprise-nouveautes-covid-19",
          },
        ],
        title: "CSE et accord collectif",
      },
      {
        icon: "Security",
        id: "sante-securite",
        position: 10,
        refs: [
          {
            title:
              "Sécurité et santé des travailleurs : les obligations générales de l’employeur et sa responsabilité",
            url:
              "/fiche-ministere-travail/securite-et-sante-des-travailleurs-les-obligations-generales-de-lemployeur-et-sa-responsabilite",
          },
          {
            title:
              "Protocole national pour assurer la santé et la sécurité des salariés en entreprise face à l’épidémie de COVID-19",
            url:
              "https://travail-emploi.gouv.fr/le-ministere-en-action/coronavirus-covid-19/reprise-de-l-activite/protocole-national-sante-securite-salaries",
          },
          {
            title:
              "Quelles mesures l’employeur doit-il prendre pour protéger la santé de ses salariés",
            url:
              "/fiche-ministere-travail/quelles-mesures-lemployeur-doit-il-prendre-pour-proteger-la-sante-de-ses-salaries",
          },
          {
            title:
              "Nouveautés Covid-19 : report ou annulation de visites médicales",
            url:
              "/information/report-ou-annulation-de-visites-medicales-nouveautes-covid-19",
          },
          {
            title:
              "Questions - Réponses : responsabilité de l’employeur et droit de retrait",
            url:
              "/fiche-ministere-travail/responsabilite-de-lemployeur-droit-de-retrait",
          },
          {
            title:
              "Questions - Réponses : mesures de prévention dans l’entreprise contre le COVID-19",
            url:
              "/fiche-ministere-travail/mesures-de-prevention-dans-lentreprise-contre-le-covid-19-masques",
          },
          {
            title: "Questions - Réponses : services de santé au travail",
            url: "/fiche-ministere-travail/services-de-sante-au-travail",
          },
          {
            title: "Questions - Réponses : mesures de prévention hors covid",
            url:
              "/fiche-ministere-travail/mesures-de-prevention-sante-hors-covid-19",
          },
          {
            title: "Nouveautés Covid-19 : services de santé au travail",
            url:
              "/information/services-de-sante-au-travail-nouveautes-covid-19",
          },
        ],
        title: "Santé et sécurité au travail",
      },
      {
        icon: "Formation",
        id: "formation",
        position: 11,
        refs: [
          {
            title: "Dispositif de FNE-Formation",
            url:
              "https://www.economie.gouv.fr/plan-de-relance/profils/entreprises/fne-formationn",
          },
          {
            title: "Questions - Réponses : formation professionnelle stagiaire",
            url:
              "/fiche-ministere-travail/formation-professionnelle-stagiaires-et-organismes-de-formation",
          },
          {
            title: "Questions - Réponses : apprentissage",
            url:
              "/fiche-ministere-travail/apprentissage-apprentis-et-organismes-de-formation-cfa",
          },
          {
            title:
              "Formation professionnelle des salariés en activité partielle",
            url:
              "/fiche-ministere-travail/formation-professionnelle-des-salaries-en-activite-partielle",
          },
          {
            title:
              "Aide exceptionnelle aux employeurs qui recrutent en apprentissage",
            url:
              "/fiche-ministere-travail/aide-exceptionnelle-aux-employeurs-qui-recrutent-en-apprentissage",
          },
        ],
        shortTitle: "Formation et apprentissage",
        title: "Formation professionnelle et apprentissage",
      },
      {
        icon: "Unemployment",
        id: "chomage",
        position: 12,
        refs: [
          {
            title: "Questions-réponses : indemnisation chômage",
            url: "/fiche-ministere-travail/indemnisation-chomage",
          },
        ],
        title: "Chômage",
      },
      {
        icon: "Resources",
        id: "ressources",
        position: 13,
        refs: [
          {
            title: "Rester informé sur le Coronavirus",
            url: "https://www.gouvernement.fr/info-coronavirus",
          },
          {
            title: "Le ministère de l’économie soutient les entreprises",
            url: "https://www.economie.gouv.fr/coronavirus-soutien-entreprises",
          },
          {
            title:
              "Coronavirus et paiement des cotisations salariales et patronales",
            url:
              "https://www.urssaf.fr/portail/home/actualites/toute-lactualite-employeur/mesures-exceptionnelles-pour-l-1.html",
          },
          {
            title:
              "Garantie en cas de sauvegarde, de redressement ou de liquidation judiciaire",
            url:
              "/fiche-ministere-travail/la-garantie-en-cas-de-sauvegarde-de-redressement-ou-de-liquidation-judiciaire",
          },
          {
            title: "Coronavirus et données personnelles",
            url:
              "https://www.cnil.fr/fr/coronavirus-covid-19-les-rappels-de-la-cnil-sur-la-collecte-de-donnees-personnelles",
          },
        ],
        title: "Ressources utiles",
      },
    ],
    description:
      "L’essentiel à savoir sur le Coronavirus en tant que salarié ou employeur : des fiches pratiques, des liens utiles, des modèles de courriers téléchargeables, etc.",
    id: "3ab4623a-f105-406a-8a2d-f0c8e83a4077",
    metaDescription:
      "Coronavirus et le travail : télétravail, démarches chômage partiel, santé, sécurité, obligations de l’employeur, congés payés, arrêt de travail pour garder ses enfants, droit de retrait...",
    slug: "ministere-du-travail-notre-dossier-sur-le-coronavirus",
    title: "Ministère du travail : notre dossier sur le Coronavirus",
  },
];
module.exports = { thematicFiles };
