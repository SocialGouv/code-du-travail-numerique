#language: fr

@thematic-files
Fonctionnalité: Dossier Coronavirus
  Pour trouver une information sur le coronavirus
  En tant que visiteur


  Scénario:
    Soit un utilisateur sur la page "/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus"

    Alors je vois "Ministère du travail : notre dossier sur le Coronavirus"
    Alors je vois "Sommaire"

    Quand je clique sur "Nouveautés Covid-19 : congés payés"
    Quand j'attends que le titre de page "Congés payés : nouveautés Covid-19" apparaisse
    Alors je vois "Nous vous décryptons ici les différentes mesures concernant les congés payés."
