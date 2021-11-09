#language: fr

@not-found
Fonctionnalité: Page non trouvée
  Pour pouvoir améliorer l'expérience utilisateur en cas de page non trouvée
  En tant que visiteur
  Je veux être informé que la page que je cherche n'existe pas.

Scénario:
  Soit un utilisateur sur la page "/banane"
  Alors je vois "ERREUR 404"
  Alors je vois "Oups, nous ne trouvons pas cette page"
  Alors le lien "Revenir à la page d’accueil" pointe sur "/"
  Alors le status de la page est 404