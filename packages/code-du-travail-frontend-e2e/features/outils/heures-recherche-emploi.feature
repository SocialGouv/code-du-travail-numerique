#language: fr

@heure-recherche-emploi-outil
Fonctionnalité: Outil - Heures d'absence pour rechercher un emploi
  Pour pouvoir calculer mes heures pour recherche d'emploi
  En tant que visiteur
  Je veux pouvoir utiliser le calculateur d'heures pour recherche d'emploi (en renseignant ou non ma CC)

  Scénario: Parcours avec convention collective non traité
    Soit un utilisateur sur la page "/outils/heures-recherche-emploi"

    Alors je vois "Étapes"
    Alors je vois "Calculer le nombre d'heures d'absence pour rechercher un emploi"
    Alors je vois "permet de calculer le nombre d’heures d’absence autorisée pendant la période de préavis"

    Quand je clique sur "Commencer"

    Alors je vois "Quel est le nom de la convention collective applicable ?"
    Quand je clique sur "Suivant"
    Alors je vois "Vous devez répondre à cette question"
    Quand je choisis "Je sais quelle est ma convention collective"
    Alors je vois "Précisez et sélectionnez votre convention collective"
    Quand je renseigne "1388" dans le champ "Nom de la convention collective ou son numéro d’identification IDCC"
    Alors j'attends que le texte "Industrie du pétrole" apparaisse
    Quand je clique sur "Industrie du pétrole"
    Alors je vois "Convention collective non traitée"
    Quand je clique sur "Suivant"

    Alors je vois "La simulation ne peut pas se poursuivre avec cette convention collective"

  Scénario: Parcours en connaissant sa convention collective et sans information complémentaire
    Soit un utilisateur sur la page "/outils/heures-recherche-emploi"

    Alors je vois "Étapes"
    Alors je vois "Heures d'absence pour rechercher un emploi"

    Quand je clique sur "Commencer"

    Alors je vois "Quel est le nom de la convention collective applicable ?"
    Quand je choisis "Je sais quelle est ma convention collective"
    Alors je vois "Précisez et sélectionnez votre convention collective"
    Quand je renseigne "843" dans le champ "Nom de la convention collective ou son numéro d’identification IDCC"
    Alors j'attends que le texte "Boulangerie" apparaisse
    Quand je clique sur "Boulangerie"
    Alors je vois "Cliquez sur Suivant pour poursuivre la simulation."
    Quand je clique sur "Suivant"

    Alors je vois "Pour quelle raison le contrat de travail a-t-il été rompu"
    Quand je sélectionne "Licenciement" dans la liste "typeRupture"
    Quand je clique sur "Suivant"

    Alors je vois "Nombre d’heures d’absence autorisée pour rechercher un emploi"
    Alors je vois "2 heures d'absence par jour pendant la dernière semaine du préavis"
    Alors je vois "Rémunération pendant les heures d’absence autorisée"
    Alors je vois "Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération."
    Alors je vois "Conditions d’utilisation"
    Alors je vois "Les heures sont fixées un jour par l' employeur et le suivant par le salarié. Ils peuvent décider de regrouper tout ou partie de ces heures."

    Quand j'ouvre l'accordion
    Alors je vois "Boulangerie-pâtisserie (entreprises artisanales)"
    Alors je vois "Licenciement"

  Scénario: Parcours en connaissant sa convention collective et avec informations complémentaires
    Soit un utilisateur sur la page "/outils/heures-recherche-emploi"

    Alors je vois "Étapes"
    Alors je vois "Heures d'absence pour rechercher un emploi"

    Quand je clique sur "Commencer"

    Alors je vois "Quel est le nom de la convention collective applicable ?"
    Quand je choisis "Je sais quelle est ma convention collective"
    Alors je vois "Précisez et sélectionnez votre convention collective"
    Quand je renseigne "787" dans le champ "Nom de la convention collective ou son numéro d’identification IDCC"
    Alors j'attends que le texte "Personnel des cabinets d'experts-comptables et de commissaires aux comptes" apparaisse
    Quand je clique sur "Personnel des cabinets d'experts-comptables et de commissaires aux comptes"
    Alors je vois "Cliquez sur Suivant pour poursuivre la simulation."
    Quand je clique sur "Suivant"

    Alors je vois "Pour quelle raison le contrat de travail a-t-il été rompu"
    Quand je sélectionne "Démission" dans la liste "typeRupture"
    Quand je clique sur "Suivant"

    Alors je vois "Quelle est l'ancienneté du salarié"
    Quand je sélectionne "Au moins 5 ans" dans la liste "criteria.ancienneté"
    Quand je clique sur "Suivant"

    Alors je vois "Nombre d’heures d’absence autorisée pour rechercher un emploi"
    Alors je vois "2 heures par journée d'ouverture du cabinet"
    Alors je vois "Rémunération pendant les heures d’absence autorisée"
    Alors je vois "Le salaire est maintenu."
    Alors je vois "Conditions d’utilisation"
    Alors je vois "Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures."

    Quand j'ouvre l'accordion
    Alors je vois "Personnel des cabinets d'experts-comptables et de commissaires aux comptes"
    Alors je vois "Démission"
    Alors je vois "Au moins 5 ans"
