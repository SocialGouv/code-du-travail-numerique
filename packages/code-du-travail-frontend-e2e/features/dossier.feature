#language: fr

@thematic-files
Fonctionnalité: Dossier Coronavirus
  Pour trouver une information sur le coronavirus
  En tant que visiteur


  Scénario:
    Soit un utilisateur sur la page "/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus"

    Alors je vois "Covid-19 : fin du protocole sanitaire"
    Alors je vois "Sommaire"

    Quand je clique sur "Personnes vulnérables : reprise d'activité ou activité partielle ? [infographies]"
    Quand j'attends que le titre de page "Personnes vulnérables : reprise d'activité ou activité partielle ? [infographies]
    Alors je vois "A partir du 27 septembre 2021, la reprise de l'activité professionnelle des personnes à risque de forme grave de Covid-19 en présentiel est possible, sous réserve de mesures de protection renforcées."
