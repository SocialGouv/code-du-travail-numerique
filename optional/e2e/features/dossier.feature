#language: fr

@thematic-files
Fonctionnalité: Dossier Coronavirus
  Pour trouver une information sur le coronavirus
  En tant que visiteur


  Scénario:
    Soit un utilisateur sur la page d'accueil

    Alors je vois "Coronavirus (Covid-19) : notre dossier dédié"
    Quand je clique sur "Coronavirus (Covid-19) : notre dossier dédié"
    Quand j'attends que le titre de page "Ministère du travail : notre dossier sur le Coronavirus" apparaisse
    Alors je vois "Sommaire"

    Quand je clique sur "Nouveautés Covid-19 : congés payés"
    Quand j'attends que le titre de page "Nouveautés Covid-19" apparaisse
    Alors je vois "Congés payés : imposer ou modifier les congés payés"
