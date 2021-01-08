#language: fr

@modeles.search
Fonctionnalité: Modèle de lettre
  Pour trouver mon modèle de lettre
  En tant que visiteur

  Scénario:
    Soit un utilisateur sur la page d'accueil

    Quand je recherche "modele rupture contrat periode d'essai"
    Quand je clique sur "Rechercher"
    Quand j'attends que les résultats de recherche apparaissent
    Quand je clique sur "Rupture du contrat en période d’essai à l’initiative du salarié"

    Alors je suis redirigé vers la page: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie?q=modele%20rupture%20contrat%20periode%20d%27essai"
