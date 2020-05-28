const thematicFiles = [
  {
    slug: "ministere-du-travail-notre-dossier-sur-le-coronavirus",
    title: "Ministère du travail : notre dossier sur le Coronavirus",
    metaDescription:
      "Coronavirus et le travail : télétravail, démarches chômage partiel, santé, sécurité, obligations de l’employeur, congés payés, arrêt de travail pour garder ses enfants, droit de retrait...",
    description:
      "L’essentiel à savoir sur le Coronavirus en tant que salarié ou employeur : des fiches pratiques, des liens utiles, des modèles de courriers téléchargeables, etc.",
    categories: [
      {
        icon: "Populars",
        id: "populaires",
        position: 1,
        refs: [
          {
            url: "/fiche-ministere-travail/teletravail",
            title: "Questions - Réponses : télétravail",
          },
          {
            url: "/fiche-ministere-travail/activite-partielle-chomage-partiel",
            title: "Activité partielle – chômage partiel",
          },
          {
            url:
              "https://travail-emploi.gouv.fr/actualites/presse/communiques-de-presse/article/protocole-national-de-deconfinement-pour-les-entreprises-pour-assurer-la",
            title:
              "Protocole national de déconfinement du Ministère du travail",
          },
          {
            url:
              "/fiche-ministere-travail/fiches-conseils-metiers-et-guides-pour-les-salaries-et-les-employeurs",
            title: "Fiches conseils métiers du ministère du travail",
          },
          {
            url: "/information/conges-payes-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : congés payés [Infographie]",
          },
          {
            url: "/fiche-ministere-travail/conventions-de-fne-formation",
            title: "Conventions de FNE-Formation",
          },
        ],
        title: "Les contenus populaires",
      },
      {
        icon: "Security",
        id: "sante-securite",
        position: 2,
        refs: [
          {
            url:
              "/fiche-ministere-travail/securite-et-sante-des-travailleurs-les-obligations-generales-de-lemployeur-et-sa-responsabilite",
            title:
              "Sécurité et santé des travailleurs : les obligations générales de l’employeur et sa responsabilité",
          },
          {
            url:
              "https://travail-emploi.gouv.fr/actualites/presse/communiques-de-presse/article/protocole-national-de-deconfinement-pour-les-entreprises-pour-assurer-la",
            title:
              "Protocole national de déconfinement du Ministère du travail",
          },
          {
            url:
              "/fiche-ministere-travail/quelles-mesures-lemployeur-doit-il-prendre-pour-proteger-la-sante-de-ses-salaries",
            title:
              "Quelles mesures l’employeur doit-il prendre pour protéger la santé de ses salariés",
          },
          {
            url:
              "/information/report-ou-annulation-de-visites-medicales-nouveautes-covid-19",
            title:
              "Nouveautés Covid-19 : report ou annulation de visites médicales",
          },
          {
            url:
              "/information/prescription-darrets-du-travail-par-le-medecin-du-travail-nouveaute-covid-19",
            title:
              "Nouveauté Covid-19 : prescription d’arrêts du travail par le médecin du travail",
          },
          {
            url:
              "/fiche-ministere-travail/responsabilite-de-lemployeur-droit-de-retrait",
            title:
              "Questions - Réponses : responsabilité de l’employeur et droit de retrait",
          },
          {
            url:
              "/fiche-ministere-travail/mesures-de-prevention-dans-lentreprise-contre-le-covid-19-masques",
            title:
              "Questions - Réponses : mesures de prévention dans l’entreprise contre le COVID-19",
          },
          {
            url: "/fiche-ministere-travail/services-de-sante-au-travail",
            title: "Questions - Réponses : services de santé au travail",
          },
          {
            url:
              "/fiche-ministere-travail/mesures-de-prevention-sante-hors-covid-19",
            title: "Questions - Réponses : mesures de prévention hors covid",
          },
          {
            url:
              "/information/services-de-sante-au-travail-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : services de santé au travail",
          },
        ],
        title: "Santé et sécurité au travail",
      },
      {
        icon: "Focus",
        id: "focus",
        position: 3,
        refs: [
          {
            url:
              "/fiche-ministere-travail/fiches-conseils-metiers-et-guides-pour-les-salaries-et-les-employeurs#Problematiques-communes-a-tous-les-metiers",
            title: "Problématiques communes à tous les métiers",
          },
          {
            url:
              "/fiche-ministere-travail/fiches-conseils-metiers-et-guides-pour-les-salaries-et-les-employeurs#Agriculture-elevage-agroalimentaire-jardins-et-espaces-verts",
            title:
              "Agriculture, élevage, agroalimentaire, jardins et espaces verts",
          },
          {
            url:
              "/fiche-ministere-travail/fiches-conseils-metiers-et-guides-pour-les-salaries-et-les-employeurs#Commerce-de-detail-restauration-hotellerie",
            title: "Commerce de détail, restauration, hôtellerie",
          },
          {
            url:
              "/fiche-ministere-travail/fiches-conseils-metiers-et-guides-pour-les-salaries-et-les-employeurs#Proprete-reparation-maintenance",
            title: "Propreté, réparation, maintenance",
          },
          {
            url:
              "/fiche-ministere-travail/fiches-conseils-metiers-et-guides-pour-les-salaries-et-les-employeurs#Industrie-production",
            title: "Industrie, production",
          },
          {
            url:
              "/fiche-ministere-travail/fiches-conseils-metiers-et-guides-pour-les-salaries-et-les-employeurs#Transports-logistique",
            title: "Transports, logistique",
          },
          {
            url:
              "/fiche-ministere-travail/fiches-conseils-metiers-et-guides-pour-les-salaries-et-les-employeurs#Autres-services",
            title: "Autres services",
          },
          {
            url: "/information/assistant-e-maternel-le-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : assistant(e) maternel(le)",
          },
          {
            url:
              "/fiche-ministere-travail/employeurs-inclusifs-siae-ea-geiq-pec",
            title:
              "Questions - Réponses : Employeurs inclusifs  (SIAE, EA, GEIQ, PEC)",
          },
          {
            url:
              "/fiche-ministere-travail/mesures-exceptionnelles-de-soutien-aux-intermittents-et-salaries-du-secteur-culturel-dans-le-cadre-de-la-crise-sanitaire",
            title:
              "Mesures exceptionnelles de soutien aux intermittents et salariés du secteur culturel dans le cadre de la crise sanitaire",
          },
          {
            url:
              "/fiche-ministere-travail/covid-19-situation-des-travailleurs-frontaliers",
            title:
              "Nouveautés Covid-19 : situation des travailleurs frontaliers",
          },
        ],
        title: "Prévention Covid-19 par secteur ou par métier",
      },
      {
        icon: "Precarity",
        id: "conge-payes",
        position: 4,
        refs: [
          {
            url: "/information/conges-payes-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : congés payés [Infographie]",
          },
          {
            url:
              "/information/rtt-jours-de-repos-forfait-jours-compte-epargne-temps-nouveautes-covid-19",
            title:
              "Nouveautés Covid-19 : RTT, jours de repos forfait jours, compte épargne-temps [Infographie]",
          },
          {
            url:
              "/information/prime-exceptionnelle-de-pouvoir-dachat-nouveautes-covid-19",
            title:
              "Nouveautés Covid-19 : prime exceptionnelle de pouvoir d’achat",
          },
          {
            url:
              "/information/interessement-et-participation-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : intéressement et participation",
          },
          {
            url:
              "/information/durees-maximales-de-travail-repos-quotidien-et-dominical-nouveautes-covid-19",
            title:
              "Nouveautés Covid-19 : durées maximales de travail, repos quotidien et dominical",
          },
          {
            url:
              "/fiche-ministere-travail/adaptation-de-lactivite-conges-mise-a-disposition-de-main-doeuvre",
            title:
              "Questions - Réponses : adaptation de l’activité, congés, mise à disposition",
          },
          {
            url:
              "/fiche-ministere-travail/prime-exceptionnelle-et-epargne-salariale",
            title:
              "Questions - Réponses : primes exceptionnelles et épargne salariale",
          },
        ],
        title: "Congés payés, durée du travail et primes",
        shortTitle: "Congés payés, durée du travail, primes",
      },
      {
        icon: "PartialActivity",
        id: "activite-partielle",
        position: 5,
        refs: [
          {
            url: "/fiche-ministere-travail/activite-partielle-chomage-partiel",
            title:
              "Questions - Réponses : activité partielle - chômage partiel",
          },
          {
            url:
              "/fiche-service-public/activite-partielle-demarches-de-lemployeur-chomage-partiel-ou-technique",
            title:
              "Activité partielle : démarches de l’employeur (chômage partiel ou technique)",
          },
          {
            url:
              "/fiche-service-public/remuneration-dun-salarie-en-chomage-partiel-activite-partielle",
            title:
              "Rémunération d’un salarié placé en activité partielle (chômage partiel)",
          },
          {
            url: "https://activitepartielle.emploi.gouv.fr/apart/",
            title: "Demander l’activité partielle",
          },
          {
            url: "https://www.simulateurap.emploi.gouv.fr/",
            title: "Simulateur d’activité partielle",
          },
          {
            url:
              "/fiche-ministere-travail/fiche-activite-partielle-chomage-partiel",
            title: "Fiche Activité partielle",
          },
        ],
        title: "Activité partielle (chômage partiel)",
        shortTitle: "Activité partielle",
      },
      {
        icon: "Contract",
        id: "contrats",
        position: 6,
        refs: [
          {
            url: "/fiche-ministere-travail/teletravail",
            title: "Questions - Réponses : télétravail",
          },
          {
            url:
              "/fiche-ministere-travail/embauche-demission-sanctions-licenciement",
            title:
              "Questions - Réponses : embauche, démission, sanctions, licenciement",
          },
          {
            url: "/information/rupture-conventionnelle-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : rupture conventionnelle",
          },
          {
            url: "/fiche-service-public/teletravail-dans-le-secteur-prive",
            title: "Télétravail dans le secteur privé",
          },
          {
            url:
              "/fiche-ministere-travail/mise-a-disposition-temporaire-de-salaries-volontaires-entre-deux-entreprises",
            title:
              "Mise à disposition temporaire de salariés volontaires entre deux entreprises",
          },
          {
            url: "/information/entretien-professionnel-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : entretien professionnel",
          },
        ],
        title: "Contrat de travail (embauche, télétravail, rupture…)",
        shortTitle: "Contrat de travail",
      },
      {
        icon: "Health",
        id: "arret-maladie",
        position: 7,
        refs: [
          {
            url:
              "/fiche-ministere-travail/garde-denfants-et-personnes-vulnerables",
            title:
              "Questions - Réponses : garde d’enfants et personnes vulnérables",
          },
          {
            url:
              "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
            title: "Arrêt maladie : indemnités journalières versées au salarié",
          },
        ],
        title: "Arrêt maladie et garde d’enfants",
      },
      {
        icon: "Nego",
        id: "accord-collectif",
        position: 8,
        refs: [
          {
            url: "/fiche-ministere-travail/dialogue-social",
            title: "Questions-réponses : dialogue social",
          },
          {
            url:
              "/information/information-et-consultation-du-cse-nouveautes-covid-19",
            title:
              "Nouveautés Covid-19 : information et consultation du CSE [Infographie]",
          },
          {
            url:
              "/information/accord-collectif-dentreprise-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : accord collectif d’entreprise",
          },
          {
            url: "/information/elections-du-cse-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : élections du CSE",
          },
          {
            url: "/information/reunions-du-cse-nouveautes-covid-19",
            title: "Nouveautés Covid-19 : réunions du CSE [Infographie]",
          },
        ],
        title: "CSE et accord collectif",
      },
      {
        icon: "Formation",
        id: "formation",
        position: 9,
        refs: [
          {
            url: "/fiche-ministere-travail/conventions-de-fne-formation",
            title: "Conventions de FNE-Formation",
          },
          {
            url: "/fiche-ministere-travail/fne-formation",
            title: "Questions - Réponses : FNE-formation",
          },
          {
            url:
              "/fiche-ministere-travail/formation-professionnelle-stagiaires-et-organismes-de-formation",
            title: "Questions - Réponses : formation professionnelle stagiaire",
          },
          {
            url:
              "/fiche-ministere-travail/apprentissage-apprentis-et-organismes-de-formation-cfa",
            title: "Questions - Réponses : apprentissage",
          },
          {
            url:
              "/fiche-ministere-travail/formation-professionnelle-des-salaries-en-activite-partielle",
            title:
              "Formation professionnelle des salariés en activité partielle",
          },
        ],
        title: "Formation professionnelle et apprentissage",
        shortTitle: "Formation et apprentissage",
      },
      {
        icon: "Unemployment",
        id: "chomage",
        position: 10,
        refs: [
          {
            url: "/fiche-ministere-travail/indemnisation-chomage",
            title: "Questions-réponses : indemnisation chômage",
          },
          {
            url:
              "https://www.pole-emploi.fr/actualites/allongement-exceptionnel-de-lind.html",
            title:
              "Allongement exceptionnel de l’indemnisation pour les demandeurs d’emploi en fin de droit",
          },
        ],
        title: "Chômage",
      },
      {
        icon: "Resources",
        id: "ressources",
        position: 11,
        refs: [
          {
            url:
              "/modeles-de-courriers/justificatif-de-deplacement-professionnel-a-plus-de-100km-du-domicile-et-en-dehors-du-departement-de-residence",
            title:
              "Justificatif de déplacement professionnel à plus de 100km du domicile et en dehors du département de résidence",
          },
          {
            url:
              "https://www.prefectures-regions.gouv.fr/ile-de-france/Region-et-institutions/L-action-de-l-Etat/Amenagement-du-territoire-transport-et-environnement/Les-transports-du-quotidien/Deconfinement-les-attestations-pour-se-deplacer-dans-les-transports-en-commun-en-heure-de-pointe",
            title:
              "Attestation de déplacement professionnel en transport collectif en Île-de-France",
          },
          {
            url: "https://www.gouvernement.fr/info-coronavirus",
            title: "Rester informé sur le Coronavirus",
          },
          {
            url: "https://www.economie.gouv.fr/coronavirus-soutien-entreprises",
            title: "Le ministère de l'économie soutient les entreprises",
          },
          {
            url:
              "https://www.urssaf.fr/portail/home/actualites/toute-lactualite-employeur/mesures-exceptionnelles-pour-les.html",
            title:
              "Coronavirus et paiement des cotisations salariales et patronales",
          },
          {
            url:
              "https://www.cnil.fr/fr/coronavirus-covid-19-les-rappels-de-la-cnil-sur-la-collecte-de-donnees-personnelles",
            title: "Coronavirus et données personnelles",
          },
        ],
        title: "Ressources utiles",
      },
    ],
  },
];
module.exports = { thematicFiles };
