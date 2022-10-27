#language: fr

@preavis-demission-outil
Fonctionnalité: Outil - Préavis de démission
  Pour pouvoir calculer mon préavis de démission
  En tant que visiteur
  Je veux pouvoir utiliser le calculateur de préavis de démission (en renseignant ou non ma CC)

  Scénario: Parcours avec convention collective non traité
    Soit un utilisateur sur la page "/outils/preavis-demission"

    Alors je vois "Étapes"
    Alors je vois "Calculer le préavis de démission"
    Alors je vois "permet de calculer la durée du préavis que le salarié doit respecter en cas de démission"

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


  Scénario: Parcours en connaissant sa convention collective
    Soit un utilisateur sur la page "/outils/preavis-demission"

    Alors je vois "Calculer le préavis de démission"

    Quand je clique sur "Commencer"

    Alors je vois "Quel est le nom de la convention collective applicable ?"
    Quand je choisis "Je sais quelle est ma convention collective"
    Alors je vois "Précisez et sélectionnez votre convention collective"
    Quand je renseigne "843" dans le champ "Nom de la convention collective ou son numéro d’identification IDCC"
    Alors j'attends que le texte "Boulangerie" apparaisse
    Quand je clique sur "Boulangerie"
    Alors je vois "Cliquez sur Suivant pour poursuivre la simulation."
    Quand je clique sur "Suivant"

    Alors je vois "Quelle est la catégorie professionnelle du salarié"
    Quand je sélectionne "Personnel de fabrication, personnel de vente et personnel de services" dans la liste "criteria.catégorie professionnelle"
    Alors je vois "Quelle est l'ancienneté du salarié"
    Quand je sélectionne "Plus de 6 mois" dans la liste "criteria.ancienneté"
    Quand je clique sur "Suivant"

    Alors je vois "Durée du préavis"
    Alors je vois "2 semaines"

    Quand j'ouvre l'accordion
    Alors je vois "Boulangerie-pâtisserie (entreprises artisanales)"
    Alors je vois "Personnel de fabrication, personnel de vente et personnel de services"
    Alors je vois "Plus de 6 mois"
