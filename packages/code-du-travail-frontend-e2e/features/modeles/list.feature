#language: fr

@modeles.list
Fonctionnalité: Modèle de lettre
  Pour consulter les modèles de lettre
  En tant que visiteur

  Scénario:
    Soit un utilisateur sur la page "/modeles-de-courriers"

    Alors je vois "Rupture du contrat en période d’essai à l’initiative du salarié"
    Quand je clique sur "Rupture du contrat en période d’essai à l’initiative du salarié"

    Alors je suis redirigé vers la page: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie"
