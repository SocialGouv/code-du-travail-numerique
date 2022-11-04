#language: fr

@home
Fonctionnalité: Page d'acceuil
  Pour pouvoir trouver une information sur le droit du travail
  En tant que visiteur
  Je veux pouvoir consulter la page d'acceuil

Scénario:
  Soit un utilisateur sur la page d'accueil
  Alors le status de la page est 200
  Alors je vois "Bienvenue sur"
  Alors je vois "le Code du travail numérique"
  Alors je vois "Recherchez par mots-clés"
  Alors je vois le bouton "Rechercher"

  Alors je vois "4" tuiles sous le texte "À la une"

  Alors je vois "Thèmes"
  Alors je vois "Embauche et contrat de travail"
  Alors je vois "Salaire et Rémunération"
  Alors je vois "Temps de travail"
  Alors je vois "Congés et repos"
  Alors je vois "Emploi et formation professionnelle"
  Alors je vois "Santé, sécurité et conditions de travail"
  Alors je vois "Représentation du personnel et négociation collective"
  Alors je vois "Départ de l’entreprise"
  Alors je vois "Conflits au travail et contrôle de la réglementation"
  Alors le lien "Voir tous les thèmes" pointe sur "themes"

  Alors je vois "4" tuiles sous le texte "Boîte à outils"
  Alors le lien "Voir tous les outils" pointe sur "outils"

