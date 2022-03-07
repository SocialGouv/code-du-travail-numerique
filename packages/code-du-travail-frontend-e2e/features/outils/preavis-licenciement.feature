#language: fr

@preavis-licenciement-outil
Fonctionnalité: Outil - Préavis de licenciement
  Pour pouvoir calculer mon préavis de licenciement
  En tant que visiteur
  Je veux pouvoir utiliser le calculateur de préavis de licenciement (en renseignant ou non ma CC)

  Scénario: Parcours sans convention collective
    Soit un utilisateur sur la page "/outils/preavis-licenciement"

    Alors je vois "Étapes"
    Alors je vois "Préavis de licenciement"
    Alors je vois "permet de calculer la durée du préavis accordée au salarié en cas de licenciement"

    Quand je clique sur "Commencer"

    Alors je vois "Le licenciement est-il dû à une faute grave (ou lourde)"
    Quand je choisis "Oui"
    Quand je clique sur "Suivant"
    Alors je vois "Dans le cas d’un licenciement pour faute grave ou lourde, il n’y pas d’obligation de respecter un préavis."
    Quand je choisis "Non"
    Alors je vois "Le salarié concerné est-il reconnu en tant que travailleur handicapé"
    Quand je choisis "#disabledWorker-non"
    Alors je vois "Quelle est l'ancienneté du salarié"
    Quand je sélectionne "Plus de 2 ans" dans la liste "cdt.ancienneté"
    Quand je clique sur "Suivant"

    Alors je vois "Quel est le nom de la convention collective applicable ?"
    Quand je clique sur "Suivant"
    Alors je vois "Vous devez répondre à cette question"
    Quand je choisis "Je ne souhaite pas renseigner ma convention collective"
    Alors je vois "Vous pouvez passer cette étape et poursuivre la simulation qui vous fournira un résultat basé sur le code du travail."
    Quand je clique sur "Suivant"

    Alors je vois "Durée du préavis"
    Alors je vois "2 mois"
    Quand j'ouvre l'accordion
    Alors je vois "Plus de 2 ans"
    Alors je vois "La convention collective n'a pas été renseignée"

  Scénario: Parcours en connaissant sa convention collective
    Soit un utilisateur sur la page "/outils/preavis-licenciement"

    Alors je vois "Étapes"
    Alors je vois "Préavis de licenciement"
    Alors je vois "permet de calculer la durée du préavis accordée au salarié en cas de licenciement"

    Quand je clique sur "Commencer"

    Alors je vois "Le licenciement est-il dû à une faute grave (ou lourde)"
    Quand je choisis "Non"
    Alors je vois "Le salarié concerné est-il reconnu en tant que travailleur handicapé"
    Quand je choisis "#disabledWorker-non"
    Alors je vois "Quelle est l'ancienneté du salarié"
    Quand je sélectionne "Plus de 2 ans" dans la liste "cdt.ancienneté"
    Quand je clique sur "Suivant"

    Alors je vois "Quel est le nom de la convention collective applicable ?"
    Quand je clique sur "Suivant"
    Alors je vois "Vous devez répondre à cette question"
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
    Quand je sélectionne "Plus de 2 ans" dans la liste "criteria.ancienneté"
    Quand je clique sur "Suivant"

    Alors je vois "Durée du préavis"
    Alors je vois "2 mois"

    Quand j'ouvre l'accordion
    Alors je vois "Boulangerie-pâtisserie (entreprises artisanales)"
    Alors je vois "Personnel de fabrication, personnel de vente et personnel de services"
    Alors je vois "Plus de 2 ans"
