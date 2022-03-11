#language: fr

@indemnite-licenciement-outil
Fonctionnalité: Widgets
  Pour pouvoir ajouter sur mon site un outil du code du travail numérique
  En tant que admin d'un site
  Je veux pouvoir visualiser les outils dans une page dédiée

Scénario: Page widget preavis de retraite
  Soit un utilisateur sur la page "/widgets/preavis-retraite"

  Alors je vois "Étapes"
  Alors je vois "Préavis de départ ou de mise à la retraite"
  Alors je vois "permet de calculer la durée de préavis à respecter en cas de départ ou de mise à la retraite"

  Quand je clique sur "Commencer"


  Alors je vois "Qui est à l’origine du départ en retraite"

Scénario: Page widget preavis de licenciement
  Soit un utilisateur sur la page "/widgets/preavis-licenciement"

  Alors je vois "Étapes"
  Alors je vois "Préavis de licenciement"
  Alors je vois "permet de calculer la durée du préavis accordée au salarié en cas de licenciement"

  Quand je clique sur "Commencer"

  Alors je vois "Le licenciement est-il dû à une faute grave (ou lourde)"
