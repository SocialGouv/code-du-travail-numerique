#language: fr

@thematic-files
Fonctionnalité: Dossier Coronavirus
  Pour trouver une information sur le coronavirus
  En tant que visiteur


  Scénario:
    Soit un utilisateur sur la page "/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus"

    Alors je vois "Covid-19 : fin du protocole sanitaire"
    Alors je vois "Sommaire"

    Quand je clique sur "Covid-19 : Les mesures de protection"
    Quand j'attends que le titre de page "Covid-19 : Les mesures de protection en entreprise" apparaisse
    Alors je vois "L’employeur doit mettre en place, dans le cadre du dialogue social de proximité, notamment en associant représentants du personnel et représentants syndicaux, des mesures d’hygiène, organisationnelles et de protection collective dans le but de veiller au respect des gestes barrières."
