// Custom order and groups for items found in any level of the breadcrumb path.
// The aim is to make information more human readable in the UI.
//
// This file is tightly coupled to the names used in `themes.js` and must be
// kept in sync.
//
// Each key of the `ordering` object must be the current path of the breadcrumb
// and each value must be an array of 1 or more arrays that group items, e.g.:
//
//   let ordering = {
//     "Contrat de travail > Droit Disciplinaire": [
//       [
//         "Contrôle juridictionnel",
//         "Pénal",
//       ],
//       [
//         "Procédure disciplinaire: pénal",
//         "Procédure disciplinaire: prescription",
//       ],
//     ],
//   }

let ordering = {
  // The `root` path is represented as an empty string in the breadcrumb path.
  // So the empty string is used as an object identifier on purpose.
  "": [
    ["Contrat de travail", "Durée du travail et congés", "Rémunération"],
    ["Pouvoirs de l'employeur, libertés et droits fondamentaux"],
    ["Emploi - Formation"],
    ["Institutions représentatives du personnel", "Négociations collectives"],
    ["Santé Sécurité"],
    ["Obligations diverses"]
  ],

  "Contrat de travail": [
    [
      "Embauche",
      "généralités",
      "Contrat: exécution, modification, transfert",
      "Maladie, Accident du travail (AT), Inaptitude",
      "Maternité, Paternité",
      "Droit Disciplinaire"
    ],
    ["Période d'essai", "Rupture de contrat à durée Indéterminée (CDI)"],
    [
      "Professions particulières",
      "Règles spécifiques du Contrat à durée déterminée (CDD)",
      "Règles spécifiques du Contrat de travail temporaire",
      "Travail temporaire et employeur public"
    ],
    ["Salariés étrangers et déplacés", "Travailleurs étrangers ou détachés"],
    ["Conseil de prud'hommes (CPH)", "Autres cas de mise à disposition"]
  ],

  "Durée du travail et congés": [
    ["Durée du travail"],
    ["Congés payés", "Compte épargne temps", "Congés autres"],
    ["Spécificités jeunes"]
  ],

  "Durée du travail et congés > Durée du travail": [
    [
      'Durée légale "35 heures"',
      "Décompte de la durée du travail",
      "Durée maximale du travail",
      "Jours fériés",
      "Repos et temps de pause"
    ],
    ["Heures supplémentaires", "Aménagement Temps de Travail", "Forfait"],
    ["Temps partiel", "Travail intermittent"],
    [
      "Astreintes, travail effectif et équivalences",
      "Travail de nuit",
      "Travail du dimanche"
    ],
    ["Outre - mer"]
  ],

  "Contrat de travail > Rupture de contrat à durée Indéterminée (CDI)": [
    [
      "Principes de la rupture",
      "Licenciement",
      "Rupture conventionnelle (individuelle)",
      "Rupture à l'initiative du salarié",
      "Rupture d'un commun accord prévue par un accord collectif"
    ],
    ["Cas particuliers", "Retraite"]
  ],

  "Contrat de travail > Période d'essai": [
    [
      "Définition",
      "Une clause nécessaire du contrat de travail",
      "Généralités"
    ],
    [
      "Durée maximale par catégories de salariés",
      "Exceptions relatives à la durée",
      "Renouvellements : possibilités et durée"
    ],
    [
      "Délai de prévenance et Rupture par le salarié",
      "Délai de prévenance et Rupture par l'employeur"
    ],
    ["stagiaire"]
  ]
};

export default ordering;
