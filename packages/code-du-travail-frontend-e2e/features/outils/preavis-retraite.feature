#language: fr

@preavis-retraite-outil
Fonctionnalité: Outil - Préavis de retraite
  Pour pouvoir calculer mon préavis de retraite
  En tant que visiteur
  Je veux pouvoir utiliser le calculateur de préavis de retraite (en renseignant ou non ma CC)

  Scénario: Parcours sans convention collective
    Soit un utilisateur sur la page "/outils/preavis-retraite"

    Alors je vois "Étapes"
    Alors je vois "Calculer le préavis de départ à la retraite"
    Alors je vois "permet de calculer la durée de préavis à respecter en cas de départ ou de mise à la retraite"

    Quand je clique sur "Commencer"


    Alors je vois "Qui est à l’origine du départ en retraite"
    Quand je clique sur "Suivant"

    Alors je vois "Vous devez répondre à cette question"
    Alors je vois que bouton "Suivant" est désactivé
    Quand je choisis "L'employeur décide de mettre"
    Alors je vois "L'employeur qui décide une mise à la retraite doit en avoir informé son salarié."
    Alors le lien "L'employeur peut-il mettre d'office un salarié à la retraite ?" pointe sur "/fiche-service-public/lemployeur-peut-il-mettre-doffice-un-salarie-a-la-retraite"
    Quand je clique sur "Suivant"

    Alors je vois "Quel est le nom de la convention collective applicable ?"
    Quand je clique sur "Suivant"
    Alors je vois "Vous devez répondre à cette question"
    Quand je choisis "Je ne souhaite pas renseigner ma convention collective"
    Alors je vois "Vous pouvez passer cette étape et poursuivre la simulation qui vous fournira un résultat basé sur le code du travail."
    Quand je clique sur "Suivant"

    Alors je vois "Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
    Quand je clique sur "Suivant"
    Alors je vois "Vous devez répondre à cette question"
    Quand je choisis "Non"
    Quand je clique sur "Suivant"

    Alors je vois "Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour)"
    Quand je choisis "Oui"
    Quand je clique sur "Suivant"

    Alors je vois "Préavis de mise à la retraite"
    Alors je vois "2 mois"

    Quand j'ouvre l'accordion
    Alors je vois "Durée prévue par le code du travail (durée légale)"

  Scénario: Parcours en connaissant sa convention collective
    Soit un utilisateur sur la page "/outils/preavis-retraite"

    Alors je vois "Étapes"
    Alors je vois "Calculer le préavis de départ à la retraite"
    Alors je vois "permet de calculer la durée de préavis à respecter en cas de départ ou de mise à la retraite"

    Quand je clique sur "Commencer"


    Alors je vois "Qui est à l’origine du départ en retraite"
    Quand je choisis "Le salarié décide lui-même de partir à la retraite"
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

    Alors je vois "Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
    Quand je choisis "Oui"
    Quand je clique sur "Suivant"

    Alors je vois "Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour)"
    Quand je choisis "Non"
    Alors je vois "Quelle est l'ancienneté du salarié dans l’entreprise en mois"
    Quand je renseigne "10" dans le champ avec le css 'input[name="contrat salarié - ancienneté"]'

    Quand je clique sur "Suivant"

    Alors je vois "Préavis de départ à la retraite"
    Alors je vois "2 mois"

    Quand j'ouvre l'accordion
    Alors je vois "Oui*"
    Alors je vois "Le salarié étant reconnu en tant que travailleur handicapé"
    Alors je vois "Boulangerie-pâtisserie (entreprises artisanales)"

  Scénario: Parcours en ne connaissant pas sa convention collective
    Soit un utilisateur sur la page "/outils/preavis-retraite"

    Alors je vois "Étapes"
    Alors je vois "Calculer le préavis de départ à la retraite"
    Alors je vois "permet de calculer la durée de préavis à respecter en cas de départ ou de mise à la retraite"

    Quand je clique sur "Commencer"

    Alors je vois "Qui est à l’origine du départ en retraite"
    Quand je choisis "Le salarié décide lui-même de partir à la retraite"
    Quand je clique sur "Suivant"

    Alors je vois "Quel est le nom de la convention collective applicable ?"
    Quand je clique sur "Suivant"
    Alors je vois "Vous devez répondre à cette question"
    Quand je choisis "Je ne sais pas quelle est ma convention collective"
    Alors je vois "Précisez et sélectionnez votre entreprise"
    Quand je renseigne "michelin" dans le champ "Nom de votre entreprise ou numéro Siret (obligatoire)"
    Quand j'attends que le texte "MANUFACTURE FRANCAISE DES PNEUMATIQUES" apparaisse
    Quand je clique sur "MANUFACTURE FRANCAISE DES PNEUMATIQUES"
    Alors je vois "2 conventions collectives ont été trouvées pour cette entreprise"
    Alors je vois "Caoutchouc (IDCC 0045)"
    Alors je vois "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils (IDCC 1486)"
# TODO: le message d'erreur ne s'affiche pas quand on a déjà submit une question avant. A décommenter quand le bug est fixed (#4253°
#    Quand je clique sur "Suivant"
#    Alors je vois "Vous devez répondre à cette question"
    Quand je choisis "Caoutchouc (IDCC 0045)"
    Alors je vois "Cliquez sur Suivant pour poursuivre la simulation."
    Quand je clique sur "Fermer"
    Alors je vois "Nom de votre entreprise ou numéro Siret"
    Quand je renseigne "Ondo" dans le champ "Nom de votre entreprise ou numéro Siret"
    Quand je renseigne "69007" dans le champ "Code postal ou ville"
    Alors j'attends que le texte "VERNIN" apparaisse
    Quand je clique sur "VERNIN"
    Alors je vois "Une convention collective a été trouvée pour cette entreprise"
    Alors je vois "Cliquez sur Suivant pour poursuivre la simulation."
    Quand je clique sur "Suivant"

    Alors je vois "Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
    Quand je choisis "Oui"
    Quand je clique sur "Suivant"

    Alors je vois "Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour)"
    Quand je choisis "Non"
    Alors je vois "Quelle est l'ancienneté du salarié dans l’entreprise en mois"
    Quand je renseigne "10" dans le champ avec le css 'input[name="contrat salarié - ancienneté"]'

    Quand je clique sur "Suivant"

    Alors je vois "Préavis de départ à la retraite"
    Alors je vois "2 mois"

    Quand j'ouvre l'accordion
    Alors je vois "Oui*"
    Alors je vois "Le salarié étant reconnu en tant que travailleur handicapé"
    Alors je vois "Boulangerie-pâtisserie (entreprises artisanales)"
