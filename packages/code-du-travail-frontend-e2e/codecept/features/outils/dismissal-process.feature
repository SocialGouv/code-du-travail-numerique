#language: fr

@dismissal-process
Fonctionnalité: Outil - Dossier Licenciement
  Pour pouvoir accéder à ma page d'information sur le licenciement
  En tant que visiteur
  Je veux pouvoir utiliser le questionnaire de dossier licenciement

  Scénario: Parcours Licenciement pour motif non disciplinaire
    Soit un utilisateur sur la page "/outils/procedure-licenciement"

    Alors je vois "Quelle est votre situation ?"
    Alors je vois "Salarié"
    Alors je vois "Employeur"

    Quand je clique sur "Salarié"

    Alors je vois "Un licenciement pour motif personnel"
    Alors je vois "Un licenciement pour motif économique"
    Alors je vois "Un licenciement suite à un accord de performance collective (APC)"

    Quand je clique sur "Un licenciement pour motif personnel"

    Alors je vois "Une faute qui vous est reprochée (motif disciplinaire)"
    Alors je vois "Une inaptitude constatée par le médecin du travail"
    Alors je vois "Vous n'êtes concerné par aucun de ces cas (motif non disciplinaire)"

    Quand je clique sur "Vous n'êtes concerné par aucun de ces cas (motif non disciplinaire)"

    Alors je vois "Afficher les informations personnalisées"

    Quand je clique sur "Afficher les informations personnalisées"

    Alors je suis redirigé vers la page: "/information/licenciement-pour-motif-non-disciplinaire"
