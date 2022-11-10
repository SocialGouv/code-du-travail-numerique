#language: fr

@contributions.search
Fonctionnalité: Contributions
  Pour rechercher une contribution
  En tant que visiteur

  Scénario:
    Soit un utilisateur sur la page d'accueil

    Quand je recherche "durée maximale CDD"
    Quand je clique sur "Rechercher"
    Quand j'attends que les résultats de recherche apparaissent
    Quand je clique sur "Quelle peut être la durée maximale d'un CDD"

    Alors je suis redirigé vers la page: "/contribution/quelle-peut-etre-la-duree-maximale-dun-cdd?q=dur%C3%A9e%20maximale%20CDD"
