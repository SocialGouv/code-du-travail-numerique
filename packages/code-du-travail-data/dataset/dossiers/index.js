const { SOURCES } = require("@cdt/sources");

const thematicFiles = [
  {
    slug: "ministere-du-travail-notre-dossier-sur-le-coronavirus",
    title: "Ministère du travail : notre dossier sur le coronavirus",
    metaDescription:
      "Coronavirus et le travail : télétravail, démarches chômage partiel, santé, sécurité, obligations de l’employeur, congés payés, arrêt de travail pour garder ses enfants, droit de retrait...",
    description:
      "L’essentiel à savoir sur le Coronavirus en tant que salarié ou employeur : des fiches pratiques, des liens utiles, des modèles de courriers téléchargeables, etc.",
    asideContent: `
Rester informer sur le Coronavirus :
 - https://www.gouvernement.fr/info-coronavirus

Coronavirus - Obligations de l’employeur :
 - https://travail-emploi.gouv.fr/IMG/pdf/covid19_obligations_employeur.pdf

Le ministère de l'économie soutient les entreprises :
 - https://www.economie.gouv.fr/coronavirus-soutien-entreprises

Demander l’activité partielle :
- https://activitepartielle.emploi.gouv.fr/apart/

Déclarer un arrêt de travail pour un salarié contraint de garder son enfant à domicile ou dit à « risque » (affections longue maladie etc) :
 - https://declare.ameli.fr/

Coronavirus et paiement des cotisations salariales et patronales :
 - https://www.urssaf.fr/portail/home/actualites/toute-lactualite-employeur/mesures-exceptionnelles-pour-les.html

Coronavirus et données personnelles :
 - https://www.cnil.fr/fr/coronavirus-covid-19-les-rappels-de-la-cnil-sur-la-collecte-de-donnees-personnelles
`,
    refs: [
      {
        type: "main",
        url:
          "/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus/ce-que-changent-les-ordonnances-en-droit-du-travail",
        title:
          "Coronavirus : ce que changent les ordonnnaces en droit du travail",
        description:
          "Le gouvernement a décidé de prendre plusieurs mesures afin d’accompagner les entreprises et les salariés pour faire face aux conséquences de la crise du coronavirus",
        skipHydration: true,
        source: SOURCES.THEMATIC_FILES,
      },
      {
        type: "main",
        url:
          "/fiche-ministere-travail/coronavirus-questions-reponses-pour-les-entreprises-et-les-salaries",
      },
      {
        type: "secondary",
        url: "/fiche-ministere-travail/activite-partielle-chomage-partiel",
      },
      {
        type: "secondary",
        url:
          "/fiche-ministere-travail/coronavirus-covid-19-fiches-conseils-metiers-pour-les-salaries-et-les-employeurs",
      },
      {
        type: "secondary",
        url:
          "/fiche-service-public/activite-partielle-demarches-de-lemployeur-chomage-partiel-ou-technique",
      },
      {
        type: "secondary",
        url:
          "/fiche-service-public/remuneration-dun-salarie-place-en-activite-partielle-chomage-partiel",
      },
      {
        type: "secondary",
        url: "/fiche-service-public/teletravail-dans-le-secteur-prive",
      },
      {
        type: "secondary",
        url:
          "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
      },
      {
        type: "secondary",
        url:
          "/fiche-service-public/securite-et-sante-au-travail-obligations-de-lemployeur",
      },
      {
        type: "secondary",
        url:
          "/fiche-ministere-travail/mise-a-disposition-temporaire-de-salaries-volontaires-entre-deux-entreprises",
      },
      {
        type: "secondary",
        url:
          "/fiche-service-public/un-salarie-peut-il-refuser-de-travailler-dans-une-situation-dangereuse",
      },
      {
        type: "secondary",
        url:
          "/fiche-ministere-travail/coronavirus-covid-19-questions-reponses-apprentissage",
      },
      {
        type: "secondary",
        url:
          "/fiche-ministere-travail/mesures-exceptionnelles-de-soutien-aux-intermittents-et-salaries-du-secteur-culturel-dans-le-cadre-de-la-crise-sanitaire",
      },
      {
        type: "secondary",
        url:
          "/fiche-ministere-travail/covid-19-situation-des-travailleurs-frontaliers",
      },
      {
        type: "secondary",
        url:
          "/fiche-ministere-travail/coronavirus-covid-19-questions-reponses-formation-professionnelle-des-salaries-alternants-et-personnes-en-recherche-demploi",
      },
      {
        type: "secondary",
        url:
          "/fiche-ministere-travail/coronavirus-covid-19-questions-reponses-mon-compte-formation",
      },
      {
        type: "external",
        title: "Justificatif de l’employeur de déplacement professionnel",
        description:
          "Justificatif permanent à renseigner par l’employeur pour les salariés qui doivent se déplacer pour leur activité professionnelle",
        url:
          "https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestation-de-deplacement-derogatoire-et-justificatif-de-deplacement-professionnel",
        icon: "Document",
        action: "Consulter",
      },
      {
        type: "external",
        title: "Attestation sur l’honneur : déplacement dérogatoire",
        description:
          "Attestation individuelle de déplacement dérogatoire à remplir pour chaque déplacement non professionnel",
        url:
          "https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestation-de-deplacement-derogatoire-et-justificatif-de-deplacement-professionnel",
        icon: "Document",
        action: "Consulter",
      },
      {
        type: "externalTool",
        title: "Simulateur d’activité partielle",
        description:
          "Estimez simplement le montant de l’allocation d’activité partielle.",
        url: "http://www.simulateurap.emploi.gouv.fr",
        icon: "Calculator",
        action: "Consulter",
      },
      {
        type: "template",
        url:
          "/modeles-de-courriers/attestation-sur-lhonneur-arret-de-travail-pour-la-garde-denfant",
      },
      {
        type: "theme",
        url: "/themes/615-teletravail",
      },
      {
        type: "theme",
        url: "/themes/522-les-aides-a-lemploi",
      },
      {
        type: "theme",
        url: "/themes/511-dispositifs-dacces-a-la-formation",
      },
      {
        type: "theme",
        url: "/themes/631-maladie",
      },
    ],
  },
];
module.exports = { thematicFiles };
