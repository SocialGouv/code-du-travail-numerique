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
    [
      "Contrat de travail",
      "Durée du travail et congés",
      "Rémunération",
    ],
    [
      "Pouvoirs de l'employeur, libertés et droits fondamentaux",
    ],
    [
      "Emploi - Formation",
    ],
    [
      "Institutions représentatives du personnel",
      "Négociations collectives",
    ],
    [
      "Santé Sécurité",
    ],
    [
      "Obligations diverses",
    ],
  ],

  "Contrat de travail": [
    [
      "Embauche",
      "généralités",
      "Contrat: exécution, modification, transfert",
      "Maladie, Accident du travail (AT), Inaptitude",
      "Maternité, Paternité",
      "Droit Disciplinaire",
    ],
    [
      "Période d'essai",
      "Rupture de contrat à durée Indéterminée (CDI)",
    ],
    [
      "Contrat à durée déterminée et Contrat de travail temporaire",
      "Contrats divers",
      "Professions particulières",
    ],
    [
      "Salariés étrangers et déplacés",
      "Travailleurs étrangers ou détachés",
    ],
    [
      "Conseil de prud'hommes (CPH)",
    ],
  ],

  "Durée du travail et congés": [
    [
      "Durée du travail",
    ],
    [
      "Congés payés",
      "Compte épargne temps",
      "Congés autres",
    ],
    [
      "Spécificités jeunes",
    ],
  ],

}

export default ordering;
