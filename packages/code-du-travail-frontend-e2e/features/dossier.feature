#language: fr

@thematic-files
Fonctionnalité: Dossier Coronavirus
  Pour trouver une information sur le coronavirus
  En tant que visiteur


  Scénario:
    Soit un utilisateur sur la page "/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus"

    Alors je vois "Ministère du travail : notre dossier sur le Coronavirus"
    Alors je vois "Sommaire"

    Quand je clique sur "Covid-19 : Les mesures de protection"
    Quand j'attends que le titre de page "Covid-19 : Les mesures de protection en entreprise (Protocole national)" apparaisse
    Alors je vois "Cette page a été rédigée à partir du Protocole national pour assurer la santé et la sécurité des salariés en entreprise face à l’épidémie de COVID-19 ainsi que du guide employeur associé."
