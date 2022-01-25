#language: fr

@preavis-retraite-outil
Fonctionnalité: Outil - Préavis de retraite
  Pour pouvoir calculer mon préavis de retraite
  En tant que visiteur
  Je veux pouvoir utiliser le calculateur de préavis de retraite (en renseignant ou non ma CC)

  Scénario:
    Soit un utilisateur sur la page "/outils/preavis-retraite"

    Alors je vois "Étapes"
    Alors je vois "Préavis de départ ou de mise à la retraite"
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
    Alors je vois "Vous pouvez passer cette étape et poursuivre la simulation pour connaitre la durée prévue par le code du travail"
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
