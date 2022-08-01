#language: fr

@thematic-files
Fonctionnalité: Dossier Coronavirus
  Pour trouver une information sur le coronavirus
  En tant que visiteur


  Scénario:
    Soit un utilisateur sur la page "/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus"

    Alors je vois "Covid-19 : fin du protocole sanitaire"
    Alors je vois "Sommaire"

    Quand je clique sur "Covid-19 : le régime post-crise sanitaire à compter du 14 mars 2022"
    Quand j'attends que le titre de page "Covid-19 : le régime post-crise sanitaire à compter du 14 mars 2022" apparaisse
    Alors je vois "Un allègement des mesures à partir du 14 mars 2022"
